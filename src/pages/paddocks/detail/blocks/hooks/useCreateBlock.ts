import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { BlockFormValues } from '../../../../../types/horticulture/block';
import block from '../../../../../helpers/api/horticulture/block';

type Props = {
  toggleModal: () => void;
  refetchBlocks: () => void;
};

export default function useCreateBlock({ toggleModal, refetchBlocks }: Props) {
  const { id } = useParams();

  const [serverValidationError, setServerValidationError] =
    useState<boolean>(false);

  const [submitted, setSubmitted] = useState(false);

  const createBlock = (formData: BlockFormValues) => {
    return block.createBlock(formData, Number(id));
  };

  const onSuccess = (): void => {
    setSubmitted(false);
    toast.success('Block Created Sucessfully.');
    refetchBlocks();
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

  const createBlockMutation = useMutation({
    mutationKey: ['create-block'],
    mutationFn: createBlock,
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
  } = useForm<BlockFormValues>({
    resolver: schemaResolver,
  });

  const onSubmit = async (formData: BlockFormValues) => {
    setSubmitted(true);
    createBlockMutation.mutate(formData);
  };

  return {
    register,
    control,
    errors,
    handleSubmit,
    onSubmit,
    serverValidationError,
    setServerValidationError,
    createBlockMutation,
    submitted,
  };
}
