import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import apiCustomerProperty from '../../../helpers/api/customerProperty';
import useReadProperty from './useReadProperty';
import { STATUS_ACTIVE, STATUS_INACTIVE } from '../../../constants/constants';

export default function useUpdateProperty({
  propertyId,
  toggleModal,
  refetch,
}: {
  propertyId: any;
  toggleModal?: () => void;
  refetch?: () => void;
}) {
  const [serverValidationError, setServerValidationError] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const {
    data: propertyData,
    isFetching: isFetchingProperty,
    isError: isErrorProperty,
  } = useReadProperty(propertyId);

  const updateProperty = (fromData: FormData, id: number) => {
    return apiCustomerProperty.updateProperty(fromData, id);
  };

  const onSuccess = (): void => {
    toast.success('Property updated Successfully.');
    if (toggleModal) {
      toggleModal();
    }

    if (refetch) {
      refetch();
    }
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

  const updatePropertyMutation = useMutation({
    mutationKey: ['update-property', propertyId],
    mutationFn: (formData: FormData) => updateProperty(formData, propertyId),
    onSuccess,
    onError,
  });

  const schemaResolver = yupResolver(
    yup.object().shape({
      name: yup
        .string()
        .typeError('Property is invalid')
        .required('Property is required.'),
      customer_id: yup
        .string()
        .typeError('Customer is invalid')
        .required('Customer is required.'),
      region_id: yup
        .string()
        .typeError('Region is invalid')
        .required('Region is required.'),
    })
  );

  const {
    register,
    control,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm({ resolver: schemaResolver });

  useEffect(() => {
    reset({
      name: propertyData?.name,
      customer_id: propertyData?.customer?.id,
      region_id: propertyData?.region?.id,
      customer_property_managers: propertyData?.customer_property_managers?.map(
        (item: any) => {
          return {
            value: item.id,
            label: `${item?.first_name} ${item?.last_name}`,
          };
        }
      ),
      territory_managers: propertyData?.territory_managers?.map((item: any) => {
        return {
          value: item.id,
          label: `${item?.first_name} ${item?.last_name}`,
        };
      }),
      settings: propertyData?.settings
        ? propertyData?.settings
        : {
            optiweigh: {
              is_enable: false,
              client_id: null,
            },
          },
      is_active: propertyData?.is_active ? STATUS_ACTIVE : STATUS_INACTIVE,
    });
  }, [propertyData]);

  const onSubmit = async (formData: any) => {
    setSubmitted(true);

    formData.customer_property_managers = formData?.customer_property_managers
      ? formData?.customer_property_managers?.map((item: any) => item.value)
      : [];

    formData.territory_managers = formData?.territory_managers
      ? formData?.territory_managers?.map((item: any) => item.value)
      : [];
    updatePropertyMutation.mutate(formData);
    setSubmitted(false);
  };

  return {
    register,
    control,
    errors,
    reset,
    handleSubmit,
    onSubmit,
    serverValidationError,
    setServerValidationError,
    updatePropertyMutation,
    submitted,
    isFetchingProperty,
    isErrorProperty,
    propertyData,
  };
}
