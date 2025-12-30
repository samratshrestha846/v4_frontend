import { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { toast } from 'react-toastify';
// import moment from 'moment';
import { ResponseSetFormProps } from '../types/ResponseSet';
import { RESPONSE_SET_LIST, RESPONSE_SET } from '../constants/constant';
import HttpApi from '../../Http/http';

export default function useResponseSetForm(
  defaultValues: ResponseSetFormProps
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
        .typeError('Name field is required'),
      type: yup
        .string()
        .required('Type field is required.')
        .typeError('Type field is required'),
      items: yup
        .array()
        .of(yup.string().required('Each item must be a valid string'))
        .min(1, 'At least one item is required'),
    })
  );

  // const schemaResolver = yupResolver(
  //   yup.object().shape({
  //     name: yup.string().required('Name field is required.'),
  //     type: yup.string().required('Type field is required.'),
  //     items: yup
  //       .array()
  //       .of(yup.string().required('Each item must be a valid string'))
  //       .min(1, 'At least one item is required'),
  //   })
  // );

  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ResponseSetFormProps>({
    resolver: schemaResolver,
    defaultValues,
  });
  const createResponseSet = async (fromData: ResponseSetFormProps) => {
    if (id) {
      return apiCore.update(`${RESPONSE_SET}/${id}`, fromData);
    }
    return apiCore.create(RESPONSE_SET, fromData);
  };

  const navigateToList = () => {
    navigate(location.state?.from || RESPONSE_SET_LIST);
  };

  const onSuccess = (): void => {
    toast.success(
      !id
        ? 'ResponseSet Created Successfully.'
        : 'ResponseSet Updated Successfully.'
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
    mutationKey: ['create-ResponseSet'],
    mutationFn: createResponseSet,
    onSuccess,
    onError,
  });

  const onSubmit = async (formData: ResponseSetFormProps) => {
    setSubmitted(true);

    // if (formData.date) {
    // formData.date = moment(formData.date).format('YYYY-MM-DD');
    // }

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
