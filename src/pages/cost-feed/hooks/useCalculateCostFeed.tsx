import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import apiCostFeedAnalysis from '../../../helpers/api/costFeedAnalysis';
import {
  CalculateCostFeedFormFields,
  CostFeedAnalysis,
} from '../../../types/costFeed/costFeed';

export default function useCalculateCostFeed() {
  const [serverValidationError, setServerValidationError] = useState(false);
  const [costFeedData, setCostFeedData] = useState<CostFeedAnalysis | null>(
    null
  );

  const [loading, setLoading] = useState(false);

  const calculateCostFeed = (fromData: CalculateCostFeedFormFields) => {
    return apiCostFeedAnalysis.calculateCostFeed(fromData);
  };

  const onSuccess = (data: CostFeedAnalysis): void => {
    setCostFeedData(data);
    setLoading(false);
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

  const createCostFeedMutation = useMutation({
    mutationKey: ['calculate-cost-feed'],
    mutationFn: calculateCostFeed,
    onSuccess,
    onError,
  });

  const schemaResolver = yupResolver(
    yup.object().shape({
      dosing_rate: yup
        .number()
        .positive('Dosing Rate must be a positive numeric value.')
        .typeError('Dosing Rate is invalid')
        .required('Dosing Rate is required.'),
      water_consumption: yup
        .number()
        .positive('Water Cosumption must be a positive numeric value.')
        .typeError('Water Comsumption is invalid')
        .required('Water Comsumption is required.'),
      head_count: yup
        .number()
        .positive('Head count must be a positive numeric value.')
        .typeError('Head count is invalid')
        .required('Head Count is required.'),
      product: yup
        .string()
        .typeError('Product is invalid')
        .required('Product is required.'),
    })
  );

  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<CalculateCostFeedFormFields>({ resolver: schemaResolver });

  const onSubmit = async (formData: CalculateCostFeedFormFields) => {
    setLoading(true);
    createCostFeedMutation.mutate(formData);
  };

  return {
    register,
    control,
    errors,
    handleSubmit,
    onSubmit,
    serverValidationError,
    setServerValidationError,
    createCostFeedMutation,
    costFeedData,
    loading,
  };
}
