import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import udose from '../../../../../../../helpers/api/udose';
import { ServiceLogFormValues } from '../../../../../../../types/udose/serviceLog';

type Props = {
  refetchServiceLogs: () => void;
  toggleModal: () => void;
  refetchSiteFollowups?: () => void;
  followupId?: number;
};

export default function useCreateSiteServiceLog({
  refetchServiceLogs,
  toggleModal,
  refetchSiteFollowups,
  followupId,
}: Props) {
  const { id } = useParams();

  const [serverValidationError, setServerValidationError] =
    useState<boolean>(false);

  const [submitted, setSubmitted] = useState(false);

  const createSiteServiceLog = (formData: ServiceLogFormValues) => {
    return udose.createUdoseSiteServiceLog(formData);
  };

  const onSuccess = (): void => {
    setSubmitted(false);
    toast.success('Site Service Log Created Sucessfully.');
    refetchServiceLogs();

    if (refetchSiteFollowups) {
      refetchSiteFollowups();
    }

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
    setSubmitted(false);
  };

  const createSiteServiceLogMutation = useMutation({
    mutationKey: ['create-site-service-log'],
    mutationFn: createSiteServiceLog,
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
    setError,
    formState: { errors },
  } = useForm<ServiceLogFormValues>({
    resolver: schemaResolver,
    defaultValues: {
      date: moment().toDate(),
      arrival_time: '',
      departure_time: '',
    },
  });

  const onSubmit = async (formData: ServiceLogFormValues) => {
    setSubmitted(true);
    formData.site_id = Number(id);

    if (followupId) {
      formData.follow_up_id = Number(followupId);
    }

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
    createSiteServiceLogMutation.mutate(formData);
  };

  return {
    register,
    control,
    errors,
    handleSubmit,
    onSubmit,
    serverValidationError,
    setServerValidationError,
    createSiteServiceLogMutation,
    submitted,
  };
}
