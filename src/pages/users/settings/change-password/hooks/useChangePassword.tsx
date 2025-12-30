import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import user from '../../../../../helpers/api/user';
import { APICore } from '../../../../../helpers/api/apiCore';
import { ChangeDefaultPasswordFormFields } from '../../../../../types/user/user';

export default function useChangePassword() {
  const api = new APICore();
  const { email } = api.getLoggedInUser();

  const navigate = useNavigate();

  const [serverValidationError, setServerValidationError] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const changePassword = (formData: ChangeDefaultPasswordFormFields) => {
    const updatedFormData = { ...formData, email };
    return user.changePassword(updatedFormData);
  };

  const onSuccess = (): void => {
    toast.success(
      'Password Changed Successfull. Please login again to continue.'
    );
    setTimeout(() => {
      navigate('/account/logout');
    }, 1000);
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

  const changePasswordMutation = useMutation({
    mutationKey: ['change-password'],
    mutationFn: changePassword,
    onSuccess,
    onError,
  });

  const {
    register,
    handleSubmit,
    control,
    setError,
    reset,
    formState: { errors },
  } = useForm<ChangeDefaultPasswordFormFields>();

  const onSubmit = async (formData: ChangeDefaultPasswordFormFields) => {
    setSubmitted(true);
    changePasswordMutation.mutate(formData);
  };

  return {
    register,
    control,
    errors,
    handleSubmit,
    onSubmit,
    serverValidationError,
    setServerValidationError,
    changePasswordMutation,
    submitted,
    reset,
  };
}
