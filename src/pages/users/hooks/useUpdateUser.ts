import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import user from '../../../helpers/api/user';
import { UserFormFields } from '../../../types/user/user';
import useReadUser from './useReadUser';

type Props = {
  toggleModal: () => void;
  refetch: any;
  id: number;
};

export default function useUpdateUser({ toggleModal, refetch, id }: Props) {
  const [serverValidationError, setServerValidationError] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const {
    data: userDetail,
    isFetching: isFetchingUserDetail,
    isError: isErrorUserDetail,
  } = useReadUser(id);

  const updateUser = (fromData: UserFormFields) => {
    return user.updateUser(fromData, id);
  };

  const onSuccess = (): void => {
    toast.success('User Updated Successfully.');
    toggleModal();
    refetch();
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

  const updateUserMutation = useMutation({
    mutationKey: ['create-user'],
    mutationFn: updateUser,
    onSuccess,
    onError,
  });

  const schemaResolver = yupResolver(
    yup.object().shape({
      first_name: yup
        .string()
        .typeError('First Name is invalid')
        .required('First Name is required'),
      last_name: yup
        .string()
        .typeError('Last Name is invalid')
        .required('Last Name is required'),
    })
  );

  const {
    register,
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<UserFormFields>({ resolver: schemaResolver });

  const onSubmit = async (formData: UserFormFields) => {
    setSubmitted(true);
    if (formData.phone_number === '61') {
      formData.phone_number = '';
    }

    if (formData.phone_number) {
      // eslint-disable-next-line no-unused-expressions
      !formData.phone_number.match(/^\+[0-9]{11}/) &&
        (formData.phone_number = `+${formData.phone_number}`);
    }
    updateUserMutation.mutate(formData);
  };

  useEffect(() => {
    if (userDetail) {
      reset({
        first_name: userDetail.first_name,
        last_name: userDetail.last_name,
        phone_number: userDetail.phone_number,
      });
    }
  }, [userDetail]);

  return {
    register,
    control,
    errors,
    handleSubmit,
    onSubmit,
    serverValidationError,
    setServerValidationError,
    submitted,
    userDetail,
    isFetchingUserDetail,
    isErrorUserDetail,
  };
}
