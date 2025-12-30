import { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import moment from 'moment';
import HttpApi from '../../Http/http';
import { MessageFormProps } from '../types/Message';
import { MESSAGE_LIST, MESSAGE } from '../constants/constant';

export default function useMessageForm(defaultValues: MessageFormProps) {
  const [serverValidationError, setServerValidationError] = useState(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const apiCore = new HttpApi();
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  const schemaResolver = yupResolver(
    yup.object().shape({
      type: yup
        .string()
        .required('Type field is required.')
        .typeError('Type field is required.'),
      message: yup
        .string()
        .required('Message field is required.')
        .typeError('Message field is required.'),
      publish_date: yup
        .string()
        .required('Published date is required.')
        .typeError('Published date is required.'),
      status: yup
        .string()
        .required('Status field is required.')
        .typeError('Status field is required.'),
      expires_on: yup
        .string()
        .required('Expires on is required.')
        .typeError('Expires on is required.')
        .test(
          'is-after-publish',
          'Expires date must be after Published date.',
          (value, context) => {
            const publishDate = context.parent.publish_date;
            return moment(value).isAfter(moment(publishDate));
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
  } = useForm<MessageFormProps>({
    resolver: schemaResolver,
    defaultValues,
  });
  const createMessage = async (fromData: MessageFormProps) => {
    if (id) {
      return apiCore.update(`${MESSAGE}/${id}`, fromData);
    }
    return apiCore.create(MESSAGE, fromData);
  };

  const navigateToList = () => {
    navigate(location.state?.from || MESSAGE_LIST);
  };

  const onSuccess = (): void => {
    toast.success(
      id ? 'Message Updated Successfully.' : 'Message Created Successfully.'
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
    mutationKey: ['create-Message'],
    mutationFn: createMessage,
    onSuccess,
    onError,
  });

  const onSubmit = async (formData: MessageFormProps) => {
    setSubmitted(true);

    if (formData.publish_date) {
      formData.publish_date = moment(formData.publish_date).format(
        'YYYY-MM-DD'
      );
    }

    if (formData.expires_on) {
      formData.expires_on = moment(formData.expires_on).format('YYYY-MM-DD');
    }

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
