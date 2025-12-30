import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import {
  Block,
  BlockFormValues,
} from '../../../../../types/horticulture/block';
import block from '../../../../../helpers/api/horticulture/block';

type Props = {
  toggleModal: () => void;
  refetchBlocks?: () => void;
  blockDetail?: Block;
};

export default function useUpdateBlock({
  toggleModal,
  refetchBlocks,
  blockDetail,
}: Props) {
  const [serverValidationError, setServerValidationError] =
    useState<boolean>(false);

  const [submitted, setSubmitted] = useState(false);

  const updateBlock = (formData: BlockFormValues) => {
    return block.updateBlock(formData, Number(blockDetail?.id));
  };

  const onSuccess = (): void => {
    setSubmitted(false);
    toast.success('Block Updated Sucessfully.');
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

  const updateBlockMutation = useMutation({
    mutationKey: ['update-block'],
    mutationFn: updateBlock,
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
  } = useForm<BlockFormValues>({
    resolver: schemaResolver,
  });

  useEffect(() => {
    if (blockDetail) {
      reset({
        name: blockDetail.name,
        area_in_hectares: blockDetail.area_in_hectares,
      });
    }
  }, [blockDetail]);

  const onSubmit = async (formData: BlockFormValues) => {
    setSubmitted(true);
    updateBlockMutation.mutate(formData);
  };

  return {
    register,
    control,
    errors,
    handleSubmit,
    onSubmit,
    serverValidationError,
    setServerValidationError,
    updateBlockMutation,
    submitted,
  };
}
