/* eslint-disable func-names */
/* eslint-disable no-param-reassign */
import { ChangeEvent, useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import useReadDevice from './useReadDevice';
import { DeviceFormFields } from '../../../types/device/device';
import device from '../../../helpers/api/device';
import { DEVICE_LIST } from '../../../constants/path';
import { LabelNumericValue } from '../../../types/common';
import useDeviceVariantsDropdown from '../../../hooks/dropdown/useDeviceVariantsDropdown';

export default function useUpdateDevice() {
  const { id } = useParams();
  const [serverValidationError, setServerValidationError] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [hasTelemetry, setHasTelemetry] = useState(false);

  const [deviceConfiguration, setDeviceConfiguration] =
    useState<LabelNumericValue>();

  const {
    data: deviceData,
    isFetching: isFetchingDeviceData,
    isError: isErrorDeviceData,
  } = useReadDevice();

  const {
    data: variantOptions,
    isFetching: isFetchingVariantOptions,
    isError: isErrorVariantOptions,
  } = useDeviceVariantsDropdown(deviceConfiguration?.value);

  const navigate = useNavigate();

  const updateDevice = (fromData: DeviceFormFields) => {
    return device.updateDevice(fromData, id);
  };

  const navigateToDeviceList = () => {
    navigate(DEVICE_LIST);
  };

  const onSuccess = (): void => {
    toast.success('Device Updated Successfully.');
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

  const updateDeviceMutation = useMutation({
    mutationKey: ['update-device', id],
    mutationFn: updateDevice,
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
            return variantOptions && variantOptions.length > 0;
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
    reset,
    setValue,
    formState: { errors },
  } = useForm<DeviceFormFields>({
    resolver: schemaResolver,
    defaultValues: {
      has_flow_meter: false,
      has_telemetry: false,
      is_refurbished: false,
    },
  });

  useEffect(() => {
    if (deviceData) {
      reset({
        device_configuration_id: deviceData.device_configuration.id,
        gateway_modem_number: deviceData.gateway_modem_number,
        telemetry: deviceData.telemetry,
        tag_ids: deviceData?.tags?.map((selectedTag) => ({
          value: selectedTag.id,
          label: selectedTag?.name,
        })),
        variant: deviceData.variant,
        has_telemetry: deviceData.has_telemetry,
        has_flow_meter: deviceData.has_flow_meter,
        is_refurbished: deviceData.is_refurbished,
      });

      setDeviceConfiguration({
        value: deviceData.device_configuration.id,
        label: deviceData.device_configuration.name,
      });
      setHasTelemetry(deviceData.has_telemetry);
    }
  }, [deviceData]);

  const onSubmit = async (formData: DeviceFormFields) => {
    setSubmitted(true);
    const filteredTags: string[] | [] =
      formData?.tag_ids?.map((tag: any) => tag.value) ?? [];

    if (!formData.has_telemetry) {
      formData.gateway_modem_number = null;
      formData.telemetry = null;
    }

    formData.tag_ids = JSON.stringify(filteredTags);
    updateDeviceMutation.mutate(formData);
  };

  useEffect(() => {
    setValue('variant', undefined);
  }, [deviceConfiguration]);

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
    reset,
    handleSubmit,
    onSubmit,
    serverValidationError,
    setServerValidationError,
    updateDeviceMutation,
    submitted,
    setSubmitted,
    navigateToDeviceList,
    deviceData,
    isFetchingDeviceData,
    isErrorDeviceData,
    propagateOnDeviceConfigurationChange,
    propagateOnHasTelemetryChange,
    hasTelemetry,
    deviceConfiguration,
    variantOptions,
    isFetchingVariantOptions,
    isErrorVariantOptions,
  };
}
