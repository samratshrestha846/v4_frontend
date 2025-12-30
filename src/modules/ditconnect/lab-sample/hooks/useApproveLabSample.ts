import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import moment from 'moment';

import HttpApi from '../../Http/http';
import { LAB_SAMPLE } from '../constants/constant';

type Props = {
  sampleId: number;
  toggleModal: () => void;
};

export default function useApproveLabSample({ sampleId, toggleModal }: Props) {
  const [serverValidationError, setServerValidationError] = useState(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const apiCore = new HttpApi();
  const queryClient = useQueryClient();

  const approve = async (formData: any) => {
    return apiCore.create(
      `${LAB_SAMPLE}/${sampleId}/update-and-approve`,
      formData
    );
  };

  const onSuccess = (): void => {
    toast.success('Approved Successfully.');
    queryClient.invalidateQueries({ queryKey: [LAB_SAMPLE] });
    toggleModal();
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
  };

  const approveMutation = useMutation({
    mutationKey: ['approve-lab-sample'],
    mutationFn: approve,
    onSuccess,
    onError,
  });

  const schemaResolver = yupResolver(
    yup.object().shape({
      received_datetime: yup
        .string()
        .typeError('Received at is invalid.')
        .required('Received at is required.'),
    })
  );

  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm({
    resolver: schemaResolver,
  });

  const onSubmit = async (formData: any) => {
    setSubmitted(true);
    if (formData.received_datetime) {
      formData.received_datetime = moment(formData.received_datetime)
        .utc()
        .format('YYYY-MM-DD HH:mm');
    }
    approveMutation.mutate(formData);
  };

  return {
    register,
    control,
    errors,
    handleSubmit,
    serverValidationError,
    setServerValidationError,
    submitted,
    setSubmitted,
    onSubmit,
  };
}
