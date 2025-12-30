import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useFieldArray, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import udose from '../../../../../../helpers/api/udose';
import { LabelNumericValue } from '../../../../../../types/common';
import UdoseRecordSettings, {
  UdoseSiteSupplement,
  UdoseSiteSupplementFormFields,
} from '../../../../../../types/udose/udoseSettings';

type Props = {
  nutrientSelectionOption: LabelNumericValue[];
  settings?: UdoseRecordSettings;
  toggleModal: () => void;
  latestSupplement?: UdoseSiteSupplement | null;
  refetchUdose: () => void;
};

export default function useUpdateUdoseSiteSupplement({
  nutrientSelectionOption,
  settings,
  toggleModal,
  latestSupplement,
  refetchUdose,
}: Props) {
  const [serverValidationError, setServerValidationError] =
    useState<boolean>(false);
  const [supplementOptions, setSupplementOptions] = useState<
    LabelNumericValue[]
  >([]);

  const [agreed, setAgreed] = useState(false);

  const toggleAgree = () => {
    setAgreed(!agreed);
  };

  useEffect(() => {
    setSupplementOptions(nutrientSelectionOption);
  }, [nutrientSelectionOption]);

  const updateUdoseSiteSupplement = (
    fromData: UdoseSiteSupplementFormFields
  ) => {
    return udose.updateUdoseSiteSupplement(fromData, settings!.site_id);
  };

  const onSuccess = (): void => {
    toggleModal();
    toast.success(
      `The request to update setting has been sent successfully. Please allow 3-5 mins to change the settings in device`
    );
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
  };

  const updateUdoseSiteSupplementMutation = useMutation({
    mutationKey: ['update-udose-site-supplement'],
    mutationFn: updateUdoseSiteSupplement,
    onSuccess,
    onError,
  });

  const schemaResolver = yupResolver(
    yup.object().shape({
      supplement_id: yup
        .number()
        .typeError('Supplement is invalid.')
        .required('Supplement is required.'),
      bulk_bag_weight_in_kg: yup
        .number()
        .typeError('Quantity is invalid.')
        .required('Quantity is required.'),
      nutrients: yup
        .array()
        .of(
          yup.object().shape({
            supplement_id: yup
              .number()
              .positive('Must be a positive number.')
              .typeError('Supplement is invalid.')
              .required('Supplement is required.'),
            volume_in_liter: yup
              .number()
              .positive('Must be a positive number.')
              .typeError('Quantity is invalid.')
              .required('Quantity is required.'),
          })
        )
        .test(
          'unique-trace-supplements',
          'Trace supplements must be distinct.',
          (value) => {
            if (!value || !Array.isArray(value)) return true;
            const supplementIds = value.map((item) => item.supplement_id);
            return new Set(supplementIds).size === supplementIds.length;
          }
        ),
      final_solution_volume: yup
        .number()
        .positive('Must be a positive number.')
        .typeError('Final solution is invalid.')
        .required('Final solution is required.'),
    })
  );

  const {
    register,
    handleSubmit,
    control,
    reset,
    setError,
    formState: { errors },
  } = useForm<UdoseSiteSupplementFormFields>({
    resolver: schemaResolver,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'nutrients',
  });

  useEffect(() => {
    refetchUdose();
    if (latestSupplement) {
      reset({
        supplement_id: latestSupplement.supplement_id,
        bulk_bag_weight_in_kg: latestSupplement.bulk_bag_weight_in_kg,
        final_solution_volume: latestSupplement.final_solution_volume,
        nutrients: latestSupplement.nutrients?.map((item) => ({
          supplement_id: item.supplement_id,
          volume_in_liter: item.volume_in_liter,
        })),
      });
    }
  }, [latestSupplement]);

  const onSubmit = async (formData: UdoseSiteSupplementFormFields) => {
    updateUdoseSiteSupplementMutation.mutate(formData);
  };

  const addRow = () => {
    append({ supplement_id: undefined, volume_in_liter: undefined });
  };

  const removeRow = (index: number) => {
    remove(index);
  };

  return {
    register,
    control,
    errors,
    handleSubmit,
    onSubmit,
    serverValidationError,
    setServerValidationError,
    updateUdoseSiteSupplementMutation,
    supplementOptions,
    addRow,
    removeRow,
    fields,
    agreed,
    toggleAgree,
  };
}
