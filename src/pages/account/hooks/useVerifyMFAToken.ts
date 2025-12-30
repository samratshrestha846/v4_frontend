import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { UserVerificationFormFields } from '../../../types/user/user';
import { verifyOtp } from '../../../redux/actions';

export default function useVerifyMFAToken() {
  const [searchParams] = useSearchParams();
  const [submitted, setSubmitted] = useState(false);
  const dispatch = useDispatch();
  const { token } = useParams();
  const email = searchParams.get('email');

  const verifyOtpToken = (formData: UserVerificationFormFields) => {
    if (dispatch(verifyOtp(formData))) {
      return Promise.resolve();
    }
    return Promise.reject();
  };

  const onSuccess = (): void => {
    setSubmitted(false);
    toast.success('OTP Verified Successfully.');
  };

  const onError = (error: any) => {
    if (error.response && error.response.status === 417) {
      const errorData = error.response.data.errors;
      Object.keys(errorData).forEach((key) => {
        setError(key as any, {
          type: 'server',
          message: errorData[key][0],
        });
      });
    } else {
      toast.error(`Oops something went wrong. Please try again.`);
    }
    setSubmitted(false);
  };

  const verifyOptTokenMutation = useMutation({
    mutationKey: ['verify-otp-token'],
    mutationFn: verifyOtpToken,
    onSuccess,
    onError,
  });

  const schemaResolver = yupResolver(
    yup.object().shape({
      code: yup
        .string()
        .typeError('Please enter code.')
        .required('Please enter code.')
        .matches(/^\d{6}$/, 'Code must be exactly 6 digits.'),
      email: yup
        .string()
        .email('Must be a valid email address.')
        .typeError('Email is required')
        .required('Email is required'),
      otpToken: yup
        .string()
        .typeError('OTP Token is required.')
        .required('OTP Token is required.'),
    })
  );

  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<UserVerificationFormFields>({ resolver: schemaResolver });

  const onSubmit = async (formData: UserVerificationFormFields) => {
    setSubmitted(true);
    verifyOptTokenMutation.mutate(formData);
  };

  return {
    register,
    control,
    errors,
    handleSubmit,
    onSubmit,
    submitted,
    token,
    email,
  };
}
