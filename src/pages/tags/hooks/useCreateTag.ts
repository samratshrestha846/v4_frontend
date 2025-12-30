import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { TagFormfields } from '../../../types/tag';
import tag from '../../../helpers/api/tag';

type Props = {
  toggleModal: () => void;
  refetch: any;
};

export default function useCreateTag({ toggleModal, refetch }: Props) {
  const [serverValidationError, setServerValidationError] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const createTag = (fromData: TagFormfields) => {
    return tag.createTag(fromData);
  };

  const onSuccess = (): void => {
    toast.success('Tag Created Successfully.');
    toggleModal();
    refetch();
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

  const createTagMutation = useMutation({
    mutationKey: ['create-tag'],
    mutationFn: createTag,
    onSuccess,
    onError,
  });

  const schemaResolver = yupResolver(
    yup.object().shape({
      type: yup
        .string()
        .typeError('Type is invalid')
        .required('Type is required'),
      name: yup
        .string()
        .typeError('Name is invalid')
        .required('Name is required.'),
    })
  );

  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<TagFormfields>({ resolver: schemaResolver });

  const onSubmit = async (formData: any) => {
    setSubmitted(true);
    createTagMutation.mutate(formData);
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
