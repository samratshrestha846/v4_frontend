import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import horticulture from '../../../../helpers/api/horticulture';
import { CROP_LIST } from '../../../../constants/path';
import { CropFormValues } from '../../../../types/horticulture/horticulture';

export default function useCreateCrop() {
  const navigate = useNavigate();
  const [serverValidationError, setServerValidationError] =
    useState<boolean>(false);

  const [submitted, setSubmitted] = useState(false);

  const createCrop = (formData: CropFormValues) => {
    return horticulture.addCrop(formData);
  };

  const navigateToCropList = () => {
    navigate(CROP_LIST);
  };

  const onSuccess = (): void => {
    setSubmitted(false);
    toast.success('New Crop Created Sucessfully.');
    navigateToCropList();
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
    mutationKey: ['create-crop'],
    mutationFn: createCrop,
    onSuccess,
    onError,
  });

  const schemaResolver = yupResolver(
    yup.object().shape({
      name: yup.string().required('Name is required.'),
      life_span_in_days: yup
        .number()
        .typeError('Life Span Days is invalid.')
        .positive('Life Span Days must be a positive numeric value.')
        .required('Life Span Days is required.'),
    })
  );

  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<CropFormValues>({
    resolver: schemaResolver,
  });

  const onSubmit = async (formData: CropFormValues) => {
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
    navigateToCropList,
    submitted,
  };
}
