import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { UBOT_LIST } from '../../../../constants/path';
import { STATUS_ACTIVE } from '../../../../constants/constants';
import { UbotFormFields, UbotSite } from '../../../../types/ubot';
import ubot from '../../../../helpers/api/ubot';
import useReadProperty from '../../../property/hooks/useReadProperty';

export default function useCreateUbotSite() {
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

  const createUbotSite = (fromData: UbotSite) => {
    return ubot.createUbotSite(fromData);
  };

  const navigateToUbotSiteList = () => {
    navigate(UBOT_LIST);
  };

  const onSuccess = (): void => {
    toast.success('Ubot Site Created Successfully.');
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

  const createUdoseSiteMutation = useMutation({
    mutationKey: ['create-ubot-site'],
    mutationFn: createUbotSite,
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
    formState: { errors },
  } = useForm<UbotFormFields>({
    resolver: schemaResolver,
    defaultValues: {
      status: STATUS_ACTIVE,
    },
  });

  const onSubmit = async (formData: any) => {
    createUdoseSiteMutation.mutate(formData);
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
    createUdoseSiteMutation,
    navigateToUbotSiteList,
    propagateOnChange,
    showCustomerRegion,
    customer,
    region,
    isFetchingProperty,
  };
}
