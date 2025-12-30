import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';

import referrer from '../../../../helpers/api/referrer';
import useReadReferrer from './useReadReferrer';
import { ReferrerFormFields } from '../../../../types/referrer/referrerList';

export default function useUpdateReferrer() {
  const { id } = useParams();
  const [serverValidationError, setServerValidationError] = useState(false);

  const [submitted, setSubmitted] = useState(false);

  const navigate = useNavigate();

  const {
    data: referrerDetail,
    isFetching: isFetchingReferrer,
    isError: isErrorReferrer,
  } = useReadReferrer(Number(id));

  const updateReferrer = async (formData: ReferrerFormFields) => {
    return referrer.updateReferrer(formData, Number(id));
  };

  const navigateToReferrerList = () => {
    navigate('/referrers/list');
  };

  const onSuccess = (): void => {
    toast.success('Referrer Updated Successfully.');
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

  const updateReferrerMutation = useMutation({
    mutationKey: ['update-referrer', id],
    mutationFn: updateReferrer,
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
        .test('fileType', 'File must be a PDF', (value) => {
          if (value.length === 0) return true; // No file selected, validation passes
          return value && value[0].type === 'application/pdf';
        }),
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
    reset,
    formState: { errors },
  } = useForm<ReferrerFormFields>({ resolver: schemaResolver });

  useEffect(() => {
    if (referrerDetail) {
      reset({
        first_name: referrerDetail.first_name,
        last_name: referrerDetail.last_name,
        email: referrerDetail.email,
        phone_number: referrerDetail.phone_number,
        address: referrerDetail.address,
        contract_effective_date: referrerDetail.contract_effective_date
          ? new Date(referrerDetail.contract_effective_date)
          : referrerDetail.contract_effective_date,
        contract_expiry_date: referrerDetail.contract_expiry_date
          ? new Date(referrerDetail.contract_expiry_date)
          : referrerDetail.contract_expiry_date,
      });
    }
  }, [referrerDetail]);

  const onSubmit = async (formData: ReferrerFormFields) => {
    setSubmitted(true);
    if (formData.contract_file && formData.contract_file?.length > 0) {
      // eslint-disable-next-line prefer-destructuring
      formData.contract_file = formData.contract_file[0];
    } else {
      delete formData.contract_file;
    }
    formData.contract_effective_date = moment(
      formData.contract_effective_date
    ).format('YYYY-MM-DD');

    formData.contract_expiry_date = moment(
      formData.contract_expiry_date
    ).format('YYYY-MM-DD');

    updateReferrerMutation.mutate(formData);
  };

  return {
    register,
    control,
    errors,
    reset,
    handleSubmit,
    serverValidationError,
    setServerValidationError,
    updateReferrerMutation,
    submitted,
    setSubmitted,
    navigateToReferrerList,
    referrerDetail,
    isFetchingReferrer,
    isErrorReferrer,
    onSubmit,
  };
}
