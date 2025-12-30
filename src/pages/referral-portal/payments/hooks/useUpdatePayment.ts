import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';

import { PAYMENT_LIST } from '../../../../constants/path';
import payment from '../../../../helpers/api/payment';
import { PaymentFormFields } from '../../../../types/payment/paymentList';
import useReadPayment from './useReadPayment';

export default function useUpdatePayment() {
  const { id } = useParams();
  const [serverValidationError, setServerValidationError] = useState(false);

  const [submitted, setSubmitted] = useState(false);

  const navigate = useNavigate();

  const {
    data: paymentDetail,
    isFetching: isFetchingPayment,
    isError: isErrorPayment,
  } = useReadPayment(Number(id));

  const updatePayment = async (fromData: PaymentFormFields) => {
    return payment.updatePayment(fromData, Number(id));
  };

  const navigateToPaymentList = () => {
    navigate(PAYMENT_LIST);
  };

  const onSuccess = (): void => {
    toast.success('Payment Updated Successfully.');
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
  };

  const updatePaymentMutation = useMutation({
    mutationKey: ['update-payment', id],
    mutationFn: updatePayment,
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
    reset,
    formState: { errors },
  } = useForm<PaymentFormFields>({ resolver: schemaResolver });

  useEffect(() => {
    if (paymentDetail) {
      reset({
        referrer_id: paymentDetail.referrer_id,
        amount: paymentDetail.amount,
        note: paymentDetail.note,
        payment_date: paymentDetail.payment_date
          ? new Date(paymentDetail.payment_date)
          : paymentDetail.payment_date,
      });
    }
  }, [paymentDetail]);

  const onSubmit = async (formData: any) => {
    setSubmitted(true);
    formData.payment_date = moment(formData.payment_date).format('YYYY-MM-DD');
    updatePaymentMutation.mutate(formData);
    setSubmitted(false);
  };

  return {
    register,
    control,
    errors,
    reset,
    handleSubmit,
    serverValidationError,
    setServerValidationError,
    updatePaymentMutation,
    submitted,
    setSubmitted,
    navigateToPaymentList,
    onSubmit,
    paymentDetail,
    isFetchingPayment,
    isErrorPayment,
  };
}
