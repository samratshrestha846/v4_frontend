import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useFieldArray, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import udose from '../../../../helpers/api/udose';
import { Udose, UdoseFormFields } from '../../../../types/udose/udoseList';
import {
  TEST_SITE_LIST,
  UDOSE_SITE_LIST,
  UDOSE_SITE_VIEW,
} from '../../../../constants/path';
import useFetchConfigurationSettings from '../../../../hooks/common/useFetchConfigurationSettings';
import { prepareDynamicUrl } from '../../../../helpers';
import useReadUdoseSite from './useReadUdoseSite';
import usePropertiesDropdown from '../../../../hooks/dropdown/usePropertiesDropdown';
import {
  DEVICE_CONFIGURATION_TYPE_UDOSE,
  STATUS_TEST_SITE,
} from '../../../../constants/constants';
import useDevicesDropdown from '../../../../hooks/dropdown/useDevicesDropdown';
import useCreditTypesDropdown from '../../../../hooks/dropdown/useCreditTypesDropdown';
import useReadProperty from '../../../property/hooks/useReadProperty';
import { LabelNumericValueDropdown } from '../../../../types/common';

export default function useUpdateUdoseSite() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [serverValidationError, setServerValidationError] =
    useState<boolean>(false);
  const [showCustomerRegion, setShowCustomerRegion] = useState<boolean>(false);
  const [region, setRegion] = useState<string>();
  const [customer, setCustomer] = useState<string>();
  const [customerPropertyId, setCustomerPropertyId] = useState<number>();

  const { data: udoseData, isFetching: isFetchingUdoseData } =
    useReadUdoseSite();

  const { data: propertiesOptions, isFetching: isFetchingPropertiesOptions } =
    usePropertiesDropdown();

  const {
    data: propertyData,
    isFetching: isFetchingProperty,
    isSuccess: isSuccessProperty,
  } = useReadProperty(Number(customerPropertyId));

  const {
    data: configurationSettings,
    isFetching: isFetchingConfigurationSettings,
  } = useFetchConfigurationSettings();
  const {
    data: serviceTypesOptions,
    isFetching: isFetchingServiceTypesOptions,
  } = useCreditTypesDropdown();

  const { data: devicesOptions, isFetching: isFetchingDevicesOptions } =
    useDevicesDropdown({
      action: 'form',
      device_type: DEVICE_CONFIGURATION_TYPE_UDOSE,
      isDependentQuery: true,
      deviceId: udoseData?.device?.id,
      status: udoseData?.status,
      isDependencyFetched: !!udoseData,
    });

  const updateUdoseSite = (fromData: Udose) => {
    return udose.updateUdoseSite(fromData, id);
  };

  const navigateToUdoseSiteList = () => {
    navigate(UDOSE_SITE_LIST);
  };

  const navigateToTestSiteList = () => {
    navigate(TEST_SITE_LIST);
  };

  const navigateToUdoseSiteView = () => {
    navigate(prepareDynamicUrl(UDOSE_SITE_VIEW, udoseData?.id));
  };

  const onSuccess = () => {
    if (udoseData?.status === STATUS_TEST_SITE) {
      toast.success('Test Site Updated Successfully.');
      navigateToTestSiteList();
    } else {
      toast.success('Udose Site Updated Successfully.');
      navigateToUdoseSiteView();
    }
  };

  const onError = (error: any) => {
    if (error.response && error.response.status === 417) {
      setServerValidationError(true);
      const errorData = error.response.data.errors;

      Object.keys(errorData).forEach((key) => {
        const errorKey = key.split('.');
        if (errorKey.length > 1) {
          const setting = configurationSettings?.[errorKey[1] as any];
          setError(`site_settings[${errorKey[1] as any}]` as any, {
            type: 'server',
            message: `${setting?.name} is required`,
          });
        } else {
          setError(key as any, {
            type: 'server',
            message: errorData[key][0],
          });
        }
      });
    } else {
      toast.error(error.response.data.status.message);
    }
  };

  const updateUdoseSiteMutation = useMutation({
    mutationKey: ['update-udose-site'],
    mutationFn: updateUdoseSite,
    onSuccess,
    onError,
  });

  const schemaResolver = yupResolver(
    yup.object().shape({
      name: yup.string().required('Site name is required.'),
      device_id: yup.number().typeError('Device is invalid.').nullable(),
      credit_until: yup
        .string()
        .typeError('Credit  until is invalid.')
        .required('Credit until is required.'),
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
    })
  );

  const {
    register,
    handleSubmit,
    control,
    setError,
    reset,
    formState: { errors },
  } = useForm<UdoseFormFields>({
    resolver: schemaResolver,
  });

  const { fields, append } = useFieldArray({
    control,
    name: 'site_settings',
  });

  useEffect(() => {
    if (udoseData) {
      reset({
        name: udoseData.name,
        status: udoseData.status,
        device_id: udoseData.device?.id,
        credit_type: udoseData.credit_type,
        credit_until: new Date(udoseData.credit_until),
        customer_property_id: udoseData.customer_property?.id,
        bore_type: udoseData.bore_type,
        cage_serial_number: udoseData.cage_serial_number,
        trailer_no: udoseData.trailer_no,
        // site_settings: udoseData?.site_settings,
      });

      setRegion(
        udoseData ? udoseData.customer_property?.region?.name : undefined
      );
      setCustomer(
        udoseData
          ? udoseData.customer_property?.customer?.business_name
          : undefined
      );
      setShowCustomerRegion(!!udoseData);

      // Append the configuration settings to the form with initial value
      if (configurationSettings) {
        configurationSettings.forEach((item) => {
          const defaultValue = udoseData.site_settings?.find(
            (val) => val.key === item.key
          )?.value;
          append({ key: item.key, value: defaultValue });
        });
      }
    }
  }, [configurationSettings, udoseData, propertiesOptions]);

  const onSubmit = async (formData: any) => {
    if (formData.credit_until)
      formData.credit_until = moment(formData.credit_until).format(
        'YYYY-MM-DD'
      );

    formData.status = parseInt(formData.status, 10);
    updateUdoseSiteMutation.mutate(formData);
  };

  const propagateOnChange = (selected: LabelNumericValueDropdown) => {
    setCustomerPropertyId(selected ? selected.value : undefined);
    if (!selected) {
      setShowCustomerRegion(false);
    }
  };

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
    updateUdoseSiteMutation,
    navigateToUdoseSiteList,
    navigateToTestSiteList,
    propagateOnChange,
    showCustomerRegion,
    customer,
    region,
    configurationSettings,
    isFetchingConfigurationSettings,
    udoseData,
    isFetchingUdoseData,
    propertiesOptions,
    isFetchingPropertiesOptions,
    devicesOptions,
    isFetchingDevicesOptions,
    serviceTypesOptions,
    isFetchingServiceTypesOptions,
    isFetchingProperty,
    fields,
  };
}
