import { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import HttpApi from '../../Http/http';
import { SupplierFormProps } from '../types/Supplier';
import { SUPPLIER_LIST, SUPPLIER } from '../constants/constant';

export default function useSupplierForm(defaultValues: SupplierFormProps) {
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
        .typeError('Name field is required'),
      email: yup
        .string()
        .email('Please enter a valid email address.')
        .nullable(),
    })
  );

  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SupplierFormProps>({
    resolver: schemaResolver,
    defaultValues,
  });
  const createSupplier = async (fromData: SupplierFormProps) => {
    if (id) {
      return apiCore.update(`${SUPPLIER}/${id}`, fromData);
    }
    return apiCore.create(SUPPLIER, fromData);
  };

  const navigateToList = () => {
    navigate(location.state?.from || SUPPLIER_LIST);
  };

  const onSuccess = (): void => {
    toast.success(
      id ? 'Supplier Updated Successfully.' : 'Supplier Created Successfully.'
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
    mutationKey: ['create-Supplier'],
    mutationFn: createSupplier,
    onSuccess,
    onError,
  });

  const onSubmit = async (formData: SupplierFormProps) => {
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
