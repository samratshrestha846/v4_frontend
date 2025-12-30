import { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import HttpApi from '../../Http/http';
import { PolicyFormProps } from '../types/Policy';
import { POLICY_LIST, POLICY } from '../constants/constant';

export default function usePolicyForm(defaultValues: PolicyFormProps) {
  const [serverValidationError, setServerValidationError] = useState(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const apiCore = new HttpApi();
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const [fileUploaded, setFileUploaded] = useState(null);

  const schemaResolver = yupResolver(
    yup.object().shape({
      title: yup
        .string()
        .required('Title is required.')
        .typeError('Title is required.'),
    })
  );

  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<PolicyFormProps>({
    resolver: schemaResolver,
    defaultValues,
  });
  const createPolicy = async (fromData: PolicyFormProps) => {
    if (id) {
      return apiCore.createWithFile(`${POLICY}/${id}`, fromData);
    }
    return apiCore.createWithFile(POLICY, fromData);
  };

  const navigateToList = () => {
    navigate(location.state?.from || POLICY_LIST);
  };

  const onSuccess = (): void => {
    toast.success(
      id ? 'Policy Updated Successfully.' : 'Policy Created Successfully.'
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
    mutationKey: ['create-Policy'],
    mutationFn: createPolicy,
    onSuccess,
    onError,
  });

  const onSubmit = async (formData: PolicyFormProps) => {
    setSubmitted(true);

    formData.file = formData.file ? formData.file[0] : null;

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
    fileUploaded,
    setFileUploaded,
  };
}
