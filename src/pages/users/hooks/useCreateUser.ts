import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import user from '../../../helpers/api/user';
import { UserFormFields } from '../../../types/user/user';
import { LabelNumericValue } from '../../../types/common';
import {
  ROLE_CUSTOMER,
  ROLE_STATION_MANAGER,
} from '../../../constants/constants';

type Props = {
  toggleModal: () => void;
  refetch: any;
};

export default function useCreateUser({ toggleModal, refetch }: Props) {
  const [serverValidationError, setServerValidationError] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showCustomerField, setShowCustomerField] = useState(false);

  const createUser = (fromData: UserFormFields) => {
    return user.createUser(fromData);
  };

  const onSuccess = (): void => {
    toast.success('User Created Successfully.');
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

  const createUserMutation = useMutation({
    mutationKey: ['create-user'],
    mutationFn: createUser,
    onSuccess,
    onError,
  });

  const propagateOnRoleChange = (selected?: LabelNumericValue) => {
    if (!selected) {
      setShowCustomerField(false);
      return;
    }
    if (
      selected?.label === ROLE_STATION_MANAGER ||
      selected?.label === ROLE_CUSTOMER
    ) {
      setShowCustomerField(true);
    } else {
      setShowCustomerField(false);
    }
  };

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
      email: yup
        .string()
        .email('Email must be a valid email address')
        .typeError('Email is invalid')
        .required('Email is required'),
      role_id: yup
        .number()
        .typeError('Role is invalid')
        .required('Role is required'),
    })
  );

  const {
    register,
    control,
    handleSubmit,
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
    createUserMutation.mutate(formData);
  };

  return {
    register,
    control,
    errors,
    handleSubmit,
    onSubmit,
    serverValidationError,
    setServerValidationError,
    submitted,
    showCustomerField,
    propagateOnRoleChange,
  };
}
