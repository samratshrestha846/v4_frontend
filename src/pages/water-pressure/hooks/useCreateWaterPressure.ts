import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { WaterPressureFormFields } from '../../../types/waterPressure';
import waterPressure from '../../../helpers/api/waterPressure';

export default function useCreateWaterPressure({
  toggleModal,
  refetch,
}: {
  toggleModal: () => void;
  refetch: any;
}) {
  const [serverValidationError, setServerValidationError] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const createWaterPressure = (fromData: WaterPressureFormFields) => {
    return waterPressure.createWaterPressure(fromData);
  };

  const onSuccess = () => {
    toast.success('Water Pressure Created Successfully.');
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

  const createWaterPressureMutation = useMutation({
    mutationKey: ['create-water-pressure'],
    mutationFn: createWaterPressure,
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
    setError,
    formState: { errors },
  } = useForm<WaterPressureFormFields>({
    resolver: schemaResolver,
  });

  const onSubmit = async (formData: WaterPressureFormFields) => {
    setSubmitted(true);
    createWaterPressureMutation.mutate(formData);
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
  };
}
