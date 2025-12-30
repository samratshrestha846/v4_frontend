import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import sessionRun from '../../../helpers/api/horticulture/sessionRun';
import { AssignAreaAndFertilizerFormFields } from '../../../types/udoseAgs/udoseAgs';
import usePaddocksDropdown from '../../../hooks/dropdown/usePaddocksDropdown';
import useBlocksDropdown from '../../../hooks/dropdown/useBlocksDropdown';
import useSubBlocksDropdown from '../../../hooks/dropdown/useSubBlocksDropdown';
import { LabelNumericValue } from '../../../types/common';
import useReadUdoseAgSessionSummary from './useReadUdoseAgSessionSummary';
import usePropertiesDropdown from '../../../hooks/dropdown/usePropertiesDropdown';
import useFertilizersDropdown from '../../../hooks/dropdown/useFertilizersDropdown';

type Props = {
  id?: number;
  toggleModal?: () => void;
  refetchSessionSummaries?: () => void;
};

export default function useUpdateAreaAndFertilizer({
  id,
  toggleModal,
  refetchSessionSummaries,
}: Props) {
  const [serverValidationError, setServerValidationError] =
    useState<boolean>(false);

  const [submitted, setSubmitted] = useState(false);

  const [customerProperty, setCustomerProperty] = useState<number>();
  const [paddock, setPaddock] = useState<number>();
  const [block, setBlock] = useState<number>();

  const [paddockOptions, setPaddockOptions] = useState<LabelNumericValue[]>();
  const [blockOptions, setBlockOptions] = useState<LabelNumericValue[]>();
  const [subBlockOptions, setSubBlockOptions] = useState<LabelNumericValue[]>();

  const {
    data: sessionSummary,
    isFetching,
    isError,
  } = useReadUdoseAgSessionSummary(id);

  const {
    data: propertyOptions,
    isFetching: isFetchingPropertyOptions,
    isError: isErrorPropertyOptions,
  } = usePropertiesDropdown();

  const {
    data: fertilizerOptions,
    isFetching: isFetchingFertilizerOptions,
    isError: isErrorFertilizerOptions,
  } = useFertilizersDropdown();

  const {
    data: paddocks,
    isFetching: isFetchingPaddockOptions,
    isError: isErrorPaddockOptions,
  } = usePaddocksDropdown(customerProperty, true);

  const {
    data: blocks,
    isFetching: isFetchingBlockOptions,
    isError: isErrorBlockOptions,
  } = useBlocksDropdown(paddock);

  const {
    data: subBlocks,
    isFetching: isFetchingSubBlockOptions,
    isError: isErrorSubBlockOptions,
  } = useSubBlocksDropdown(block);

  const propagateOnPropertyChange = (selected: LabelNumericValue) => {
    setCustomerProperty(selected ? selected.value : undefined);
    if (!selected) {
      setPaddockOptions([]);
    }
  };

  const propagateOnPaddockChange = (selected: LabelNumericValue) => {
    setPaddock(selected ? selected.value : undefined);
    if (!selected) {
      setBlockOptions([]);
    }
  };

  const propagateOnBlockChange = (selected: LabelNumericValue) => {
    setBlock(selected ? selected.value : undefined);
    if (!selected) {
      setSubBlockOptions([]);
    }
  };

  const updateAreaAndFertilizer = (
    formData: AssignAreaAndFertilizerFormFields
  ) => {
    return sessionRun.assignAreaAndFertilizer(formData, Number(id));
  };

  const onSuccess = (): void => {
    toast.success('Coverage Area & Fertilizer Updtaed Sucessfully.');
    if (refetchSessionSummaries) {
      refetchSessionSummaries();
    }
    if (toggleModal) {
      toggleModal();
    }
  };

  const onError = (error: any) => {
    if (error.response && error.response.status === 417) {
      setServerValidationError(true);
      const errorData = error.response.data.errors;
      Object.keys(errorData).forEach((key) => {
        setError(key as any, {
          type: 'server',
          message: errorData[key][0],
        });
      });
    } else {
      toast.error(error.response.data.status.message);
    }
    setSubmitted(false);
  };

  const updateAreaAndFertilizerMutation = useMutation({
    mutationKey: ['update-area-and-fertilizer-to-session-run'],
    mutationFn: updateAreaAndFertilizer,
    onSuccess,
    onError,
  });

  const schemaResolver = yupResolver(
    yup.object().shape({
      customer_property_id: yup
        .string()
        .typeError('Property is invalid.')
        .required('Property is required.'),
      paddock_id: yup
        .number()
        .required('Paddock is required.')
        .typeError('Paddock is invalid.'),
      block_id: yup
        .number()
        .required('Block is required.')
        .typeError('Block is invalid.'),
      fertilizer_id: yup
        .string()
        .typeError('Fertilizer is invalid.')
        .required('Fertilizer is required.'),
    })
  );

  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
    reset,
  } = useForm<AssignAreaAndFertilizerFormFields>({
    resolver: schemaResolver,
  });

  useEffect(() => {
    if (!toggleModal) {
      reset();
    }
  }, [toggleModal]);

  useEffect(() => {
    if (sessionSummary) {
      reset({
        customer_property_id: sessionSummary.customer_property?.id,
        paddock_id: sessionSummary.paddock?.id,
        block_id: sessionSummary.block?.id,
        sub_block_id: sessionSummary.sub_block?.id,
        fertilizer_id: sessionSummary.fertilizer?.id,
      });
      setCustomerProperty(sessionSummary.customer_property?.id);
      setPaddock(sessionSummary.paddock?.id);
      setBlock(sessionSummary.block?.id);
    }
  }, [sessionSummary, reset]);

  useEffect(() => {
    if (paddocks) {
      setPaddockOptions(paddocks);
    }
    if (blocks) {
      setBlockOptions(blocks);
    }
    if (subBlocks) {
      setSubBlockOptions(subBlocks);
    }
  }, [paddocks, blocks, subBlocks]);

  const onSubmit = async (formData: AssignAreaAndFertilizerFormFields) => {
    setSubmitted(true);
    updateAreaAndFertilizerMutation.mutate(formData, {
      onSettled: () => {
        setSubmitted(false);
      },
    });
  };

  return {
    register,
    control,
    errors,
    handleSubmit,
    onSubmit,
    serverValidationError,
    setServerValidationError,
    updateAreaAndFertilizerMutation,
    submitted,
    paddockOptions,
    isFetchingPaddockOptions,
    isErrorPaddockOptions,
    blockOptions,
    isFetchingBlockOptions,
    isErrorBlockOptions,
    subBlockOptions,
    isFetchingSubBlockOptions,
    isErrorSubBlockOptions,
    propagateOnPropertyChange,
    propagateOnPaddockChange,
    propagateOnBlockChange,
    sessionSummary,
    isFetching,
    isError,
    propertyOptions,
    isFetchingPropertyOptions,
    isErrorPropertyOptions,
    fertilizerOptions,
    isFetchingFertilizerOptions,
    isErrorFertilizerOptions,
  };
}
