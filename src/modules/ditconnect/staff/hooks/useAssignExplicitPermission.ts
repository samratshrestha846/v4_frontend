import { useMutation, useQueryClient } from '@tanstack/react-query';
import { prepareDynamicUrl } from '@uhub/helpers';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import HttpApi from '../../Http/http';
import { ASSIGN_EXPLICIT_PERMISSION } from '../constants/constant';
import { StaffResponse } from '../types/Staff';

export default function useAssignExplicitPermission(userId?: number) {
  const [showModal, setShowModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverValidationError, setServerValidationError] = useState(false);

  const { id } = useParams();
  const apiCore = new HttpApi();
  const queryClient = useQueryClient();

  const assignPermission = async (
    permissionData: any
  ): Promise<StaffResponse> => {
    const response = await apiCore.update(
      prepareDynamicUrl(ASSIGN_EXPLICIT_PERMISSION, userId),
      permissionData
    );
    return response.data.data;
  };

  const onSuccess = (): void => {
    toast.success('Permissions Assigned Successfully.');
    queryClient.invalidateQueries(['Staff', id]);
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

  const assignExplicitPermissionsMutation = useMutation({
    mutationKey: ['assign-explicit-permissions'],
    mutationFn: assignPermission,
    onSuccess,
    onError,
  });

  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<any>();

  const onSubmit = async (formData: any) => {
    setSubmitted(true);
    assignExplicitPermissionsMutation.mutate(formData);
    setShowModal(false);
    setSubmitted(false);
  };

  return {
    onSubmit,
    onSuccess,
    onError,
    register,
    control,
    handleSubmit,
    setError,
    errors,
    showModal,
    setShowModal,
    submitted,
    setSubmitted,
    serverValidationError,
    setServerValidationError,
  };
}
