import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import { PaddockFormValues } from '../../../types/horticulture/paddock';
import paddock from '../../../helpers/api/horticulture/paddock';
import { PADDOCK_LIST } from '../../../constants/path';

export default function useCreatePaddock() {
  const navigate = useNavigate();
  const [serverValidationError, setServerValidationError] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const createPaddock = (fromData: PaddockFormValues) => {
    return paddock.createPaddock(fromData);
  };

  const navigateToPaddockList = () => {
    navigate(PADDOCK_LIST);
  };

  const onSuccess = (): void => {
    setSubmitted(false);
    toast.success('Paddock Created Successfully.');
    navigateToPaddockList();
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

  const createPaddockMutation = useMutation({
    mutationKey: ['create-paddock'],
    mutationFn: createPaddock,
    onSuccess,
    onError,
  });

  const schemaResolver = yupResolver(
    yup.object().shape({
      name: yup
        .string()
        .typeError('Name is invalid.')
        .required('Name is required.'),
      customer_property_id: yup
        .number()
        .typeError('Customer Property is invalid.')
        .required('Customer Property is required.'),
      area_in_hectare: yup
        .number()
        .typeError('Must be numeric value.')
        .required('Area(Hectare) is required.'),
    })
  );

  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<PaddockFormValues>({ resolver: schemaResolver });

  const onSubmit = async (formData: PaddockFormValues) => {
    setSubmitted(true);
    createPaddockMutation.mutate(formData);
  };

  return {
    register,
    control,
    errors,
    handleSubmit,
    onSubmit,
    serverValidationError,
    setServerValidationError,
    createPaddockMutation,
    navigateToPaddockList,
    submitted,
  };
}
