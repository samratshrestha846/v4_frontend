import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

import { NEWS_LIST } from '../../../constants/path';
import { NewsFormFields } from '../../../types/news';
import news from '../../../helpers/api/news';

export default function useCreateNews() {
  const navigate = useNavigate();
  const [serverValidationError, setServerValidationError] =
    useState<boolean>(false);
  const [fileUploaded, setFileUploaded] = useState<string>();
  const [submitted, setSubmitted] = useState(false);

  const createNews = (formData: NewsFormFields) => {
    return news.createNews(formData);
  };

  const navigateToNewsList = () => {
    navigate(NEWS_LIST);
  };

  const onSuccess = (): void => {
    setSubmitted(false);
    toast.success('News Created Sucessfully.');
    navigateToNewsList();
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

  const createNewsMutation = useMutation({
    mutationKey: ['create-news'],
    mutationFn: createNews,
    onSuccess,
    onError,
  });

  const schemaResolver = yupResolver(
    yup.object().shape({
      title: yup
        .string()
        .min(3, 'Title must be at least 3 characters long.')
        .typeError('Title is invalid.')
        .required('Title is required.'),
      content: yup
        .string()
        .min(3, 'Content must be at least 3 characters long.')
        .max(500, 'Content must not be greater than 500 characters.')
        .typeError('Content is invalid.')
        .required('Content is required.'),
      published_on: yup.string().required('Pubished date is required.'),
      is_published: yup.number().required('Is published is required.'),
      url_link: yup.string().url('Link must be a valid URL').nullable(),
    })
  );

  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<NewsFormFields>({
    resolver: schemaResolver,
  });

  const onSubmit = async (formData: NewsFormFields) => {
    setSubmitted(true);

    if (formData.published_on)
      formData.published_on = moment(formData.published_on).format(
        'YYYY-MM-DD'
      );
    if (fileUploaded) {
      formData.image = fileUploaded;
    }
    createNewsMutation.mutate(formData);
  };

  return {
    register,
    control,
    errors,
    handleSubmit,
    onSubmit,
    serverValidationError,
    setServerValidationError,
    createNewsMutation,
    navigateToNewsList,
    submitted,
    fileUploaded,
    setFileUploaded,
  };
}
