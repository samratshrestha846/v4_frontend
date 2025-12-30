import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import useSupplementsDropdown from '../../../../../../hooks/dropdown/useSupplementsDropdown';
import customerProperty from '../../../../../../helpers/api/customerProperty';
import { LabelNumericValue } from '../../../../../../types/common';
import { Property } from '../../../../../../types/property/propertyList';

type Props = {
  property?: Property;
  refetchProperty: () => void;
};

export default function useUpdateCustomerSubscriptions({
  property,
  refetchProperty,
}: Props) {
  const [serverValidationError, setServerValidationError] = useState(false);

  const [defaultOptions, setDefaultOptions] = useState<LabelNumericValue[]>([]);
  const [subscriptions, setSubscriptions] = useState<LabelNumericValue[]>([]);
  const [isSubscriptionEditEnabled, setIsSubscriptionEditEnabled] =
    useState(false);
  const [submitted, setSubmitted] = useState(false);

  const {
    data: supplementsOptions,
    isFetching: isFetchingSupplementsOptions,
    isError: isErrorSupplementsOptions,
  } = useSupplementsDropdown();

  useEffect(() => {
    if (property) {
      const defaultSelectedOptions: LabelNumericValue[] = [];

      property.customer_subscriptions?.forEach((item) => {
        defaultSelectedOptions.push({
          label: item.supplement?.name,
          value: item.supplement?.id,
        });
      });

      setDefaultOptions(defaultSelectedOptions);
      setSubscriptions(defaultSelectedOptions);

      const resetFields: any = {};
      resetFields.supplement_id = defaultSelectedOptions;
      property?.customer_subscriptions?.forEach((item: any) => {
        resetFields[`cost_per_ltr_${item.supplement?.id}`] = item.cost_per_ltr;
      });
      reset(resetFields);
    }
  }, [property, isSubscriptionEditEnabled]);

  const createSubscriptions = async (formData: any) => {
    return customerProperty.createCustomerSubscriptions(formData);
  };

  const onSuccess = () => {
    toast.success('Subscription updated Successfully.');
    refetchProperty();
    setIsSubscriptionEditEnabled(false);
    setSubmitted(false);
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

  const createCustomerSubscriptionMutation = useMutation({
    mutationKey: ['create-subscriptions'],
    mutationFn: createSubscriptions,
    onSuccess,
    onError,
  });

  const propagateOnSupplementChange = (selected: LabelNumericValue[]) => {
    if (selected) {
      setSubscriptions(selected);
    }
  };

  // custom validation
  const customValidation = () => {
    const validations: any = {};
    validations.supplement_id = yup
      .array()
      .min(1, 'This field needs at least one selection.')
      .typeError('Must be anumeric value')
      .required('This field is required.');

    if (subscriptions.length > 0) {
      subscriptions.forEach((item) => {
        validations[`cost_per_ltr_${item.value}`] = yup
          .number()
          .positive('Must be a positive numeric value.')
          .typeError('Must be a numeric value')
          .required('This field is required.');
      });
    }
    return validations;
  };

  const schemaResolver = yupResolver(yup.object().shape(customValidation()));

  const {
    register,
    control,
    formState: { errors },
    setError,
    reset,
    handleSubmit,
  } = useForm({
    resolver: schemaResolver,
  });

  const onSubmit = async (formData: any) => {
    setSubmitted(true);
    const preparedData: Array<any> = [];
    subscriptions?.forEach((item) => {
      const data = {
        supplement_id: item.value,
        cost_per_ltr: formData[`cost_per_ltr_${item.value}`],
      };
      preparedData.push(data);
    });
    const formDataPrepared = {
      prices: preparedData,
      customer_property_id: property?.id,
    };
    formData = formDataPrepared;
    await createCustomerSubscriptionMutation.mutate(formData);
  };

  const handleEdit = () => {
    setIsSubscriptionEditEnabled(!isSubscriptionEditEnabled);
  };

  return {
    register,
    control,
    errors,
    handleSubmit,
    onSubmit,
    serverValidationError,
    setServerValidationError,
    refetchProperty,
    supplementsOptions,
    isFetchingSupplementsOptions,
    isErrorSupplementsOptions,
    isSubscriptionEditEnabled,
    setIsSubscriptionEditEnabled,
    propagateOnSupplementChange,
    subscriptions,
    defaultOptions,
    handleEdit,
    submitted,
  };
}
