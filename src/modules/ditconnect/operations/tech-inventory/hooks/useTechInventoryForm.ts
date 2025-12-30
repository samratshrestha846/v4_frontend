import { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useFieldArray, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import {
  inventoryItemTypeOptions,
  TechInventoryFormProps,
} from '../types/TechInventory';
import { TECH_INVENTORY, TECH_INVENTORY_LIST } from '../constants/constant';
import HttpApi from '../../../Http/http';
import useReadBySku from './useReadBySku';

export default function useTechInventoryForm(
  defaultValues: TechInventoryFormProps
) {
  const [serverValidationError, setServerValidationError] = useState(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const apiCore = new HttpApi();
  const navigate = useNavigate();
  const { id } = useParams();
  const [isEdit] = useState<boolean>(!!id);
  const location = useLocation();

  const schemaResolver = yupResolver(
    yup.object().shape({
      name: yup
        .string()
        .required('Name is required')
        .max(100, 'Name must not exceed 100 characters'),
      sku: yup
        .string()
        .required('SKU is required')
        .max(100, 'SKU must not exceed 100 characters'),
      type: yup
        .string()
        .required('Type is required')
        .oneOf(
          inventoryItemTypeOptions.map((s) => s.value),
          'Type must be one of the allowed values'
        ),
      is_udose_item: yup.boolean().required('UDose item status is required'),
      locations: yup.array().of(
        yup.object().shape({
          location_id: yup
            .number()
            .required('Location ID is required')
            .integer('Location ID must be an integer'),
          qty: yup
            .number()
            .required('Quantity is required')
            .typeError('Quantity must be a number'),
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
    formState: { errors },
    reset,
  } = useForm<TechInventoryFormProps>({
    resolver: schemaResolver,
    defaultValues,
  });
  const {
    fields: locationField,
    append: addLocations,
    remove: removeLocations,
  } = useFieldArray({
    control,
    name: 'locations',
  });
  const skuValue = watch('sku');
  const { selectedRecord, isLoading } = useReadBySku(
    skuValue,
    reset,
    apiCore,
    isEdit
  );

  const createTechInventory = async (fromData: TechInventoryFormProps) => {
    if (id) {
      return apiCore.create(`${TECH_INVENTORY}/${id}`, fromData);
    }
    return apiCore.create(TECH_INVENTORY, fromData);
  };

  const navigateToList = () => {
    navigate(location.state?.from || TECH_INVENTORY_LIST);
  };

  const onSuccess = (): void => {
    toast.success(
      id
        ? 'Tech Inventory Created Successfully.'
        : 'Tech Inventory Updated Successfully.'
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
    mutationKey: ['create-TechInventory'],
    mutationFn: createTechInventory,
    onSuccess,
    onError,
  });

  const onSubmit = async (formData: TechInventoryFormProps) => {
    setSubmitted(true);
    const locationIds = formData.locations.map((loc) => loc.location_id);
    const uniqueLocationIds = new Set(locationIds);
    if (locationIds.length !== uniqueLocationIds.size) {
      setSubmitted(false);

      toast.error(
        'The selected location has already been chosen or exists in the inventory. Please select a different location.'
      );
    } else {
      createMutation.mutate(formData);
    }
  };

  return {
    isEdit,
    isLoading,
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
    selectedRecord,
    locationField,
    addLocations,
    removeLocations,
    watch,
  };
}
