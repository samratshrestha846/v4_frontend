/* eslint-disable func-names */
/* eslint-disable no-param-reassign */
import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import useReadDevice from './useReadDevice';
import device from '../../../helpers/api/device';
import { DEVICE_LIST } from '../../../constants/path';
import { DeviceStockTypeUpdateFormFields } from '../../../types/device/device';

export default function useUpdateDeviceStockType() {
  const { id } = useParams();
  const [serverValidationError, setServerValidationError] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const { data: deviceData, isFetching: isFetchingDeviceData } =
    useReadDevice();

  const navigate = useNavigate();

  const updateDeviceStockType = (fromData: DeviceStockTypeUpdateFormFields) => {
    return device.updateDeviceStockType(fromData, id);
  };

  const navigateToDeviceList = () => {
    navigate(DEVICE_LIST);
  };

  const onSuccess = (): void => {
    toast.success('Stock Type Updated Successfully.');
    navigateToDeviceList();
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

  const updateDeviceStockTypeMutation = useMutation({
    mutationKey: ['update-device-stock-type', id],
    mutationFn: updateDeviceStockType,
    onSuccess,
    onError,
  });

  const schemaResolver = yupResolver(
    yup.object().shape({
      stock_type_id: yup
        .number()
        .typeError('Stock Type is invalid.')
        .required('Stock type is required'),
    })
  );

  const {
    register,
    control,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<DeviceStockTypeUpdateFormFields>({ resolver: schemaResolver });

  useEffect(() => {
    if (deviceData) {
      reset({
        stock_type_id: deviceData?.stock_type_id,
      });
    }
  }, [deviceData]);

  const onSubmit = async (formData: any) => {
    setSubmitted(true);
    if (!formData.remarks) {
      delete formData.remarks;
    }
    await updateDeviceStockTypeMutation.mutate(formData);
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
    updateDeviceStockTypeMutation,
    submitted,
    setSubmitted,
    navigateToDeviceList,
    deviceData,
    isFetchingDeviceData,
  };
}
