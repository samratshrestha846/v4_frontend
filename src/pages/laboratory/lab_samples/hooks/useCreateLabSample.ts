/* eslint-disable func-names */
/* eslint-disable no-param-reassign */
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import labSample from '../../../../helpers/api/labSample';
import { LAB_SAMPLE_LIST } from '../../../../constants/path';
import { LabSampleFormValues } from '../../../../types/lab/labSampleList';

export default function useCreateLabSample() {
  const navigate = useNavigate();
  const [serverValidationError, setServerValidationError] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(null);

  const createLabSample = (fromData: LabSampleFormValues) => {
    return labSample.createLabSample(fromData);
  };

  const navigateToLabSampleList = () => {
    navigate(LAB_SAMPLE_LIST);
  };

  const onSuccess = (): void => {
    toast.success('Lab Sample Created Successfully.');
    navigateToLabSampleList();
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

  const createLabSampleMutation = useMutation({
    mutationKey: ['create-lab-sample'],
    mutationFn: createLabSample,
    onSuccess,
    onError,
  });

  const schemaResolver = yupResolver(
    yup.object().shape({
      lab_sample_type_id: yup
        .number()
        .typeError('Lab Sample type is invalid.')
        .required('Lab Sample type is required.'),
      site_id: yup
        .number()
        .typeError('Site is invalid.')
        .required('Site is required.'),
      collected_datetime: yup
        .string()
        .typeError('Collected on date is invalid.')
        .required('Collected on date is required.'),
      received_datetime: yup
        .mixed()
        .typeError('Reeived on date is invalid.')
        .required('Reeived on date is required.')
        .test(
          'not-before-than-collected-datetime',
          'Received date should not be before than collected date.',
          function (value: any) {
            if (value === null) return true;
            const dayDifference = moment(value).diff(
              moment(this.parent.collected_datetime),
              'days'
            );
            return dayDifference >= 0;
          }
        ),
      sample_taken_by: yup
        .number()
        .typeError('Sample taken by is invalid.')
        .required('Sample taken by is required.'),
    })
  );

  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LabSampleFormValues>({ resolver: schemaResolver });

  const onSubmit = async (formData: LabSampleFormValues) => {
    if (formData.collected_datetime) {
      formData.collected_datetime = moment(formData.collected_datetime).format(
        'YYYY-MM-DD'
      );
    }

    if (formData.received_datetime) {
      formData.received_datetime = moment(formData.received_datetime).format(
        'YYYY-MM-DD'
      );
    }

    if (fileUploaded) {
      formData.file = fileUploaded;
    }

    createLabSampleMutation.mutate(formData);
  };

  return {
    register,
    control,
    errors,
    handleSubmit,
    onSubmit,
    serverValidationError,
    setServerValidationError,
    createLabSampleMutation,
    navigateToLabSampleList,
    setFileUploaded,
  };
}
