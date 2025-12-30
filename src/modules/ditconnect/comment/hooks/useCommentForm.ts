import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { CommentFormProps } from '../types/Comment';
import { COMMENT } from '../constants/constant';
import HttpApi from '../../Http/http';

export default function useCommentForm(defaultValues: CommentFormProps) {
  const [serverValidationError, setServerValidationError] = useState(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const apiCore = new HttpApi();
  const queryClient = useQueryClient();

  const schemaResolver = yupResolver(
    yup.object().shape({
      comment: yup
        .string()
        .nullable()
        .transform((value, originalValue) =>
          originalValue === '' ? null : value
        ),
    })
  );

  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors },
    resetField,
    watch,
  } = useForm<CommentFormProps>({
    resolver: schemaResolver,
    defaultValues,
  });

  const watchedComment = watch('comment');
  const createComment = async (fromData: CommentFormProps) => {
    if (defaultValues?.id) {
      return apiCore.update(`${COMMENT}/${defaultValues.id}`, fromData);
    }
    return apiCore.create(COMMENT, fromData);
  };

  const onSuccess = (): void => {
    toast.success(
      `Comment ${defaultValues?.id ? 'Edited' : 'Posted'} Successfully.`
    );
    queryClient.invalidateQueries({ queryKey: [COMMENT] });
    resetField('comment');
    setSubmitted(false);
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

  const createMutation = useMutation({
    mutationKey: ['create-Comment'],
    mutationFn: createComment,
    onSuccess,
    onError,
  });

  const onSubmit = async (formData: CommentFormProps) => {
    setSubmitted(true);
    createMutation.mutate(formData);
  };

  return {
    register,
    control,
    errors,
    handleSubmit,
    serverValidationError,
    setServerValidationError,
    createMutation,
    submitted,
    setSubmitted,
    onSubmit,
    resetField,
    watchedComment,
  };
}
