import { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useFieldArray, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import moment from 'moment';
import { StocktakeFormProps, StocktakeItemFormProps } from '../types/Stocktake';
import { STOCKTAKE_LIST, STOCKTAKE } from '../constants/constant';
import HttpApi from '../../Http/http';

export default function useStocktakeForm(defaultValues: StocktakeFormProps) {
  const [serverValidationError, setServerValidationError] = useState(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const apiCore = new HttpApi();
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  const schemaResolver = yupResolver(
    yup.object().shape({
      location_id: yup
        .number()
        .typeError('Location is required.')
        .required('Location is required.'),
      date: yup
        .string()
        .typeError('Date is required.')
        .required('Date is required.'),
      available_stocktake_items: yup.array().of(
        yup.object().shape({
          available_qty: yup
            .number()
            .integer('Must be a non-decimal number.')
            .positive('Must be a positive number.')
            .required('New quantity is required.')
            .typeError('New quantity is required.')
            .transform((value, originalValue) =>
              originalValue === '' ? null : value
            ),
          new_qty: yup
            .number()
            .integer('Must be a non-decimal number.')
            .positive('Must be a positive number.')
            .required('New quantity is required.')
            .typeError('New quantity is required.')
            .transform((value, originalValue) =>
              originalValue === '' ? null : value
            ),
        })
      ),
      not_found_stocktake_items: yup.array().of(
        yup.object().shape({
          supplement_id: yup
            .number()
            .required('Product is required.')
            .typeError('Product is required.'),
          available_qty: yup
            .number()
            .integer('Must be a non-decimal number.')
            .nullable()
            .transform((value, originalValue) =>
              originalValue === '' ? null : value
            ),
          new_qty: yup
            .number()
            .integer('Must be a non-decimal number.')
            .positive('Must be a positive number.')
            .required('Quantity is required.')
            .typeError('Quantity is required.')
            .transform((value, originalValue) =>
              originalValue === '' ? null : value
            ),
          batch_no: yup
            .string()
            .required('Batch no. is required.')
            .typeError('Batch no. is required.'),
        })
      ),
    })
  );

  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors },
    setValue,
    watch,
  } = useForm<StocktakeFormProps>({
    resolver: schemaResolver,
    defaultValues,
  });

  const {
    fields: availableItemFields,
    append: appendAvailableItem,
    remove: removeAvailableItem,
  } = useFieldArray({
    control,
    name: 'available_stocktake_items',
  });

  const {
    fields: notFoundItemFields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: 'not_found_stocktake_items',
  });

  const watchedLocationId = watch('location_id');

  const createStocktake = async (fromData: StocktakeFormProps) => {
    if (id) {
      return apiCore.update(`${STOCKTAKE}/${id}`, fromData);
    }
    return apiCore.create(STOCKTAKE, fromData);
  };

  const navigateToList = () => {
    navigate(location.state?.from || STOCKTAKE_LIST);
  };

  const onSuccess = (): void => {
    toast.success(
      !id
        ? 'Stocktake Created Successfully.'
        : 'Stocktake Updated Successfully.'
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
    mutationKey: ['create-Stocktake'],
    mutationFn: createStocktake,
    onSuccess,
    onError,
  });

  const onSubmit = async (formData: StocktakeFormProps) => {
    setSubmitted(true);

    if (formData.date) {
      formData.date = moment(formData.date).format('YYYY-MM-DD');
    }

    formData.available_stocktake_items =
      formData.available_stocktake_items?.map((item) => {
        const itemValues: StocktakeItemFormProps = {
          supplement_id: item.supplement_id,
          batch_no: item.batch_no,
          available_qty: item.available_qty,
          new_qty: item.new_qty,
          notes: item.notes,
        };

        if (defaultValues?.id) {
          itemValues.id = item.id;
        }

        return itemValues;
      });

    formData.not_found_stocktake_items =
      formData.not_found_stocktake_items?.map((item) => {
        const itemValues: StocktakeItemFormProps = {
          supplement_id: item.supplement_id,
          batch_no: item.batch_no,
          available_qty: item.available_qty,
          new_qty: item.new_qty,
          notes: item.notes,
        };

        if (defaultValues?.id) {
          itemValues.id = item.id;
        }

        return itemValues;
      });
    createMutation.mutate(formData);
  };

  // Add not found item row

  const addItem = () => {
    append({
      id: null,
      supplement_id: null,
      supplement_name: null,
      batch_no: null,
      available_qty: 0,
      new_qty: null,
      notes: null,
    });

    if (notFoundItemFields?.length > 1) {
      toast.success('New Row Added Successfully.');
    }
  };

  // Remove not found item row
  const removeItem = (index: number) => {
    remove(index);
    toast.success('Row Removed Successfully.');
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
    setValue,
    addItem,
    removeItem,
    notFoundItemFields,
    watchedLocationId,
    availableItemFields,
    appendAvailableItem,
    removeAvailableItem,
  };
}
