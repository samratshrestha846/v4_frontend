import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import udose from '../../../../../../../helpers/api/udose';
import {
  ServiceLog,
  ServiceLogFormValues,
} from '../../../../../../../types/udose/serviceLog';

type Props = {
  serviceLogDetail?: ServiceLog;
  refetchServiceLogs: () => void;
};

export default function useUpdateSiteServiceLog({
  serviceLogDetail,
  refetchServiceLogs,
}: Props) {
  const { id } = useParams();

  const [serverValidationError, setServerValidationError] =
    useState<boolean>(false);

  const [submitted, setSubmitted] = useState(false);

  const updateSiteServiceLog = (formData: ServiceLogFormValues) => {
    return udose.updateSiteServiceLog(Number(serviceLogDetail?.id), formData);
  };

  const onSuccess = (): void => {
    setSubmitted(false);
    toast.success('Service Log Updated Successfully.');
    refetchServiceLogs();
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

  const updateSiteServiceLogMutation = useMutation({
    mutationKey: ['update-udose-site-service-log'],
    mutationFn: updateSiteServiceLog,
    onSuccess,
    onError,
  });

  const schemaResolver = yupResolver(
    yup.object().shape({
      date: yup
        .date()
        .typeError('Date is invalid.')
        .required('Date is required.'),
      arrival_time: yup.string().nullable(),
      departure_time: yup.string().nullable(),
      user_id: yup
        .number()
        .required('Maintainer is required.')
        .typeError('Maintainer is invalid.'),
      notes: yup
        .string()
        .typeError('Notes is invalid.')
        .required('Notes is required.'),
    })
  );

  const {
    register,
    handleSubmit,
    control,
    reset,
    setError,
    formState: { errors },
  } = useForm<ServiceLogFormValues>({
    resolver: schemaResolver,
  });

  const onSubmit = async (formData: ServiceLogFormValues) => {
    setSubmitted(true);

    formData.site_id = Number(id);

    if (formData.date) {
      formData.date = moment(formData.date).format('YYYY-MM-DD');
    }
    if (formData.arrival_time) {
      formData.arrival_time = moment(formData.arrival_time).format('HH:mm:ss');
    }

    if (formData.departure_time) {
      formData.departure_time = moment(formData.departure_time).format(
        'HH:mm:ss'
      );
    }
    updateSiteServiceLogMutation.mutate(formData);
  };

  useEffect(() => {
    if (serviceLogDetail) {
      const date = moment(serviceLogDetail.date).format('YYYY-MM-DD');
      reset({
        site_id: serviceLogDetail.site_id,
        follow_up_id: serviceLogDetail.follow_up_id,
        date: serviceLogDetail.date
          ? moment(serviceLogDetail.date).toDate()
          : serviceLogDetail.date,
        arrival_time: serviceLogDetail.arrival_time
          ? moment(
              `${date} ${serviceLogDetail.arrival_time}`,
              'YYYY-MM-DD HH:mm:ss'
            ).toDate()
          : serviceLogDetail.arrival_time,
        departure_time: serviceLogDetail.departure_time
          ? moment(
              `${date} ${serviceLogDetail.departure_time}`,
              'YYYY-MM-DD HH:mm:ss'
            ).toDate()
          : serviceLogDetail.departure_time,
        user_id: serviceLogDetail.user_id,
        notes: serviceLogDetail.notes,
      });
    }
  }, [serviceLogDetail]);

  return {
    register,
    control,
    errors,
    handleSubmit,
    onSubmit,
    serverValidationError,
    setServerValidationError,
    updateSiteServiceLogMutation,
    submitted,
  };
}
