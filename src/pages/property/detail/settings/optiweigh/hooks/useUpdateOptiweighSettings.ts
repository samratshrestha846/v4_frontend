import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import customerProperty from '../../../../../../helpers/api/customerProperty';
import { Property } from '../../../../../../types/property/propertyList';

type Props = {
  property?: Property;
  refetchProperty: () => void;
};

export default function useUpdateOptiweighSettings({
  property,
  refetchProperty,
}: Props) {
  const [serverValidationError, setServerValidationError] = useState(false);
  const [isSettingsEditEnabled, setIsSettingsEditEnabled] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const updateOptiweighSettings = async (formData: any) => {
    return customerProperty.updateProperty(formData, Number(property?.id));
  };

  const onSuccess = () => {
    toast.success('Optiweigh Settings Updated Successfully.');
    setSubmitted(false);
    setIsSettingsEditEnabled(false);
    refetchProperty();
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

  const updateOptiweighSettingsMutation = useMutation({
    mutationKey: ['update-optiweigh-settings'],
    mutationFn: updateOptiweighSettings,
    onSuccess,
    onError,
  });

  const schemaResolver = yupResolver(
    yup.object().shape({
      is_enable: yup.boolean().required('This value is required'),
      client_id: yup.mixed().when('is_enable', {
        is: true,
        then: yup
          .number()
          .integer('Must be a non decimal number')
          .positive('Must be a positive numeric value.')
          .typeError('Must be a numeric value')
          .required('This value is required'),
        otherwise: yup.lazy((value) => {
          return value !== undefined && value !== null && value !== ''
            ? yup
                .number()
                .integer('Must be a non decimal number')
                .typeError('Must be a numeric value')
                .positive('Must be a positive numeric value.')
                .required('This value is required')
                .transform((originalValue) => {
                  return typeof originalValue === 'string'
                    ? parseFloat(originalValue)
                    : originalValue;
                })
            : yup.mixed().nullable();
        }),
      }),
    })
  );
  const {
    register,
    control,
    formState: { errors },
    setError,
    handleSubmit,
  } = useForm({ resolver: schemaResolver, defaultValues: {} });

  const onSubmit = async (formData: any) => {
    setSubmitted(true);
    const settingsData: any = {
      optiweigh: {
        is_enable: formData.is_enable,
        client_id: parseInt(formData.client_id, 10),
      },
    };
    delete formData.is_enable;
    delete formData.client_id;
    formData.settings = settingsData;
    formData.customer_id = property?.customer?.id;
    formData.customer_property_managers =
      property?.customer_property_managers?.map((item: any) => item.id) || [];
    formData.territory_managers =
      property?.territory_managers?.map((item: any) => item.id) || [];
    formData.name = property?.name;
    formData.region_id = property?.region?.id;
    updateOptiweighSettingsMutation.mutate(formData);
  };

  const handleEdit = () => {
    setIsSettingsEditEnabled(!isSettingsEditEnabled);
  };

  return {
    register,
    control,
    errors,
    handleSubmit,
    onSubmit,
    serverValidationError,
    setServerValidationError,
    isSettingsEditEnabled,
    setIsSettingsEditEnabled,
    handleEdit,
    submitted,
    setSubmitted,
  };
}
