import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import {
  NutrientCalculatorParams,
  NutrientCostAnalysis,
} from '../../../../../../types/udose/costAnalysis';
import costAnalysis from '../../../../../../helpers/api/udose/costAnalysis';
import ga from '../../../../../../utils/ga/ga-init';
import { capitalizeWordFirstLetter } from '../../../../../../helpers';

export default function useNutrientCostAnalysis() {
  const [serverValidationError, setServerValidationError] = useState(false);
  const [triggerFetchAnalysedData, setTriggerFetchAnalysedData] =
    useState<boolean>(false);
  const [mineralOptions, setMineralOptions] = useState<
    { label: string; value: string }[]
  >([]);

  const [supplementId, setSupplmentId] = useState<number>();
  const [targetMineral, setTargetMineral] = useState<string>();
  const [params, setParams] = useState<NutrientCalculatorParams>();

  const [analysisData, setAnalysisData] = useState<NutrientCostAnalysis>();

  const schemaResolver = yupResolver(
    yup.object().shape({
      supplementId: yup
        .number()
        .typeError('Supplement is invalid')
        .required('Supplement is required.'),
      target_mineral: yup
        .string()
        .typeError('Target Mineral is invalid')
        .required('Target Mineral is required.'),
      target_mineral_amount: yup
        .number()
        .positive('Must be a positive number.')
        .typeError('Target Mineral Amount is invalid')
        .required('Target Mineral Amount is required.'),
      waterIntake: yup
        .number()
        .positive('Must be a positive number.')
        .typeError('Total Water Intake is invalid.')
        .required('Total Water Intake is required.'),
      price: yup
        .mixed()
        .test('is-valid-number', 'Must be a positive number.', (value: any) => {
          if (!value) return true;
          return value > 0;
        })
        .nullable(),
    })
  );

  const {
    register,
    handleSubmit,
    control,
    resetField,
    formState: { errors },
  } = useForm<NutrientCalculatorParams>({
    resolver: schemaResolver,
  });

  const calculateCostAnalysis = () => {
    return costAnalysis.calculateCostAnalysis(params);
  };

  const {
    data: costAnalysisData,
    isFetching: isFetchingCostAnalysedData,
    isFetched: isFetchedAnalysedData,
  } = useQuery({
    queryKey: ['calculate-const-analysis', params],
    queryFn: calculateCostAnalysis,
    enabled: triggerFetchAnalysedData,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (isFetchedAnalysedData) {
      setTriggerFetchAnalysedData(false);
      setAnalysisData(costAnalysisData);
    }
  }, [isFetchedAnalysedData]);

  const onSubmit = async (formData: NutrientCalculatorParams) => {
    ga.trackEventBuilder('Nutrient Calculator')({
      action: 'Calculate Nutrient Cost Analysis',
    });
    setParams(formData);
    setTriggerFetchAnalysedData(true);
  };

  const propagateOnSupplementChange = (selected: any) => {
    if (!selected) {
      setMineralOptions([]);
      setSupplmentId(undefined);
      return;
    }
    const mineralOptionsList =
      Object.entries(selected.nutrition ?? {}).map(([nutrientKey]) => ({
        value: nutrientKey,
        label: capitalizeWordFirstLetter(nutrientKey.replace(/_/g, ' ')),
      })) ?? [];
    setMineralOptions(mineralOptionsList);
    setSupplmentId(selected);
  };

  const propagateOnMineralChange = (e: any) => {
    setTargetMineral(e ? e.value : undefined);
  };

  const clearFormFields = () => {
    resetField('waterIntake');
    resetField('target_mineral_amount');
    resetField('price');
    setAnalysisData(undefined);
  };

  return {
    register,
    control,
    errors,
    handleSubmit,
    onSubmit,
    serverValidationError,
    setServerValidationError,
    propagateOnSupplementChange,
    isFetchingCostAnalysedData,
    mineralOptions,
    setMineralOptions,
    clearFormFields,
    targetMineral,
    supplementId,
    propagateOnMineralChange,
    analysisData,
  };
}
