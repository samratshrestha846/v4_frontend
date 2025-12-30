import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import supplements from '../../../helpers/api/supplements';
import { SUPPLEMENT_LIST } from '../../../constants/path';
import useNonMethaneReducerNutrientList from '../../nutrients/hooks/useNonMethaneReducerNutrientList';
import useMethaneReducerNutrientList from '../../nutrients/hooks/useMethaneReducerNutrientList';
import { SupplementFormFields } from '../../../types/supplements/supplement';
import useReadSupplement from './useReadSupplement';
import Nutrient from '../../../types/nutrients/nutrients';

export default function useUpdateSupplement() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [serverValidationError, setServerValidationError] = useState(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const {
    data: supplement,
    isFetching: isFetchingSupplement,
    isError: isErrorSupplement,
  } = useReadSupplement(Number(id));

  const {
    data: methaneNonReducingNutrientList,
    isFetching: isFetchingNonMethaneReducingNutrietList,
    isError: isErrorNonMethaneReducingNutrietList,
  } = useNonMethaneReducerNutrientList();

  const {
    data: methaneReducingNutrientList,
    isFetching: isFetchingMethaneReducingNutrietList,
    isError: isErrorMethaneReducingNutrietList,
  } = useMethaneReducerNutrientList();

  const updateSupplement = (fromData: FormData) => {
    return supplements.updateSupplement(fromData, Number(id));
  };

  const customValidationResolver = () => {
    const dynamicValidation: any = {};
    let nutritionList: Nutrient[] = [];

    if (methaneNonReducingNutrientList && methaneReducingNutrientList) {
      nutritionList = [
        ...methaneNonReducingNutrientList,
        ...methaneReducingNutrientList,
      ];
    }
    nutritionList?.forEach((nutrition) => {
      dynamicValidation[nutrition.name] = yup
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
        .typeError('Name is invalid')
        .required('Name is required'),
      density: yup
        .number()
        .positive('Density must be positive numeric value')
        .typeError('Density must be a numeric value')
        .required('Density date is required'),
      standard_concentration: yup
        .number()
        .positive('Standard concentration must be positive numeric value')
        .typeError('Standard concentration must be a numeric value')
        .required('Standard concentration date is required'),
      methane_reducing_factor: yup
        .number()
        .min(0, 'Methance Reducing Factor must be greater than or equal to 0')
        .max(100, 'Methance Reducing Factor must be less than or equal to 100')
        .typeError('Methance Reducing Factor must be a numeric value')
        .required('Methance Reducing Factor date is required'),
      is_active: yup
        .string()
        .typeError('Status is invalid')
        .required('Status is required.'),
      nutrition: yup
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
        ),
    })
  );

  const navigateToSupplementList = () => {
    navigate(SUPPLEMENT_LIST);
  };

  const onSuccess = (): void => {
    toast.success('Supplement Updated Successfully.');
    navigateToSupplementList();
  };

  const onError = (error: any) => {
    if (error.response && error.response.status === 417) {
      setServerValidationError(true);
      const errorData = error.response.data.errors;
      Object.keys(errorData).forEach((key) =>
        setError(key as any, {
          type: 'server',
          message: errorData[key][0],
        })
      );
    } else {
      toast.error(error.response.data.status.message);
    }
    setSubmitted(false);
  };

  const updateSupplementMutation = useMutation({
    mutationKey: ['update-supplement', id],
    mutationFn: updateSupplement,
    onSuccess,
    onError,
  });

  const onSubmit = async (formData: any) => {
    setSubmitted(true);
    methaneNonReducingNutrientList?.forEach((item) => {
      if (!formData.nutrition[item.name]) {
        delete formData.nutrition[item.name];
      }
    });

    methaneReducingNutrientList?.forEach((item) => {
      if (!formData.nutrition[item.name]) {
        delete formData.nutrition[item.name];
      }
    });

    formData.is_active = formData.is_active === 'true';
    updateSupplementMutation.mutate(formData);
  };

  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    setError,
    formState: { errors },
  } = useForm<SupplementFormFields>({
    resolver: schemaResolver,
  });

  useEffect(() => {
    if (supplement) {
      reset({
        name: supplement?.name,
        slug: supplement?.slug,
        density: supplement?.density,
        standard_concentration: supplement?.standard_concentration,
        methane_reducing_factor: supplement?.methane_reducing_factor,
        is_active: supplement?.is_active,
        nutrition: supplement?.nutrition,
      });
    }
  }, [supplement]);

  return {
    register,
    control,
    handleSubmit,
    onSubmit,
    errors,
    watch,
    setValue,
    reset,
    submitted,
    setSubmitted,
    serverValidationError,
    setServerValidationError,
    updateSupplementMutation,
    navigateToSupplementList,
    methaneNonReducingNutrientList,
    isFetchingNonMethaneReducingNutrietList,
    isErrorNonMethaneReducingNutrietList,
    methaneReducingNutrientList,
    isFetchingMethaneReducingNutrietList,
    isErrorMethaneReducingNutrietList,
    supplement,
    isFetchingSupplement,
    isErrorSupplement,
  };
}
