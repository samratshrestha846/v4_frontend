import { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { toast } from 'react-toastify';

import { InventoryLocationFormProps } from '../types/InventoryLocation';
import {
  INVENTORY_LOCATION_LIST,
  INVENTORY_LOCATION,
} from '../constants/constant';
import HttpApi from '../../Http/http';
import {
  STATUS_VALUE_NO,
  STATUS_VALUE_YES,
} from '../../../../constants/constants';

export default function useInventoryLocationForm(
  defaultValues: InventoryLocationFormProps
) {
  const [serverValidationError, setServerValidationError] = useState(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const apiCore = new HttpApi();
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  const schemaResolver = yupResolver(
    yup.object().shape({
      name: yup
        .string()
        .required('Name field is required.')
        .typeError('Name field is required.'),
      state: yup
        .string()
        .required('State field is required.')
        .typeError('State field is required.'),
    })
  );

  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<InventoryLocationFormProps>({
    resolver: schemaResolver,
    defaultValues,
  });
  const createInventoryLocation = async (
    fromData: InventoryLocationFormProps
  ) => {
    if (id) {
      return apiCore.update(`${INVENTORY_LOCATION}/${id}`, fromData);
    }
    return apiCore.create(INVENTORY_LOCATION, fromData);
  };

  const navigateToList = () => {
    navigate(location.state?.from || INVENTORY_LOCATION_LIST);
  };

  const onSuccess = (): void => {
    toast.success(
      id
        ? 'InventoryLocation Created Successfully.'
        : 'InventoryLocation Updated Successfully.'
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
    mutationKey: ['create-InventoryLocation'],
    mutationFn: createInventoryLocation,
    onSuccess,
    onError,
  });

  const onSubmit = async (formData: InventoryLocationFormProps) => {
    setSubmitted(true);
    formData.is_production_facility = formData.is_production_facility
      ? STATUS_VALUE_YES
      : STATUS_VALUE_NO;
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
