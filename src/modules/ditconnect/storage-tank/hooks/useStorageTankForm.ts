import { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { StorageTankFormProps } from '../types/StorageTank';
import { STORAGE_TANK_LIST, STORAGE_TANK } from '../constants/constant';
import HttpApi from '../../Http/http';

export default function useStorageTankForm(
  defaultValues: StorageTankFormProps
) {
  const [serverValidationError, setServerValidationError] = useState(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const apiCore = new HttpApi();
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const schemaResolver = yupResolver(
    yup.object().shape({
      name: yup
        .string()
        .required('Name is required.')
        .typeError('Name is required.'),
      location_id: yup
        .number()
        .required('Location is required.')
        .typeError('Location is required.'),
      capacity: yup
        .number()
        .positive('Capacity must be a positive numeric value.')
        .required('Capacity is required.')
        .typeError('Capacity must be a positive numeric value.'),
      current_qty: yup
        .number()
        .positive('Quantity must be a positive numeric value.')
        .required('Quantity is required.')
        .typeError('Quantity must be a positive numeric value.')
        .test(
          'is-less-than-capacity',
          'Quantity must be less than capacity.',
          (value, context) => {
            if (value === undefined || value === null) {
              return false;
            }
            return value < context.parent.capacity;
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
  } = useForm<StorageTankFormProps>({
    resolver: schemaResolver,
    defaultValues,
  });
  const createStorageTank = async (fromData: StorageTankFormProps) => {
    if (id) {
      return apiCore.update(`${STORAGE_TANK}/${id}`, fromData);
    }
    return apiCore.create(STORAGE_TANK, fromData);
  };

  const navigateToList = () => {
    navigate(location.state?.from || STORAGE_TANK_LIST);
  };

  const onSuccess = (): void => {
    toast.success(
      id
        ? 'Storage Tank Created Successfully.'
        : 'Storage Tank Updated Successfully.'
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
    mutationKey: ['create-StorageTank'],
    mutationFn: createStorageTank,
    onSuccess,
    onError,
  });

  const onSubmit = async (formData: StorageTankFormProps) => {
    setSubmitted(true);

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
