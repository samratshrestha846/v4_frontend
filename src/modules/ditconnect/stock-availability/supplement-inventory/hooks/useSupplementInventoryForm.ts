import { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import moment from 'moment';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { SupplementInventoryAdjustmentFormProps } from '../types/SupplementInventory';
import {
  SUPPLEMENT_INVENTORY_LIST,
  SUPPLEMENT_INVENTORY,
  SUPPLEMENT_INENTORY_ADJUSTMENT,
} from '../constants/constant';
import HttpApi from '../../../Http/http';

export default function useSupplementInventoryForm(
  defaultValues: SupplementInventoryAdjustmentFormProps
) {
  const [serverValidationError, setServerValidationError] = useState(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const apiCore = new HttpApi();
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  const schemaResolver = yupResolver(
    yup.object().shape({
      adj_qty: yup.number().typeError('Qty must be an integer.'),
      dates: yup
        .date()
        .typeError('Date must be a valid date.')
        .nullable()
        .test(
          'before-or-equal',
          'Date must be before or equal to today.',
          (value) => {
            if (value === null || value === undefined) return true;
            return moment(value).isSameOrBefore(moment(), 'day');
          }
        ),
      notes: yup
        .string()
        .nullable()
        .typeError('Customer notes must be a string.'),
    })
  );

  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SupplementInventoryAdjustmentFormProps>({
    resolver: schemaResolver,
    defaultValues,
  });
  const createSupplementInventory = async (
    fromData: SupplementInventoryAdjustmentFormProps
  ) => {
    if (id) {
      return apiCore.update(
        `${SUPPLEMENT_INENTORY_ADJUSTMENT}/${id}`,
        fromData
      );
    }
    return apiCore.create(SUPPLEMENT_INVENTORY, fromData);
  };

  const navigateToList = () => {
    navigate(location.state?.from || SUPPLEMENT_INVENTORY_LIST);
  };

  const onSuccess = (): void => {
    toast.success(
      id
        ? 'SupplementInventory Updated Successfully.'
        : 'SupplementInventory Created Successfully.'
    );
    navigateToList();
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

  const createMutation = useMutation({
    mutationKey: ['create-SupplementInventory'],
    mutationFn: createSupplementInventory,
    onSuccess,
    onError,
  });

  const onSubmit = async (formData: SupplementInventoryAdjustmentFormProps) => {
    setSubmitted(true);

    if (formData.dates) {
      formData.dates = moment(formData.dates).format('YYYY-MM-DD');
    }
    createMutation.mutate(formData);
  };

  return {
    register,
    control,
    errors,
    handleSubmit,
    serverValidationError,
    setServerValidationError,
    createMutation,
    submitted,
    setSubmitted,
    navigateToList,
    onSubmit,
  };
}
