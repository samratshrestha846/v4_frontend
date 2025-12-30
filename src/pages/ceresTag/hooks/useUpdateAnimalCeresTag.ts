/* eslint-disable func-names */
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import moment from 'moment';
import { CeresTagUpdateFormFields } from '../../../types/ceresTag/ceresTag';
import ceresTagAPI from '../../../helpers/api/ceresTagAPI';

export default function useUpdateAnimalCeresTag(
  ceresTagId: string,
  refetch: any
) {
  const [showModal, setShowModal] = useState<boolean>(false);

  const [serverValidationError, setServerValidationError] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const updateAnimalCeresTag = (fromData: CeresTagUpdateFormFields) => {
    return ceresTagAPI.updateAnimalCeresTag(fromData, ceresTagId);
  };

  const onSuccess = (): void => {
    setSubmitted(false);
    toast.success('Ceres Tag Moved Successfully.');
    refetch();
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

  const updateAnimalCeresTagMutation = useMutation({
    mutationKey: ['request-historical-data'],
    mutationFn: updateAnimalCeresTag,
    onSuccess,
    onError,
  });

  const schemaResolver = yupResolver(
    yup.object().shape({
      last_animal_updated_at: yup
        .mixed()
        .typeError('Last animal updated at field is invalid.')
        .required('Last animal updated at field is required.'),
      last_animal_taken_off_at: yup
        .mixed()
        .typeError('Last animal taken off at field is invalid.')
        .required('Last animal taken off at field is required.')
        .test(
          'not-before-than-last-animal-updated-at',
          'Last animal taken off at should be before than last animal updated at.',
          function (value: any) {
            if (value === null) return true;
            const dayDifference = moment(value).diff(
              moment(this.parent.last_animal_updated_at),
              'seconds'
            );
            return dayDifference <= 0;
          }
        ),
    })
  );

  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<CeresTagUpdateFormFields>({ resolver: schemaResolver });

  const onSubmit: SubmitHandler<CeresTagUpdateFormFields> = (
    formData: CeresTagUpdateFormFields
  ) => {
    if (formData.last_animal_updated_at) {
      formData.last_animal_updated_at = moment(formData.last_animal_updated_at)
        .utc()
        .format('YYYY-MM-DD HH:mm:ss')
        .toString();
    }

    if (formData.last_animal_taken_off_at) {
      formData.last_animal_taken_off_at = moment(
        formData.last_animal_taken_off_at
      )
        .utc()
        .format('YYYY-MM-DD HH:mm:ss')
        .toString();
    }
    updateAnimalCeresTagMutation.mutate(formData);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return {
    register,
    control,
    errors,
    handleSubmit,
    onSubmit,
    showModal,
    toggleModal,
    serverValidationError,
    setServerValidationError,
    submitted,
  };
}
