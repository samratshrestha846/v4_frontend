import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { LOGIN } from '../../../constants/path';
import { ChangeDefaultPasswordFormFields } from '../../../types/user/user';
import { changeDefaultPassword } from '../../../helpers/api/auth';

export default function useChangeDefaultPassword() {
  const [searchParams] = useSearchParams();

  const email = searchParams.get('email')?.toString();
  const password = searchParams.get('password')?.toString();

  const navigate = useNavigate();

  const [serverValidationError, setServerValidationError] =
    useState<boolean>(false);

  const [submitted, setSubmitted] = useState(false);

  const changeUserDefaultPassword = (
    formData: ChangeDefaultPasswordFormFields
  ) => {
    return changeDefaultPassword(formData);
  };

  const navigateToLogin = () => {
    navigate(LOGIN);
  };

  const onSuccess = (): void => {
    setSubmitted(false);
    toast.success('Password Changed Successfully.');
    navigateToLogin();
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

  const changeDefaultPasswordMutation = useMutation({
    mutationKey: ['change-user-default-password'],
    mutationFn: changeUserDefaultPassword,
    onSuccess,
    onError,
  });

  const schemaResolver = yupResolver(
    yup.object().shape({
      old_password: yup
        .string()
        .typeError('Current password is invalid.')
        .required('Current password is required.'),
      password: yup
        .string()
        .typeError('New password is invalid.')
        .required('New password is required.')
        .matches(
          // eslint-disable-next-line no-useless-escape
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
        )
        .notOneOf(
          [yup.ref('old_password')],
          'The password and old password must be different.'
        ),

      password_confirmation: yup
        .string()
        .typeError('Confirm password is invalid.')
        .required('Confirm password is required.')
        .matches(
          // eslint-disable-next-line no-useless-escape
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
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
    reset,
    setError,
    formState: { errors },
  } = useForm<ChangeDefaultPasswordFormFields>({ resolver: schemaResolver });

  const onSubmit = async (formData: ChangeDefaultPasswordFormFields) => {
    setSubmitted(true);
    if (email) {
      formData.email = email;
    }
    changeDefaultPasswordMutation.mutate(formData);
  };

  useEffect(() => {
    reset({ old_password: password });
  }, [password]);

  return {
    register,
    control,
    errors,
    handleSubmit,
    onSubmit,
    serverValidationError,
    setServerValidationError,
    changeDefaultPasswordMutation,
    submitted,
    email,
    password,
  };
}
