import { useMemo, useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { CUSTOMER_LIST } from '../../../../constants/path';

import {
  BusinessOwnerInputFields,
  CustomerInputFields,
  InputFields,
  PropertyInputFields,
  StationManagerInputFields,
} from '../../../../types/customer/customerOnboarding';
import {
  ONBOARDING_STEPS,
  ONBOARDING_STEPS_1,
  ONBOARDING_STEPS_2,
  ONBOARDING_STEPS_3,
  ONBOARDING_STEPS_4,
} from '../constants/stepsConstants';

import customerOnboarding from '../../../../helpers/api/customerOnboarding';

export default function useCustomerOnboarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isCreateNewStationManager, setIsCreateNewStationManager] =
    useState<boolean>(false);
  const [customerDetails, setCustomerDetails] = useState<CustomerInputFields>();
  const [ownerDetails, setOwnerDetails] = useState<BusinessOwnerInputFields>();
  const [propertyDetails, setPropertyDetails] = useState<PropertyInputFields>();
  const [stationManagerDetails, setStationManagerDetails] =
    useState<StationManagerInputFields>();

  const [serverValidationError, setServerValidationError] = useState(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const steps = useMemo(() => ONBOARDING_STEPS, []);

  const navigate = useNavigate();

  const navigateToCustomerList = () => {
    return navigate(CUSTOMER_LIST);
  };

  const dynamicResolver = (): any => {
    let resolver;

    const customerFormResolver = {
      business_name: yup
        .string()
        .typeError('Business name is invalid')
        .required('Business name is required'),
      email: yup
        .string()
        .email('Email must be a valid email address')
        .required('Email is required'),
      is_active: yup
        .boolean()
        .typeError('Status is invalid')
        .required('Status is required'),
    };

    if (currentStep === ONBOARDING_STEPS_1) {
      resolver = customerFormResolver;
      return resolver;
    }

    const ownerFormResovler = {
      owner_first_name: yup.string().required('First name is required'),
      owner_last_name: yup.string().required('Last name is required'),
      owner_email: yup
        .string()
        .email('Email must be a valid email address')
        .required('Email is email address'),
    };

    if (currentStep === ONBOARDING_STEPS_2) {
      resolver = { ...customerFormResolver, ...ownerFormResovler };
      return resolver;
    }

    const propertyFormResovler = {
      name: yup
        .string()
        .typeError('Property name is invalid')
        .required('Property name is required'),
      region_id: yup
        .string()
        .typeError('Region is invalid')
        .required('Region is required.'),
      is_enable: yup.boolean().required('This value is required'),
      client_id: yup.mixed().when('is_enable', {
        is: true,
        then: yup
          .number()
          .integer('Client ID must be a non decimal number')
          .positive('Client ID must be a positive numeric value')
          .typeError('Client ID must be a numeric value')
          .required('Client ID is required'),
        otherwise: yup.lazy((value) => {
          return value !== undefined && value !== null && value !== ''
            ? yup
                .number()
                .integer('Client ID must be a non decimal number')
                .typeError('Client ID must be a numeric value')
                .positive('Client ID must be a positive numeric value')
                .required('Client ID is required')
                .transform((originalValue) => {
                  return typeof originalValue === 'string'
                    ? parseFloat(originalValue)
                    : originalValue;
                })
            : yup.mixed().nullable();
        }),
      }),
    };

    if (currentStep === ONBOARDING_STEPS_3) {
      resolver = {
        ...customerFormResolver,
        ...ownerFormResovler,
        ...propertyFormResovler,
      };
      return resolver;
    }

    const stationManagerFormResovler = {
      first_name: yup.string().required('First name is required'),
      last_name: yup.string().required('Last name is required'),
      email_address: yup
        .string()
        .email('Email must be a valid email address')
        .required('Email is required'),
    };

    if (currentStep === ONBOARDING_STEPS_4 && !isCreateNewStationManager) {
      resolver = {
        ...customerFormResolver,
        ...ownerFormResovler,
        ...propertyFormResovler,
      };
      return resolver;
    }

    if (currentStep === ONBOARDING_STEPS_4 && isCreateNewStationManager) {
      resolver = {
        ...customerFormResolver,
        ...ownerFormResovler,
        ...propertyFormResovler,
        ...stationManagerFormResovler,
      };
      return resolver;
    }

    return {};
  };

  const schemaResolver = yupResolver(yup.object().shape(dynamicResolver()));
  const {
    control,
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm<InputFields>({ resolver: schemaResolver });

  const createCustomerOnboarding = async (formData: any) => {
    await customerOnboarding.createCustomerOnboarding(formData);
  };

  const onSuccess = (): void => {
    toast.success('Customer Onboarded Successfully.');
    navigateToCustomerList();
  };

  const onError = (error: any) => {
    if (error.response && error.response.status === 417) {
      setServerValidationError(true);
      let errorOccuredTab = currentStep;
      const errorData = error.response.data.errors;
      Object.keys(errorData).forEach((key) => {
        const arrayKeys = key.split('.');
        if (arrayKeys.length === 1) {
          errorOccuredTab = ONBOARDING_STEPS_1;
          setError(key as any, {
            type: 'server',
            message: errorData[key][0],
          });
        }

        if (arrayKeys.length === 2 && arrayKeys[0] === 'owner') {
          errorOccuredTab =
            errorOccuredTab < ONBOARDING_STEPS_2
              ? errorOccuredTab
              : ONBOARDING_STEPS_2;
          setError(`owner_${arrayKeys[1]}` as any, {
            type: 'server',
            message: String(errorData[key][0]).replace(
              /owner\.email/g,
              arrayKeys[1]
            ),
          });
        }

        if (arrayKeys.length === 3 && arrayKeys[0] === 'site_managers') {
          errorOccuredTab =
            errorOccuredTab < ONBOARDING_STEPS_4
              ? errorOccuredTab
              : ONBOARDING_STEPS_4;
          setError(
            arrayKeys[2] === 'email'
              ? `${arrayKeys[2]}_address`
              : (arrayKeys[2] as any),
            {
              type: 'server',
              message: String(errorData[key][0]).replace(
                /site_managers\.0\.email/g,
                arrayKeys[2]
              ),
            }
          );
        }
      });
      setCurrentStep(errorOccuredTab);
    } else {
      toast.error(error.response.data.status.message);
    }
    setSubmitted(false);
  };

  const createCustomerOnboardingMutation = useMutation({
    mutationKey: ['customer-onboarding'],
    mutationFn: createCustomerOnboarding,
    onSuccess,
    onError,
  });

  const onSubmit = async (formData: any) => {
    setSubmitted(true);
    const customerFormDetails: CustomerInputFields = {
      business_name: formData?.business_name,
      email: formData?.email,
      phone: formData?.phone,
      referrer_id: formData?.referrer_id,
      subscribed_products: formData?.subscribed_products
        ? formData?.subscribed_products
        : [],
      settings: formData?.settings,
      is_active: formData?.is_active,
    };

    const ownerFormDetails: BusinessOwnerInputFields = {
      owner_first_name: formData?.owner_first_name,
      owner_last_name: formData?.owner_last_name,
      owner_email: formData?.owner_email,
      owner_phone_number: formData?.owner_phone_number,
    };

    const propertyFormDetails: PropertyInputFields = {
      name: formData?.name,
      region_id: formData?.region_id,
      is_enable: formData?.is_enable,
      client_id: formData?.client_id,
    };

    const stationManagerFormDetails: StationManagerInputFields = {
      first_name: formData?.first_name,
      last_name: formData?.last_name,
      email_address: formData?.email_address,
      phone_number: formData?.phone_number,
    };

    if (currentStep <= steps.length) {
      setCurrentStep(
        currentStep === steps.length ? currentStep : currentStep + 1
      );
      setCustomerDetails(customerFormDetails);
      setOwnerDetails(ownerFormDetails);
      setPropertyDetails(propertyFormDetails);
      setStationManagerDetails(stationManagerFormDetails);
      setValue(
        'owner_email',
        formData?.owner_email ? formData?.owner_email : formData?.email
      );
    }

    if (steps.length === currentStep) {
      const preparedFormData: any = customerFormDetails;

      preparedFormData.owner = {
        first_name: formData?.owner_first_name,
        last_name: formData?.owner_last_name,
        email: formData?.owner_email,
        phone_number:
          formData?.owner_phone_number && formData?.owner_phone_number !== '61'
            ? `+${formData?.owner_phone_number}`
            : '',
      };

      preparedFormData.name = formData?.name;
      preparedFormData.region_id = formData?.region_id;
      preparedFormData.site_managers = [];

      preparedFormData.property_settings = {
        optiweigh: {
          is_enable: formData?.is_enable,
          client_id: formData?.client_id,
        },
      };

      if (isCreateNewStationManager) {
        preparedFormData.site_managers = [
          {
            first_name: formData?.first_name,
            last_name: formData?.last_name,
            email: formData?.email_address,
            phone_number:
              formData?.phone_number && formData?.phone_number !== '61'
                ? `+${formData?.phone_number}`
                : '',
          },
        ];
      }
      await createCustomerOnboardingMutation.mutate(preparedFormData);
    } else {
      setSubmitted(false);
    }
  };

  return {
    control,
    register,
    errors,
    handleSubmit,
    setError,
    onSubmit,
    navigateToCustomerList,
    steps,
    currentStep,
    setCurrentStep,
    isCreateNewStationManager,
    setIsCreateNewStationManager,
    customerDetails,
    propertyDetails,
    stationManagerDetails,
    ownerDetails,
    submitted,
    serverValidationError,
    setServerValidationError,
  };
}
