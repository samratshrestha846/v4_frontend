import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import moment from 'moment';
import { Block } from '../../../../../../types/horticulture/block';
import { CropableFormValues } from '../../../../../../types/horticulture/cropable';
import cropable from '../../../../../../helpers/api/horticulture/cropable';

type Props = {
  toggleModal: () => void;
  refetchBlocks?: () => void;
  blockDetail?: Block;
};

export default function useAssignCropToBlock({
  toggleModal,
  refetchBlocks,
  blockDetail,
}: Props) {
  const [serverValidationError, setServerValidationError] =
    useState<boolean>(false);

  const [submitted, setSubmitted] = useState(false);

  const assignCropToBlock = (formData: CropableFormValues) => {
    return cropable.assignCropToBlock(formData, Number(blockDetail?.id));
  };

  const onSuccess = (): void => {
    setSubmitted(false);
    toast.success('Crop Assigned Sucessfully.');
    if (refetchBlocks) {
      refetchBlocks();
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

  const assignCropToBlockMutation = useMutation({
    mutationKey: ['assign-crop-to-block'],
    mutationFn: assignCropToBlock,
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
    setError,
    formState: { errors },
  } = useForm<CropableFormValues>({
    resolver: schemaResolver,
    defaultValues: {
      date_from: new Date(),
    },
  });

  const onSubmit = async (formData: CropableFormValues) => {
    setSubmitted(true);
    formData.date_from = moment(formData.date_from).format('YYYY-MM-DD');
    assignCropToBlockMutation.mutate(formData);
  };

  return {
    register,
    control,
    errors,
    handleSubmit,
    onSubmit,
    serverValidationError,
    setServerValidationError,
    assignCropToBlockMutation,
    submitted,
  };
}
