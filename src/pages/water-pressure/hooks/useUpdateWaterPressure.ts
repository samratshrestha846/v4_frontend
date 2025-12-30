import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { WaterPressureFormFields } from '../../../types/waterPressure';
import waterPressure from '../../../helpers/api/waterPressure';
import useReadWaterPressure from './useReadWaterPressure';

export default function useUpdateWaterPressure({
  toggleModal,
  refetch,
  id,
}: {
  toggleModal: () => void;
  refetch: any;
  id: number;
}) {
  const [serverValidationError, setServerValidationError] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const {
    data: waterPressureDetail,
    isFetching,
    isError,
  } = useReadWaterPressure(id);

  const updateWaterPressure = (fromData: WaterPressureFormFields) => {
    return waterPressure.updateWaterPressure(fromData, id);
  };

  const onSuccess = () => {
    toast.success('Water Pressure Updated Successfully.');
    toggleModal();
    refetch();
    setSubmitted(false);
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

  const updateWaterPressureMutation = useMutation({
    mutationKey: ['update-water-pressure'],
    mutationFn: updateWaterPressure,
    onSuccess,
    onError,
  });

  const schemaResolver = yupResolver(
    yup.object().shape({
      pressure: yup
        .number()
        .positive('Water pressure must be a positive number')
        .typeError('Water pressure is invalid')
        .required('Water pressure is required'),
    })
  );

  const {
    register,
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<WaterPressureFormFields>({
    resolver: schemaResolver,
  });

  useEffect(() => {
    if (waterPressureDetail) {
      reset({
        site_id: waterPressureDetail.site_id,
        pressure: waterPressureDetail.pressure,
      });
    }
  }, [waterPressureDetail]);

  const onSubmit = async (formData: WaterPressureFormFields) => {
    setSubmitted(true);
    updateWaterPressureMutation.mutate(formData);
  };

  return {
    register,
    control,
    errors,
    handleSubmit,
    onSubmit,
    serverValidationError,
    setServerValidationError,
    submitted,
    waterPressureDetail,
    isFetching,
    isError,
  };
}
