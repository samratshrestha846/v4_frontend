import { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import HttpApi from '../../Http/http';
import { SupplementFormProps } from '../types/Supplement';
import { SUPPLEMENT_LIST, SUPPLEMENT } from '../constants/constant';

export default function useSupplementForm(defaultValues: SupplementFormProps) {
  const [serverValidationError, setServerValidationError] = useState(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const apiCore = new HttpApi();
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  const schemaResolver = yupResolver(
    yup.object().shape({
      name: yup
        .string()
        .required('Name field is required.')
        .typeError('Name field is required'),
      slug: yup
        .string()
        .required('Slug field is required.')
        .typeError('Slug field is required'),
      group: yup
        .string()
        .required('Group field is required.')
        .typeError('Group field is required'),
      type: yup
        .string()
        .required('Type field is required.')
        .typeError('Type field is required'),
      status: yup
        .string()
        .required('Status field is required.')
        .typeError('Status field is required'),
    })
  );

  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SupplementFormProps>({
    resolver: schemaResolver,
    defaultValues,
  });
  const createSupplement = async (fromData: SupplementFormProps) => {
    if (id) {
      return apiCore.update(`${SUPPLEMENT}/${id}`, fromData);
    }
    return apiCore.create(SUPPLEMENT, fromData);
  };

  const navigateToList = () => {
    navigate(location.state?.from || SUPPLEMENT_LIST);
  };

  const onSuccess = (): void => {
    toast.success(
      id
        ? 'Supplement Updated Successfully.'
        : 'Supplement Created Successfully.'
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
    mutationKey: ['create-Supplement'],
    mutationFn: createSupplement,
    onSuccess,
    onError,
  });

  const onSubmit = async (formData: SupplementFormProps) => {
    setSubmitted(true);
    formData.tags = Array.isArray(formData.tags)
      ? formData.tags.map((item: any) =>
          typeof item === 'object' ? item.value : item
        )
      : [];
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
