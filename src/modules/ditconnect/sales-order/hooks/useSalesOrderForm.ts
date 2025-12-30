import { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { SalesOrderFormProps } from '../types/SalesOrder';
import { SALES_ORDER_LIST, SALES_ORDER } from '../constants/constant';
import HttpApi from '../../Http/http';

export default function useSalesOrderForm(defaultValues: SalesOrderFormProps) {
  const [serverValidationError, setServerValidationError] = useState(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const apiCore = new HttpApi();
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  const schemaResolver = yupResolver(
    yup.object().shape({
      total: yup
        .number()
        .typeError('Total must be a number.')
        .required('Total is required')
        .min(0, 'Total must be at least 0'),
      customer: yup.object().shape({
        property_id: yup
          .number()
          .required('Property ID is required')
          .typeError('Property ID must be a number'),
      }),
      products: yup.array().of(
        yup.object().shape({
          supplement_id: yup
            .number()
            .required('Supplement ID is required')
            .typeError('Supplement ID must be a number'),
          qty: yup
            .number()
            .required('Quantity is required')
            .min(0, 'Quantity must be at least 0'),
          rate: yup
            .number()
            .required('Rate is required')
            .min(0, 'Rate must be at least 0'),
          total: yup
            .number()
            .required('Total is required')
            .min(0, 'Total must be at least 0'),
        })
      ),
      additional_items: yup.array().of(
        yup.object().shape({
          item_name: yup.string().required('Item name is required'),
          qty: yup
            .number()
            .required('Quantity is required')
            .min(0, 'Quantity must be at least 0'),
          rate: yup
            .number()
            .required('Rate is required')
            .min(0, 'Rate must be at least 0'),
          total: yup
            .number()
            .required('Total is required')
            .min(0, 'Total must be at least 0'),
        })
      ),
      udose_items: yup.array().of(
        yup.object().shape({
          inventory_item_id: yup
            .number()
            .required('Inventory item ID is required')
            .typeError('Inventory item ID must be a number'),
          qty: yup
            .number()
            .required('Quantity is required')
            .min(0, 'Quantity must be at least 0'),
          rate: yup
            .number()
            .required('Rate is required')
            .min(0, 'Rate must be at least 0'),
          total: yup
            .number()
            .required('Total is required')
            .min(0, 'Total must be at least 0'),
        })
      ),
    })
  );

  const {
    register,
    control,
    handleSubmit,
    setError,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SalesOrderFormProps>({
    resolver: schemaResolver,
    defaultValues,
  });

  const createSalesOrder = async (fromData: SalesOrderFormProps) => {
    if (id) {
      return apiCore.update(`${SALES_ORDER}/${id}`, fromData);
    }
    return apiCore.create(SALES_ORDER, fromData);
  };

  const navigateToList = () => {
    navigate(location.state?.from || SALES_ORDER_LIST);
  };

  const onSuccess = (): void => {
    toast.success(
      id
        ? 'Sales Order Updated Successfully.'
        : 'Sales Order Created Successfully.'
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
    mutationKey: ['create-SalesOrder'],
    mutationFn: createSalesOrder,
    onSuccess,
    onError,
  });

  const onSubmit = async (formData: SalesOrderFormProps) => {
    setSubmitted(true);
    createMutation.mutate(formData);
  };

  return {
    setFormValue: setValue,
    register,
    control,
    errors,
    watch,
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
