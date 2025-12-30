import { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { toast } from 'react-toastify';
// import moment from 'moment';
import { APICore } from '@uhub/helpers/api/apiCore';
import { SummaryFormProps } from '../types/Summary';
import { SUMMARY_LIST, SUMMARY } from '../constants/constant';

export default function useSummaryForm(defaultValues: SummaryFormProps) {
  const [serverValidationError, setServerValidationError] = useState(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const apiCore = new APICore();
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  const schemaResolver = yupResolver(
    yup.object().shape({
      // write your form fields here.
    })
  );

  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SummaryFormProps>({
    resolver: schemaResolver,
    defaultValues,
  });
  const createSummary = async (fromData: SummaryFormProps) => {
    if (id) {
      return apiCore.create(`${SUMMARY}/${id}`, fromData);
    }
    return apiCore.create(SUMMARY, fromData);
  };

  const navigateToList = () => {
    navigate(location.state?.from || SUMMARY_LIST);
  };

  const onSuccess = (): void => {
    toast.success(
      id ? 'Summary Created Successfully.' : 'Summary Updated Successfully.'
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
    mutationKey: ['create-Summary'],
    mutationFn: createSummary,
    onSuccess,
    onError,
  });

  const onSubmit = async (formData: SummaryFormProps) => {
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
