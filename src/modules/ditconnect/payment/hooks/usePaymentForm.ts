import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { PaymentFormProps } from '../types/Payment';
import { PAYMENT } from '../constants/constant';
import HttpApi from '../../Http/http';
import { PURCHASE_REQUEST } from '../../purchase-request/constants/constant';

export default function usePaymentForm(defaultValues: PaymentFormProps) {
  const [serverValidationError, setServerValidationError] = useState(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const apiCore = new HttpApi();
  const queryClient = useQueryClient();

  const schemaResolver = yupResolver(
    yup.object().shape({
      paid_by: yup
        .string()
        .typeError('Payment method is required.')
        .required('Payment method is required.'),
      po_number: yup
        .string()
        .typeError('Payment method is required.')
        .required('Payment method is required.'),
    })
  );

  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<PaymentFormProps>({
    resolver: schemaResolver,
    defaultValues,
  });
  const createPayment = async (fromData: PaymentFormProps) => {
    return apiCore.create(PAYMENT, fromData);
  };

  const onSuccess = (): void => {
    queryClient.invalidateQueries([PURCHASE_REQUEST]);
    toast.success('Payment Created Successfully.');
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
    mutationKey: ['create-Payment'],
    mutationFn: createPayment,
    onSuccess,
    onError,
  });

  const onSubmit = async (formData: PaymentFormProps) => {
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
  };
}
