import { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { RndActivityFormProps } from '../types/RndActivity';
import { RND_ACTIVITY_LIST, RND_ACTIVITY } from '../constants/constant';
import HttpApi from '../../Http/http';

export default function useRndActivityForm(
  defaultValues: RndActivityFormProps
) {
  const [serverValidationError, setServerValidationError] = useState(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const apiCore = new HttpApi();
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  const schemaResolver = yupResolver(
    yup.object().shape({
      section_no: yup
        .string()
        .required('Section No field is required.')
        .typeError('Section No field is required'),
      name: yup
        .string()
        .required('Name field is required.')
        .typeError('Name field is required'),
      description: yup
        .string()
        .required('Description field is required.')
        .typeError('Description field is required'),
      group: yup
        .string()
        .required('Group field is required.')
        .typeError('Group field is required'),
      parent_id: yup
        .number()
        .nullable()
        .notRequired()
        .typeError('Invalid Parent Activity'),
    })
  );

  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RndActivityFormProps>({
    resolver: schemaResolver,
    defaultValues,
  });
  const createRndActivity = async (fromData: RndActivityFormProps) => {
    if (id) {
      return apiCore.update(`${RND_ACTIVITY}/${id}`, fromData);
    }
    return apiCore.create(RND_ACTIVITY, fromData);
  };

  const navigateToList = () => {
    navigate(location.state?.from || RND_ACTIVITY_LIST);
  };

  const onSuccess = (): void => {
    toast.success(
      !id
        ? 'RndActivity Created Successfully.'
        : 'RndActivity Updated Successfully.'
    );
    navigateToList();
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
    mutationKey: ['create-RndActivity'],
    mutationFn: createRndActivity,
    onSuccess,
    onError,
  });

  const onSubmit = async (formData: RndActivityFormProps) => {
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
    navigateToList,
    onSubmit,
  };
}
