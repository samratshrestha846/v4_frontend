import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { UBOT_LIST } from '../../../../constants/path';
import usePropertiesDropdown from '../../../../hooks/dropdown/usePropertiesDropdown';
import {
  DEVICE_CONFIGURATION_TYPE_UBOT,
  STATUS_ACTIVE,
} from '../../../../constants/constants';
import useDevicesDropdown from '../../../../hooks/dropdown/useDevicesDropdown';
import useCreditTypesDropdown from '../../../../hooks/dropdown/useCreditTypesDropdown';
import useReadUbotSite from './useReadUbotSite';
import ubot from '../../../../helpers/api/ubot';
import { UbotFormFields, UbotSite } from '../../../../types/ubot';
import useReadProperty from '../../../property/hooks/useReadProperty';

export default function useUpdateUbotSite() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [serverValidationError, setServerValidationError] =
    useState<boolean>(false);
  const [showCustomerRegion, setShowCustomerRegion] = useState<boolean>(false);
  const [region, setRegion] = useState<string>();
  const [customer, setCustomer] = useState<string>();

  const [customerPropertyId, setCustomerPropertyId] = useState<number>();

  const {
    data: propertyData,
    isFetching: isFetchingProperty,
    isSuccess: isSuccessProperty,
  } = useReadProperty(Number(customerPropertyId));

  const {
    data: ubotData,
    isFetching: isFetchingUbotData,
    isError: isErrorUbotData,
  } = useReadUbotSite();

  const {
    data: propertiesOptions,
    isFetching: isFetchingPropertiesOptions,
    isError: isErrorPropertiesOptions,
  } = usePropertiesDropdown();

  const {
    data: serviceTypesOptions,
    isFetching: isFetchingServiceTypesOptions,
    isError: isErrorServiceTypesOptions,
  } = useCreditTypesDropdown();

  const {
    data: devicesOptions,
    isFetching: isFetchingDevicesOptions,
    isError: isErrorDevicesOptions,
  } = useDevicesDropdown({
    action: 'form',
    device_type: DEVICE_CONFIGURATION_TYPE_UBOT,
    isDependentQuery: true,
    deviceId: ubotData?.device?.id,
    status: ubotData?.status,
    isDependencyFetched: !!ubotData,
  });

  const updateUbotSite = (fromData: UbotSite) => {
    return ubot.updateUbotSite(fromData, id);
  };

  const navigateToUbotSiteList = () => {
    navigate(UBOT_LIST);
  };

  const onSuccess = () => {
    toast.success('Ubot Site Updated Successfully.');
    navigateToUbotSiteList();
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

  const updateUbotSiteMutation = useMutation({
    mutationKey: ['update-ubot-site'],
    mutationFn: updateUbotSite,
    onSuccess,
    onError,
  });

  const schemaResolver = yupResolver(
    yup.object().shape({
      name: yup.string().required('Site name is required.'),
      device_id: yup
        .number()
        .typeError('Device is invalid.')
        .required('Device is required.'),
      credit_type: yup
        .string()
        .typeError('Service type is invalid.')
        .required('Service type is required.'),
      status: yup
        .string()
        .typeError('Status is invalid.')
        .required('Status is required.'),
      customer_property_id: yup
        .number()
        .typeError('Property is invalid.')
        .required('Property is required.'),
      tank_height: yup
        .number()
        .positive('Tank Height must be positive numeric value')
        .typeError('Tank Height is invalid.')
        .required('Tank Height is required.'),
      density: yup
        .number()
        .positive('Density must be positive numeric value')
        .typeError('Density is invalid.')
        .required('Density is required.'),
    })
  );

  const {
    register,
    handleSubmit,
    control,
    setError,
    reset,
    formState: { errors },
  } = useForm<UbotFormFields>({
    resolver: schemaResolver,
  });

  useEffect(() => {
    if (ubotData) {
      reset({
        name: ubotData.name,
        status: ubotData.status ? ubotData.status : STATUS_ACTIVE,
        device_id: ubotData.device_id,
        credit_type: ubotData.credit_type,
        customer_property_id: ubotData.customer_property_id,
        tank_height: ubotData.tank_setting?.tank_height,
        density: ubotData.tank_setting?.density,
        tank_capacity: ubotData.tank_setting?.tank_capacity,
      });
    }
    setRegion(ubotData ? ubotData.customer_property?.region?.name : undefined);
    setCustomer(
      ubotData ? ubotData.customer_property?.customer?.business_name : undefined
    );
    setShowCustomerRegion(!!ubotData);
  }, [ubotData, propertiesOptions]);

  const onSubmit = async (formData: any) => {
    formData.status = parseInt(formData.status, 10);
    updateUbotSiteMutation.mutate(formData);
  };

  // Propagate on property change
  const propagateOnChange = (selected: any) => {
    setCustomerPropertyId(selected ? selected.value : undefined);
    if (!selected) {
      setShowCustomerRegion(false);
    }
  };

  // set region and customer name
  useEffect(() => {
    if (isSuccessProperty || propertyData) {
      setRegion(propertyData?.region?.name);
      setCustomer(propertyData?.customer?.business_name);
      setShowCustomerRegion(true);
    } else {
      setShowCustomerRegion(false);
    }
  }, [propertyData, isSuccessProperty]);

  return {
    register,
    control,
    errors,
    handleSubmit,
    onSubmit,
    serverValidationError,
    setServerValidationError,
    updateUbotSiteMutation,
    navigateToUbotSiteList,
    propagateOnChange,
    showCustomerRegion,
    customer,
    region,
    ubotData,
    isFetchingUbotData,
    isErrorUbotData,
    propertiesOptions,
    isFetchingPropertiesOptions,
    isErrorPropertiesOptions,
    devicesOptions,
    isErrorDevicesOptions,
    isFetchingDevicesOptions,
    serviceTypesOptions,
    isFetchingServiceTypesOptions,
    isErrorServiceTypesOptions,
    isFetchingProperty,
  };
}
