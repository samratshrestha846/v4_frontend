import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import moment from 'moment';
import {
  Cropable,
  CropableFormValues,
} from '../../../../../../types/horticulture/cropable';
import cropable from '../../../../../../helpers/api/horticulture/cropable';

type Props = {
  toggleModal: () => void;
  refetchSubBlocks?: () => void;
  cropableDetail?: Cropable;
};

export default function useUpdateCropAssignedToSubBlock({
  toggleModal,
  refetchSubBlocks,
  cropableDetail,
}: Props) {
  const [serverValidationError, setServerValidationError] =
    useState<boolean>(false);

  const [submitted, setSubmitted] = useState(false);

  const updateCropAssignedToSubBlock = (formData: CropableFormValues) => {
    return cropable.updateCropable(formData, Number(cropableDetail?.id));
  };

  const onSuccess = (): void => {
    setSubmitted(false);
    toast.success('Crop Updated Sucessfully.');
    if (refetchSubBlocks) {
      refetchSubBlocks();
    }
    toggleModal();
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

  const updateCropAssignedToSubBlockMutation = useMutation({
    mutationKey: ['update-crop-assigned-to-sub-block'],
    mutationFn: updateCropAssignedToSubBlock,
    onSuccess,
    onError,
  });

  const schemaResolver = yupResolver(
    yup.object().shape({
      crop_id: yup
        .number()
        .typeError('Crop is invalid.')
        .required('Crop is required.'),
      date_from: yup
        .string()
        .required('Started on is required.')
        .typeError('Started on is invalid.'),
      no_of_plants: yup
        .number()
        .positive('The value must be a positive number')
        .nullable()
        .typeError('No. of plants is invalid.')
        .transform((value, originalValue) =>
          originalValue === '' ? null : value
        ),
    })
  );

  const {
    register,
    handleSubmit,
    control,
    reset,
    setError,
    formState: { errors },
  } = useForm<CropableFormValues>({
    resolver: schemaResolver,
  });

  useEffect(() => {
    if (cropableDetail) {
      reset({
        crop_id: cropableDetail.crop?.id,
        date_from: cropableDetail.date_from
          ? new Date(cropableDetail.date_from)
          : cropableDetail.date_from,
        number_of_plants: cropableDetail.number_of_plants,
      });
    }
  }, [cropableDetail]);

  const onSubmit = async (formData: CropableFormValues) => {
    setSubmitted(true);
    formData.date_from = moment(formData.date_from).format('YYYY-MM-DD');
    updateCropAssignedToSubBlockMutation.mutate(formData);
  };

  return {
    register,
    control,
    errors,
    handleSubmit,
    onSubmit,
    serverValidationError,
    setServerValidationError,
    updateCropAssignedToSubBlockMutation,
    submitted,
  };
}
