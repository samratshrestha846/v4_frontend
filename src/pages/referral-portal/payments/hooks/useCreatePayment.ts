import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

import { PAYMENT_LIST } from '../../../../constants/path';
import payment from '../../../../helpers/api/payment';
import { PaymentFormFields } from '../../../../types/payment/paymentList';

export default function useCreatePayment() {
  const [serverValidationError, setServerValidationError] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const navigate = useNavigate();

  const createPayment = async (fromData: PaymentFormFields) => {
    return payment.createPayment(fromData);
  };

  const navigateToPaymentList = () => {
    navigate(PAYMENT_LIST);
  };

  const onSuccess = (): void => {
    toast.success('Payment Created Successfully.');
    navigateToPaymentList();
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

  const createPaymentMutation = useMutation({
    mutationKey: ['create-payment'],
    mutationFn: createPayment,
    onSuccess,
    onError,
  });

  const schemaResolver = yupResolver(
    yup.object().shape({
      referrer_id: yup
        .number()
        .typeError('Referrer is invalid')
        .required('Referrer is required.'),
      payment_date: yup
        .string()
        .typeError('Payment date is invalid')
        .required('Payment date is required.'),
      amount: yup
        .number()
        .positive('Amount must be a positive number')
        .typeError('Amount is invalid')
        .required('Amount is required.'),
      note: yup.string().nullable().typeError('Note is invalid'),
    })
  );

  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<PaymentFormFields>({
    resolver: schemaResolver,
    defaultValues: { payment_date: new Date() },
  });

  const onSubmit = async (formData: PaymentFormFields) => {
    setSubmitted(true);
    formData.payment_date = moment(formData.payment_date).format('YYYY-MM-DD');
    createPaymentMutation.mutate(formData);
  };

  return {
    register,
    control,
    errors,
    handleSubmit,
    serverValidationError,
    setServerValidationError,
    createPaymentMutation,
    submitted,
    setSubmitted,
    navigateToPaymentList,
    onSubmit,
  };
}
