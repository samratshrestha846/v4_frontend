import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { SubBlockFormValues } from '../../../../../types/horticulture/subBlock';
import subBlock from '../../../../../helpers/api/horticulture/subBlock';

type Props = {
  toggleModal: () => void;
  refetchBlocks?: () => void;
  blockId?: number;
};

export default function useCreateSubBlock({
  toggleModal,
  refetchBlocks,
  blockId,
}: Props) {
  const [serverValidationError, setServerValidationError] =
    useState<boolean>(false);

  const [submitted, setSubmitted] = useState(false);

  const createSubBlock = (formData: SubBlockFormValues) => {
    return subBlock.createSubBlock(formData, Number(blockId));
  };

  const onSuccess = (): void => {
    setSubmitted(false);
    toast.success('Sub Block Created Successfully.');
    if (refetchBlocks) {
      refetchBlocks();
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

  const createSubBlockMutation = useMutation({
    mutationKey: ['create-sub-block'],
    mutationFn: createSubBlock,
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
    setError,
    formState: { errors },
  } = useForm<SubBlockFormValues>({
    resolver: schemaResolver,
  });

  const onSubmit = async (formData: SubBlockFormValues) => {
    setSubmitted(true);
    if (blockId) {
      formData.block_id = blockId;
    }
    createSubBlockMutation.mutate(formData);
  };

  return {
    register,
    control,
    errors,
    handleSubmit,
    onSubmit,
    serverValidationError,
    setServerValidationError,
    createSubBlockMutation,
    submitted,
  };
}
