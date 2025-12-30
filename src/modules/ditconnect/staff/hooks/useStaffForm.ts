import { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import HttpApi from '../../Http/http';
import { StaffFormProps } from '../types/Staff';
import { STAFF_LIST, STAFF } from '../constants/constant';

export default function useStaffForm(defaultValues: StaffFormProps) {
  const [serverValidationError, setServerValidationError] = useState(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const apiCore = new HttpApi();
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  const schemaResolver = yupResolver(
    yup.object().shape({
      mobile_number: yup
        .string()
        .required('Mobile number field is required.')
        .typeError('Mobile number is required'),
      department: yup
        .string()
        .required('Department field is required.')
        .typeError('Department field is required'),
      position: yup
        .string()
        .required('Position field is required.')
        .typeError('Position field is required'),
      role: yup
        .string()
        .required('Role field is required.')
        .typeError('Role field is required'),
    })
  );

  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<StaffFormProps>({
    resolver: schemaResolver,
    defaultValues,
  });
  const createStaff = async (fromData: StaffFormProps) => {
    if (id) {
      return apiCore.update(`${STAFF}/${id}`, fromData);
    }
    return apiCore.create(STAFF, fromData);
  };

  const navigateToList = () => {
    navigate(location.state?.from || STAFF_LIST);
  };

  const onSuccess = (): void => {
    toast.success(
      !id ? 'Staff Created Successfully.' : 'Staff Updated Successfully.'
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
    mutationKey: ['update-Staff'],
    mutationFn: createStaff,
    onSuccess,
    onError,
  });

  const onSubmit = async (formData: StaffFormProps) => {
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
