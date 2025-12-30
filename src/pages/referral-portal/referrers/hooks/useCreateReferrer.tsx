import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

import referrer from '../../../../helpers/api/referrer';
import { ReferrerFormFields } from '../../../../types/referrer/referrerList';

export default function useCreateReferrer() {
  const [serverValidationError, setServerValidationError] = useState(false);

  const [submitted, setSubmitted] = useState(false);

  const navigate = useNavigate();

  const createReferrer = async (fromData: ReferrerFormFields) => {
    return referrer.createReferrer(fromData);
  };

  const navigateToReferrerList = () => {
    navigate('/referrers/list');
  };

  const onSuccess = (): void => {
    toast.success('Referrer Created Successfully.');
    navigateToReferrerList();
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

  const createReferrerMutation = useMutation({
    mutationKey: ['create-referrer'],
    mutationFn: createReferrer,
    onSuccess,
    onError,
  });

  const schemaResolver = yupResolver(
    yup.object().shape({
      first_name: yup
        .string()
        .typeError('First name is invalid')
        .required('First name is required.'),
      last_name: yup
        .string()
        .typeError('Last name is invalid')
        .required('Last name is required.'),
      email: yup
        .string()
        .typeError('Email is invalid')
        .required('Email is required.'),
      phone_number: yup
        .string()
        .typeError('Phone no. is invalid')
        .required('Phone no. is required.'),

      contract_file: yup
        .mixed()
        .test(
          'fileType',
          'Contract file is required & must be PDF.',
          (value) => {
            return value && value[0]?.type === 'application/pdf';
          }
        ),
      address: yup
        .string()
        .typeError('Address is invalid')
        .required('Address is required.'),
      contract_effective_date: yup
        .string()
        .typeError('Contract effective date is invalid')
        .required('Contract effective date is required.'),
      contract_expiry_date: yup
        .string()
        .typeError('Contract expiry date is invalid')
        .required('Contract expiry date is required.'),
    })
  );

  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ReferrerFormFields>({ resolver: schemaResolver });

  const onSubmit = async (formData: ReferrerFormFields) => {
    setSubmitted(true);

    // eslint-disable-next-line prefer-destructuring
    formData.contract_file = formData.contract_file[0];

    formData.contract_effective_date = moment(
      formData.contract_effective_date
    ).format('YYYY-MM-DD');

    formData.contract_expiry_date = moment(
      formData.contract_expiry_date
    ).format('YYYY-MM-DD');

    createReferrerMutation.mutate(formData);
  };

  return {
    register,
    control,
    errors,
    handleSubmit,
    serverValidationError,
    setServerValidationError,
    createReferrerMutation,
    submitted,
    setSubmitted,
    navigateToReferrerList,
    onSubmit,
  };
}
