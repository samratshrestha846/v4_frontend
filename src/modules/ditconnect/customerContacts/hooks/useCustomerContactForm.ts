import { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { CustomerContactFormProps } from '../types/customerContact';
import {
  CUSTOMER_CONTACT_LIST,
  CUSTOMER_CONTACTS,
} from '../constants/constant';
import HttpApi from '../../Http/http';

export default function useCustomerContactForm(
  defaultValues: CustomerContactFormProps
) {
  const [serverValidationError, setServerValidationError] = useState(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const apiCore = new HttpApi();
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  const schemaResolver = yupResolver(
    yup.object().shape({
      customer: yup
        .string()
        .typeError('Customer must be string.')
        .required('Customer Name is required.'),
      phone_number: yup
        .string()
        .typeError('Phone number must be string')
        .required('Phone Number is required.'),
      address: yup.string().nullable().typeError('Address must be a string.'),
      details: yup.string().typeError('Details must be a string.'),
    })
  );

  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<CustomerContactFormProps>({
    resolver: schemaResolver,
    defaultValues,
  });
  const createCustomerContact = async (formData: CustomerContactFormProps) => {
    if (id) {
      return apiCore.create(`${CUSTOMER_CONTACTS}/${id}`, formData);
    }
    return apiCore.create(CUSTOMER_CONTACTS, formData);
  };

  const navigateToList = () => {
    navigate(location.state?.from || CUSTOMER_CONTACT_LIST);
  };

  const onSuccess = (): void => {
    toast.success(
      id
        ? 'Customer Contact Created Successfully.'
        : 'Customer Contact Updated Successfully.'
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
    mutationKey: ['create-customer-contact'],
    mutationFn: createCustomerContact,
    onSuccess,
    onError,
  });

  const onSubmit = async (formData: CustomerContactFormProps) => {
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
