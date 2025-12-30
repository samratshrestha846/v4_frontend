import { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { TemplateFormProps } from '../types/Template';
import { TEMPLATE_LIST, TEMPLATE } from '../constants/constant';
import HttpApi from '../../../Http/http';

export default function useTemplateForm(defaultValues: TemplateFormProps) {
  const [serverValidationError, setServerValidationError] = useState(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const apiCore = new HttpApi();
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  const schemaResolver = yupResolver(
    yup.object().shape({
      title: yup
        .string()
        .nullable()
        .required('Title is required')
        .max(255, 'Title cannot exceed 255 characters'),

      inputFields: yup
        .array()
        .of(
          yup.object().shape({
            form_label: yup
              .string()
              .nullable()
              .required('Form label is required')
              .typeError('Form label must be a valid string'),

            input_type_id: yup
              .mixed()
              .required('Input type is required')
              .typeError('Input type must be valid'),
          })
        )
        .required('Input fields are required'),
    })
  );

  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<TemplateFormProps>({
    resolver: schemaResolver,
    defaultValues,
  });
  const createTemplate = async (fromData: TemplateFormProps) => {
    if (id) {
      return apiCore.update(`${TEMPLATE}/${id}`, fromData);
    }
    return apiCore.create(TEMPLATE, fromData);
  };

  const navigateToList = () => {
    navigate(location.state?.from || TEMPLATE_LIST);
  };

  const onSuccess = (): void => {
    toast.success(
      !id ? 'Template Created Successfully.' : 'Template Updated Successfully.'
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
    mutationKey: ['create-Template'],
    mutationFn: createTemplate,
    onSuccess,
    onError,
  });

  const onSubmit = async (formData: TemplateFormProps) => {
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
