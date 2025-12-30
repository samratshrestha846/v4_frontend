import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import apiCustomerProperty from '../../../helpers/api/customerProperty';

export default function useCreateProperty({
  toggleModal,
  refetch,
}: {
  toggleModal: Function;
  refetch: Function;
}) {
  const [serverValidationError, setServerValidationError] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const createProperty = (fromData: FormData) => {
    return apiCustomerProperty.createProperty(fromData);
  };

  const onSuccess = (): void => {
    toast.success('Property Created Successfully.');
    toggleModal();
    refetch();
  };

  const onError = (error: any) => {
    if (error.response && error.response.status === 417) {
      setServerValidationError(true);
      const errorData = error.response.data.errors;
      Object.keys(errorData).forEach((key) => {
        setError(key, {
          type: 'server',
          message: errorData[key][0],
        });
      });
    } else {
      toast.error(error.response.data.status.message);
    }
  };

  const createPropertyMutation = useMutation({
    mutationKey: ['create-property'],
    mutationFn: createProperty,
    onSuccess,
    onError,
  });

  const schemaResolver = yupResolver(
    yup.object().shape({
      name: yup
        .string()
        .typeError('Property is invalid')
        .required('Property name is required.'),
      customer_id: yup
        .string()
        .typeError('Customer is invalid')
        .required('Customer is required.'),
      region_id: yup
        .string()
        .typeError('Region is invalid')
        .required('Region is required.'),
      is_active: yup
        .number()
        .typeError('Status is invalid')
        .required('Status is required.'),
    })
  );

  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ resolver: schemaResolver });

  const onSubmit = async (formData: any) => {
    setSubmitted(true);

    formData.customer_property_managers = formData?.customer_property_managers
      ? formData?.customer_property_managers?.map((item: any) => item.value)
      : [];

    formData.territory_managers = formData?.territory_managers
      ? formData?.territory_managers?.map((item: any) => item.value)
      : [];
    createPropertyMutation.mutate(formData);
    setSubmitted(false);
  };

  return {
    register,
    control,
    errors,
    handleSubmit,
    onSubmit,
    serverValidationError,
    setServerValidationError,
    createPropertyMutation,
    submitted,
  };
}
