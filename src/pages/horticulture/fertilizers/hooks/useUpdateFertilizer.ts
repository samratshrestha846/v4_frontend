import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import fertilizer from '../../../../helpers/api/horticulture/fertilizer';
import { FertilizerFormFields } from '../../../../types/horticulture/fertilizer';
import { FERTILIZER_LIST } from '../../../../constants/path';
import FERTILIZER_NUTRIENTS from '../../../../constants/fertilizerConstants';
import useReadFertilizer from './useReadFertilizer';

export default function useUpdateFertilizer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [serverValidationError, setServerValidationError] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const {
    data: fertilizerDetail,
    isFetching: isFetchingFertilizerDetail,
    isError: isErrorFertilizerDetail,
  } = useReadFertilizer(Number(id));

  const updateFertilizer = (fromData: FertilizerFormFields) => {
    return fertilizer.updateFertilizer(fromData, Number(id));
  };

  const navigateToFertilizerList = () => {
    navigate(FERTILIZER_LIST);
  };

  const onSuccess = (): void => {
    setSubmitted(false);
    toast.success('Fertilizer Updated Successfully.');
    navigateToFertilizerList();
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
    setSubmitted(false);
  };

  const updateFertilizerMutation = useMutation({
    mutationKey: ['update-fertilizer'],
    mutationFn: updateFertilizer,
    onSuccess,
    onError,
  });

  const customValidationResolver = () => {
    const dynamicValidation: any = {};
    FERTILIZER_NUTRIENTS.forEach((fert) => {
      dynamicValidation[fert.key] = yup
        .number()
        .transform((value, originalValue) => {
          return originalValue === '' ? null : value;
        })
        .typeError('Must be a positive numeric value.')
        .nullable()
        .positive('Must be a positive numeric value.');
    });
    return dynamicValidation;
  };

  const schemaResolver = yupResolver(
    yup.object().shape({
      name: yup
        .string()
        .typeError('Name is invalid.')
        .required('Name is required.'),
      nutrition_combination: yup
        .object()
        .shape({ ...customValidationResolver() })
        .test(
          'at-least-one',
          'At least one nutrition value is required',
          (obj) => {
            return Object.values(obj).some(
              (value) => value !== undefined && value !== null
            );
          }
        )
        .required('Nutrition combination is required'),
      is_active: yup
        .boolean()
        .typeError('Status is invalid.')
        .required('Status is required.'),
      water_mass: yup
        .number()
        .positive('Water mass must be a positive number.')
        .typeError('Water mass is invalid.')
        .required('Water mass is required.'),
      fertilizer_mass: yup
        .number()
        .positive('Fertilizer mass must be a positive number.')
        .typeError('Fertilizer mass is invalid.')
        .required('Fertilizer mass is required.'),
      solution_volume: yup
        .number()
        .positive('Solution volume must be a positive number.')
        .typeError('Solution volume is invalid.')
        .required('Solution volume is required.'),
    })
  );

  const {
    register,
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<FertilizerFormFields>({
    resolver: schemaResolver,
  });

  useEffect(() => {
    if (fertilizerDetail) {
      reset({
        name: fertilizerDetail?.name,
        is_active: fertilizerDetail?.is_active,
        nutrition_combination: fertilizerDetail?.nutrition_combination,
        water_mass: fertilizerDetail?.water_mass,
        fertilizer_mass: fertilizerDetail?.fertilizer_mass,
        solution_volume: fertilizerDetail?.solution_volume,
      });
    }
  }, [fertilizerDetail]);

  const onSubmit = async (formData: FertilizerFormFields) => {
    setSubmitted(true);
    FERTILIZER_NUTRIENTS.forEach((item) => {
      if (!formData.nutrition_combination[item.key]) {
        delete formData.nutrition_combination[item.key];
      }
    });

    updateFertilizerMutation.mutate(formData);
  };

  return {
    register,
    control,
    errors,
    handleSubmit,
    onSubmit,
    serverValidationError,
    setServerValidationError,
    updateFertilizerMutation,
    navigateToFertilizerList,
    submitted,
    fertilizerDetail,
    isFetchingFertilizerDetail,
    isErrorFertilizerDetail,
  };
}
