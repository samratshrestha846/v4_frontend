import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

import customer from '../../../helpers/api/customer';
import { CUSTOMER_LIST } from '../../../constants/path';
import { CustomerInputFields } from '../../../types/customer/customerOnboarding';

export default function useUpdateCustomer() {
  const [serverValidationError, setServerValidationError] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { id } = useParams();

  const navigate = useNavigate();

  const updateCustomer = async (fromData: CustomerInputFields) => {
    return customer.updateCustomer(fromData, Number(id));
  };

  const navigateToCustomerList = () => {
    navigate(CUSTOMER_LIST);
  };

  const onSuccess = (): void => {
    toast.success('Customer Updated Successfully.');
    navigateToCustomerList();
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

  const updateCustomerMutation = useMutation({
    mutationKey: ['create-customer', id],
    mutationFn: updateCustomer,
    onSuccess,
    onError,
  });

  const schemaResolver = yupResolver(
    yup.object().shape({
      business_name: yup
        .string()
        .typeError('Business name is invalid')
        .required('Business name is required.'),
      is_active: yup
        .boolean()
        .typeError('Status is invalid')
        .required('Status is required.'),
    })
  );

  const {
    register,
    control,
    reset,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<CustomerInputFields>({ resolver: schemaResolver });

  return {
    register,
    control,
    reset,
    errors,
    handleSubmit,
    serverValidationError,
    setServerValidationError,
    updateCustomerMutation,
    submitted,
    setSubmitted,
    navigateToCustomerList,
  };
}
