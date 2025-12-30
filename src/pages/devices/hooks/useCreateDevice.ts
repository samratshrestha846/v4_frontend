import { ChangeEvent, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import { DEVICE_LIST } from '../../../constants/path';
import { DeviceFormFields } from '../../../types/device/device';
import { LabelNumericValue } from '../../../types/common';

import device from '../../../helpers/api/device';
import useDeviceVariantsDropdown from '../../../hooks/dropdown/useDeviceVariantsDropdown';

export default function useCreateDevice() {
  const navigate = useNavigate();
  const [serverValidationError, setServerValidationError] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [hasTelemetry, setHasTelemetry] = useState(false);

  const [deviceConfiguration, setDeviceConfiguration] =
    useState<LabelNumericValue>();

  const {
    data: variantOptions,
    isFetching: isFetchingVariantOptions,
    isError: isErrorVariantOptions,
  } = useDeviceVariantsDropdown(deviceConfiguration?.value);

  const createDevice = (fromData: DeviceFormFields) => {
    return device.createDevice(fromData);
  };

  const navigateToDeviceList = () => {
    navigate(DEVICE_LIST);
  };

  const onSuccess = (): void => {
    toast.success('Device Created Successfully.');
    navigateToDeviceList();
  };

  const onError = (error: any) => {
    setSubmitted(false);
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

  const createDeviceMutation = useMutation({
    mutationKey: ['create-device'],
    mutationFn: createDevice,
    onSuccess,
    onError,
  });

  const schemaResolver = yupResolver(
    yup.object().shape({
      device_configuration_id: yup
        .number()
        .typeError('Device Configuration is invalid.')
        .required('Device Configuration is required.'),
      variant: yup
        .string()
        .when('device_configuration_id', {
          is: () => {
            return variantOptions && variantOptions?.length > 0;
          },
          then: yup
            .string()
            .typeError(
              'Variant is required when device configuration is invalid.'
            )
            .required(
              `${deviceConfiguration?.label} variant is required when device configuration is ${deviceConfiguration?.label}.`
            ),
        })
        .nullable(),
      has_telemetry: yup.boolean(),
      gateway_modem_number: yup
        .string()
        .when('has_telemetry', {
          is: true,
          then: yup
            .string()
            .typeError(
              'Gateway modem number is required when telemetry option is checked.'
            )
            .required(
              'Gateway modem number is required when telemetry option is checked.'
            ),
        })
        .nullable(),
      telemetry: yup
        .string()
        .when('has_telemetry', {
          is: true,
          then: yup
            .string()
            .typeError(
              'Telemetry is required when telemetry option is checked.'
            )
            .required(
              'Telemetry is required when telemetry option is checked.'
            ),
        })
        .nullable(),
    })
  );

  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<DeviceFormFields>({
    resolver: schemaResolver,
    defaultValues: {
      has_flow_meter: false,
      has_telemetry: false,
      is_refurbished: false,
    },
  });

  const onSubmit = async (formData: DeviceFormFields) => {
    setSubmitted(true);
    const filteredTags: string[] | [] =
      formData?.tag_ids?.map((tag: any) => tag.value) ?? [];

    if (!formData.has_telemetry) {
      formData.gateway_modem_number = null;
      formData.telemetry = null;
    }

    formData.tag_ids = JSON.stringify(filteredTags);
    createDeviceMutation.mutate(formData);
  };

  const propagateOnDeviceConfigurationChange = (selected: any) => {
    setDeviceConfiguration(selected);
  };
  const propagateOnHasTelemetryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setHasTelemetry(e.target.checked);
  };

  return {
    register,
    control,
    errors,
    handleSubmit,
    onSubmit,
    serverValidationError,
    setServerValidationError,
    createDeviceMutation,
    navigateToDeviceList,
    propagateOnDeviceConfigurationChange,
    propagateOnHasTelemetryChange,
    hasTelemetry,
    deviceConfiguration,
    submitted,
    variantOptions,
    isFetchingVariantOptions,
    isErrorVariantOptions,
  };
}
