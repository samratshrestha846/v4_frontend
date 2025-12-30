import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { APICore } from '@uhub/helpers/api/apiCore';
import { LOGIN } from '../../../constants/path';
import { ResetPasswordFormFields } from '../../../types/user/user';
import { RESET_PASSWORD_ENDPOINT } from '../constants/constants';

export default function useResetPassword() {
  const [searchParams] = useSearchParams();
  const [errorMessage, setErrorMessage] = useState<any>();

  const [submitted, setSubmitted] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { token } = useParams();
  const email = searchParams.get('email')?.toString();
  const navigate = useNavigate();
  const apiCore = new APICore();

  const resetUserPassword = (formData: ResetPasswordFormFields) => {
    return apiCore.create(RESET_PASSWORD_ENDPOINT, formData);
  };

  const navigateToLogin = () => {
    navigate(LOGIN);
  };

  const onSuccess = (): void => {
    setSubmitted(false);
    toast.success('Password Changed Successfully.');
    setIsSuccess(true);

    setTimeout(() => {
      navigateToLogin();
    }, 2000);
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
      const message =
        error?.response?.data?.message ??
        `Oops something went wrong. Please try again.`;
      setErrorMessage(message);
      toast.error(message);
    }
    setSubmitted(false);
  };

  const resetPasswordMutation = useMutation({
    mutationKey: ['reset-user-password'],
    mutationFn: resetUserPassword,
    onSuccess,
    onError,
  });

  const schemaResolver = yupResolver(
    yup.object().shape({
      password: yup
        .string()
        .typeError('New password is invalid.')
        .required('New password is required.')
        .matches(
          // eslint-disable-next-line no-useless-escape
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          'Must be at least 8 characters with one uppercase, one lowercase, one number and one special character.'
        ),
      password_confirmation: yup
        .string()
        .typeError('Confirm password is invalid.')
        .required('Confirm password is required.')
        .matches(
          // eslint-disable-next-line no-useless-escape
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          'Must be at least 8 characters with one uppercase, one lowercase, one number and one special character.'
        )
        .oneOf(
          [yup.ref('password')],
          'Confirm password must match with new password.'
        ),
    })
  );

  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<ResetPasswordFormFields>({ resolver: schemaResolver });

  const onSubmit = async (formData: ResetPasswordFormFields) => {
    setSubmitted(true);
    if (email) {
      formData.email = email;
    }

    if (token) {
      formData.token = token;
    }

    resetPasswordMutation.mutate(formData);
  };

  return {
    register,
    control,
    errors,
    handleSubmit,
    onSubmit,
    errorMessage,
    resetPasswordMutation,
    submitted,
    email,
    isSuccess,
    navigateToLogin,
  };
}
