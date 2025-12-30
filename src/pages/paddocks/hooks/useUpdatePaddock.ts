import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

import { PaddockFormValues } from '../../../types/horticulture/paddock';
import paddock from '../../../helpers/api/horticulture/paddock';
import { PADDOCK_LIST } from '../../../constants/path';
import useReadPaddock from './useReadPaddock';

export default function useUpdatePaddock() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [serverValidationError, setServerValidationError] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const {
    data: paddockDetail,
    isError: isErrorPaddockDetail,
    isFetching: isFetchingPaddockDetail,
  } = useReadPaddock(Number(id));

  const updatePaddock = (fromData: PaddockFormValues) => {
    return paddock.updatePaddock(fromData, id);
  };

  const navigateToPaddockList = () => {
    navigate(PADDOCK_LIST);
  };

  const onSuccess = (): void => {
    setSubmitted(false);
    toast.success('Paddock Updated Successfully.');
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

  const updatePaddockMutation = useMutation({
    mutationKey: ['update-paddock'],
    mutationFn: updatePaddock,
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
    reset,
    formState: { errors },
  } = useForm<PaddockFormValues>({ resolver: schemaResolver });

  const onSubmit = async (formData: PaddockFormValues) => {
    setSubmitted(true);
    updatePaddockMutation.mutate(formData);
  };

  useEffect(() => {
    if (paddockDetail) {
      reset({
        customer_property_id: paddockDetail.customer_property_id,
        name: paddockDetail.name,
        area_in_hectare: paddockDetail.area_in_hectare,
      });
    }
  }, [paddockDetail]);

  return {
    register,
    control,
    errors,
    handleSubmit,
    onSubmit,
    serverValidationError,
    setServerValidationError,
    updatePaddockMutation,
    navigateToPaddockList,
    submitted,
    paddockDetail,
    isErrorPaddockDetail,
    isFetchingPaddockDetail,
  };
}
