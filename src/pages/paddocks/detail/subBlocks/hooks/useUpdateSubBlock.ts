import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import {
  SubBlock,
  SubBlockFormValues,
} from '../../../../../types/horticulture/subBlock';
import subBlock from '../../../../../helpers/api/horticulture/subBlock';

type Props = {
  toggleModal: () => void;
  refetchSubBlocks?: () => void;
  subBlockDetail?: SubBlock;
};

export default function useUpdateSubBlock({
  toggleModal,
  refetchSubBlocks,
  subBlockDetail,
}: Props) {
  const [serverValidationError, setServerValidationError] =
    useState<boolean>(false);

  const [submitted, setSubmitted] = useState(false);

  const updateSubBlock = (formData: SubBlockFormValues) => {
    return subBlock.updateSubBlock(formData, Number(subBlockDetail?.id));
  };

  const onSuccess = (): void => {
    setSubmitted(false);
    toast.success('Sub Block Updated Successfully.');
    if (refetchSubBlocks) {
      refetchSubBlocks();
    }
    toggleModal();
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

  const updateSubBlockMutation = useMutation({
    mutationKey: ['update-sub-block'],
    mutationFn: updateSubBlock,
    onSuccess,
    onError,
  });

  const schemaResolver = yupResolver(
    yup.object().shape({
      name: yup
        .string()
        .typeError('Name is invalid.')
        .required('Name is required.'),
      area_in_hectares: yup
        .number()
        .positive('Area should be a positive number.')
        .required('Area in Heactare is required.')
        .typeError('Area in Heactare is invalid.'),
    })
  );

  const {
    register,
    handleSubmit,
    control,
    reset,
    setError,
    formState: { errors },
  } = useForm<SubBlockFormValues>({
    resolver: schemaResolver,
  });

  useEffect(() => {
    if (subBlockDetail) {
      reset({
        name: subBlockDetail.name,
        area_in_hectares: subBlockDetail.area_in_hectares,
      });
    }
  }, [subBlockDetail]);

  const onSubmit = async (formData: SubBlockFormValues) => {
    setSubmitted(true);
    updateSubBlockMutation.mutate(formData);
  };

  return {
    register,
    control,
    errors,
    handleSubmit,
    onSubmit,
    serverValidationError,
    setServerValidationError,
    submitted,
  };
}
