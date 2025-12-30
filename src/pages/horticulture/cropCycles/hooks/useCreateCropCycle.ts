import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import horticulture from '../../../../helpers/api/horticulture';
import { CROP_CYCLE_LIST } from '../../../../constants/path';
import { CropCycleFormValues } from '../../../../types/horticulture/horticulture';

export default function useCreateCropCycle() {
  const navigate = useNavigate();
  const [serverValidationError, setServerValidationError] =
    useState<boolean>(false);

  const [submitted, setSubmitted] = useState(false);

  const createCropCycle = (formData: CropCycleFormValues) => {
    return horticulture.addCropCycle(formData);
  };

  const navigateToCropCycleList = () => {
    navigate(CROP_CYCLE_LIST);
  };

  const onSuccess = (): void => {
    toast.success('New Crop Life Cycle Created Sucessfully.');
    navigateToCropCycleList();
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

  const createCropMutation = useMutation({
    mutationKey: ['create-crop-life-cycle'],
    mutationFn: createCropCycle,
    onSuccess,
    onError,
  });

  const schemaResolver = yupResolver(
    yup.object().shape({
      crop_id: yup
        .number()
        .typeError('Crop is invalid.')
        .required('Please select Crop'),
      crop_stage_name: yup.string().required('Crop Stage Name is required.'),
      started_in_days: yup
        .number()
        .typeError('Started In Days is invalid.')
        .positive('Started In Days must be a positive numeric value.')
        .required('Started In Days is required.'),
      ended_in_days: yup
        .number()
        .typeError('Ended In Days is invalid.')
        .positive('Ended In Days must be a positive numeric value.')
        .required('Ended In Days is required.'),
    })
  );

  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<CropCycleFormValues>({
    resolver: schemaResolver,
  });

  const onSubmit = async (formData: CropCycleFormValues) => {
    setSubmitted(true);
    createCropMutation.mutate(formData);
  };

  return {
    register,
    control,
    errors,
    handleSubmit,
    onSubmit,
    serverValidationError,
    setServerValidationError,
    createCropMutation,
    navigateToCropCycleList,
    submitted,
  };
}
