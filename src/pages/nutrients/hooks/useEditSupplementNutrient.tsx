import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { ChangeEvent, useEffect, useState } from 'react';

import Nutrient from '../../../types/nutrients/nutrients';
import apiSupplementNutrients from '../../../helpers/api/supplementNutrients';
import useReadSupplementNutrient from './useReadSupplementNutrient';

export default function useEditSupplementNutrient({
  nutrientId,
  toggleModal,
  methaneRefetch,
  nonMethaneRefetch,
}: {
  nutrientId: number;
  toggleModal: Function;
  methaneRefetch: Function;
  nonMethaneRefetch: Function;
}) {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isMethaneReducerNutrient, setIsMethaneReducerNutrient] =
    useState(false);

  const {
    data: supplementNutrient,
    isFetching,
    isError,
  } = useReadSupplementNutrient(nutrientId);

  const updateSupplementNutrient = async (fromData: Nutrient, id: number) => {
    return apiSupplementNutrients.updateSupplementNutrient(fromData, id);
  };
  const onSuccess = (): void => {
    toast.success('Supplement Nutrient Updated Successfully.');
    toggleModal();
    methaneRefetch();
    nonMethaneRefetch();
  };

  const onError = () => {
    toast.error('Something went wrong. Please try again.');
  };

  const updateSupplementNutrientMutation = useMutation({
    mutationKey: ['update-property', nutrientId],
    mutationFn: (formData: Nutrient) =>
      updateSupplementNutrient(formData, nutrientId),
    onSuccess,
    onError,
  });

  const schemaResolver = yupResolver(
    yup.object().shape({
      name: yup
        .string()
        .typeError('Supplement Nutrient is invalid')
        .required('Supplement Nutrient name is required.'),
      is_methane_reducer: yup.boolean(),
      methane_reduction_factor: yup
        .mixed()
        .typeError('Methane Reduction Factor is invalid')
        .when('is_methane_reducer', {
          is: true,
          then: yup
            .number()
            .typeError('Methane Reduction Factor is invalid')
            .required('Methane Reduction Factor is required'),
          otherwise: yup.string().nullable(),
        })
        .test(
          'is-methane-reduction-false',
          'Methane Reduction Factor should not be provided if Methane Reducer is not selected',
          // eslint-disable-next-line func-names
          function (value: any) {
            const isMethaneReducer = this.resolve(
              yup.ref('is_methane_reducer')
            );
            if (
              !isMethaneReducer &&
              value !== null &&
              value !== undefined &&
              value !== ''
            ) {
              return this.createError({
                path: 'methane_reduction_factor',
                message:
                  'Methane Reduction Factor is not required when Is Methane Reducer is not selected.',
              });
            }
            return true;
          }
        ),
    })
  );

  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({ resolver: schemaResolver });

  useEffect(() => {
    reset({
      name: supplementNutrient?.name,
      is_methane_reducer: supplementNutrient?.is_methane_reducer,
      methane_reduction_factor: supplementNutrient?.methane_reduction_factor,
    });
    setIsMethaneReducerNutrient(!!supplementNutrient?.is_methane_reducer);
  }, [supplementNutrient]);

  const onSubmit = async (formData: any) => {
    setSubmitted(true);
    updateSupplementNutrientMutation.mutate(formData);
    setSubmitted(false);
  };

  const handleIsMethaneReducerChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsMethaneReducerNutrient(e.target.checked);
    if (!e.target.checked) {
      setValue('methane_reduction_factor', undefined);
    }
  };

  return {
    register,
    control,
    errors,
    reset,
    handleSubmit,
    onSubmit,
    updateSupplementNutrientMutation,
    supplementNutrient,
    isFetching,
    isError,
    submitted,
    isMethaneReducerNutrient,
    handleIsMethaneReducerChange,
  };
}
