import { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import HttpApi from '../../Http/http';
import { RoleFormProps } from '../types/Role';
import { ROLE_LIST, ROLE } from '../constants/constant';

export default function useRoleForm(defaultValues: RoleFormProps) {
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
        .required('Name is required.')
        .typeError('Name is required.'),
    })
  );

  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RoleFormProps>({
    resolver: schemaResolver,
    defaultValues,
  });
  const createRole = async (fromData: RoleFormProps) => {
    if (id) {
      return apiCore.update(`${ROLE}/${id}`, fromData);
    }
    return apiCore.create(ROLE, fromData);
  };

  const navigateToList = () => {
    navigate(location.state?.from || ROLE_LIST);
  };

  const onSuccess = (): void => {
    toast.success(
      id ? 'Role Updated Successfully.' : 'Role Created Successfully.'
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
    mutationKey: ['create-Role'],
    mutationFn: createRole,
    onSuccess,
    onError,
  });

  const onSubmit = async (formData: RoleFormProps) => {
    setSubmitted(true);
    formData.guard_name = 'api';
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
