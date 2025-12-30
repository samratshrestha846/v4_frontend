import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useState } from 'react';

import Nutrient from '../../../types/nutrients/nutrients';
import apiSupplementNutrients from '../../../helpers/api/supplementNutrients';

export default function useCreateSupplementNutrient({
  toggleModal,
  methaneRefetch,
  nonMethaneRefetch,
}: {
  toggleModal: Function;
  methaneRefetch: Function;
  nonMethaneRefetch: Function;
}) {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isMethaneReducerNutrient, setIsMethaneReducerNutrient] =
    useState(false);

  const createSupplementNutrient = async (fromData: Nutrient) => {
    return apiSupplementNutrients.createSupplementNutrient(fromData);
  };

  const onSuccess = (): void => {
    toast.success('Supplement Nutrient Created Successfully.');
    toggleModal();
    methaneRefetch();
    nonMethaneRefetch();
  };

  const onError = () => {
    toast.error('Something went wrong. Please try again.');
  };

  const createSupplementNutrientMutation = useMutation({
    mutationKey: ['create-supplement-nutrient'],
    mutationFn: createSupplementNutrient,
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
            if (!isMethaneReducer && value !== undefined && value !== '') {
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
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: schemaResolver,
  });

  const onSubmit = async (formData: any) => {
    setSubmitted(true);
    createSupplementNutrientMutation.mutate(formData);
    setSubmitted(false);
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    control,
    errors,
    createSupplementNutrientMutation,
    isMethaneReducerNutrient,
    setIsMethaneReducerNutrient,
    submitted,
  };
}
