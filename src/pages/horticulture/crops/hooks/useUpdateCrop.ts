import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import useReadCrop from './useReadCrop';
import { CropFormValues } from '../../../../types/horticulture/horticulture';
import horticulture from '../../../../helpers/api/horticulture';
import { CROP_LIST } from '../../../../constants/path';

export default function useUpdateCrop() {
  const { id } = useParams();

  const navigate = useNavigate();
  const [serverValidationError, setServerValidationError] =
    useState<boolean>(false);

  const [submitted, setSubmitted] = useState(false);

  const { data: cropDetail, isError, isFetching } = useReadCrop(id);

  const updateSiteFollowup = (formData: CropFormValues) => {
    return horticulture.updateCrop(id, formData);
  };

  const navigateToCropList = () => {
    navigate(CROP_LIST);
  };

  const onSuccess = (): void => {
    setSubmitted(false);
    toast.success('Crop Updated Successfully.');
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

  const updateCropMutation = useMutation({
    mutationKey: ['update-crop'],
    mutationFn: updateSiteFollowup,
    onSuccess,
    onError,
  });

  const schemaResolver = yupResolver(
    yup.object().shape({
      name: yup.string().required('Name is required.'),
      life_span_in_days: yup
        .number()
        .typeError('Life Span Days is invalid.')
        .positive('Life Span Days must be positive numeric value.')
        .required('Life Span Days is required.'),
    })
  );

  const {
    register,
    handleSubmit,
    control,
    reset,
    setError,
    formState: { errors },
  } = useForm<CropFormValues>({
    resolver: schemaResolver,
  });

  const onSubmit = async (formData: CropFormValues) => {
    setSubmitted(true);
    updateCropMutation.mutate(formData);
  };

  useEffect(() => {
    if (cropDetail) {
      reset({
        name: cropDetail.name,
        life_span_in_days: cropDetail.life_span_in_days,
      });
    }
  }, [cropDetail]);

  return {
    register,
    control,
    errors,
    handleSubmit,
    onSubmit,
    serverValidationError,
    setServerValidationError,
    updateCropMutation,
    navigateToCropList,
    submitted,
    cropDetail,
    isError,
    isFetching,
  };
}
