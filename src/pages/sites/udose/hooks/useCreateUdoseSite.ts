import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useFieldArray, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import udose from '../../../../helpers/api/udose';
import { UdoseFormFields } from '../../../../types/udose/udoseList';
import { UDOSE_SITE_LIST, UDOSE_SITE_VIEW } from '../../../../constants/path';
import { STATUS_ACTIVE } from '../../../../constants/constants';
import useFetchConfigurationSettings from '../../../../hooks/common/useFetchConfigurationSettings';
import { prepareDynamicUrl } from '../../../../helpers';
import { LabelNumericValueDropdown } from '../../../../types/common';
import useReadProperty from '../../../property/hooks/useReadProperty';

export default function useCreateUdoseSite() {
  const navigate = useNavigate();
  const [serverValidationError, setServerValidationError] =
    useState<boolean>(false);
  const [showCustomerRegion, setShowCustomerRegion] = useState<boolean>(false);
  const [region, setRegion] = useState<string>();
  const [customer, setCustomer] = useState<string>();
  const [customerPropertyId, setCustomerPropertyId] = useState<number>();

  const {
    data: configurationSettings,
    isFetching: isFetchingConfigurationSettings,
    isError: isErrorConfigurationSettings,
  } = useFetchConfigurationSettings();

  const createUdoseSite = (fromData: UdoseFormFields) => {
    return udose.createUdoseSite(fromData);
  };

  const navigateToUdoseSiteList = () => {
    navigate(UDOSE_SITE_LIST);
  };

  const {
    data: propertyData,
    isFetching: isFetchingProperty,
    isSuccess: isSuccessProperty,
  } = useReadProperty(Number(customerPropertyId));

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

  const createUdoseSiteMutation = useMutation({
    mutationKey: ['create-udose-site'],
    mutationFn: createUdoseSite,
    onSuccess: (data) => {
      toast.success('Udose Site Created Successfully.');
      navigate(prepareDynamicUrl(UDOSE_SITE_VIEW, data?.id));
    },
    onError,
  });

  const schemaResolver = yupResolver(
    yup.object().shape({
      name: yup.string().required('Site name is required.'),
      device_id: yup
        .number()
        .typeError('Device is invalid.')
        .required('Device is required.'),
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
    formState: { errors },
  } = useForm<UdoseFormFields>({
    resolver: schemaResolver,
    defaultValues: {
      status: STATUS_ACTIVE,
      credit_until: moment().endOf('year').toDate(),
    },
  });

  const { fields, append } = useFieldArray({
    control,
    name: 'site_settings',
  });

  // Append the configuration settings to the form with initial value
  useEffect(() => {
    if (configurationSettings) {
      configurationSettings.forEach((item) => {
        append({ key: item.key, value: undefined });
      });
    }
  }, [configurationSettings]);

  const onSubmit = async (formData: UdoseFormFields) => {
    if (formData.credit_until)
      formData.credit_until = moment(formData.credit_until).format(
        'YYYY-MM-DD'
      );
    createUdoseSiteMutation.mutate(formData);
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
    createUdoseSiteMutation,
    navigateToUdoseSiteList,
    propagateOnChange,
    showCustomerRegion,
    customer,
    region,
    configurationSettings,
    isErrorConfigurationSettings,
    isFetchingConfigurationSettings,
    isFetchingProperty,
    fields,
  };
}
