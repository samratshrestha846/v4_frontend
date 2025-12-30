import { ChangeEvent, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { toast } from 'react-toastify';

import siteStatus from '../../../../helpers/api/siteStatus';
import { SiteStatusFormFields } from '../../../../types/siteStatus';
import {
  DOSER_ACTION_START,
  DOSER_ACTION_STOP,
} from '../../../../constants/constants';

export default function useStartStopDoser(
  siteId: number,
  isDoserRunning: boolean,
  toggleModal: () => void
) {
  const [serverValidationError, setServerValidationError] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [doserStatus, setDoserStatus] = useState<boolean>(isDoserRunning);

  const updateSiteDoserStatus = (fromData: SiteStatusFormFields) => {
    return siteStatus.updateSiteDoserStatus(fromData);
  };

  const onSuccess = () => {
    toast.success(
      'The request has been sent successfully. This will take 2-5 minutes to reflect into website'
    );
    toggleModal();
  };

  const onError = (error: any) => {
    setSubmitted(false);
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
      toast.error(error.response.data.status.message ?? 'Something went wrong');
    }
  };

  const updateSiteDoserStatusMutation = useMutation({
    mutationKey: ['update-site-doser-status'],
    mutationFn: updateSiteDoserStatus,
    onSuccess,
    onError,
  });

  const schemaResolver = yupResolver(
    yup.object().shape({
      status: yup.boolean(),
      reason: yup
        .string()
        .when('status', {
          is: () => !doserStatus,
          then: yup
            .string()
            .required('Reason Type is required when you want to stop uDOSE.')
            .typeError('Reason Type is required when you want to stop uDOSE.'),
        })
        .nullable(),
      notes: yup.string().nullable(),
    })
  );

  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SiteStatusFormFields>({
    resolver: schemaResolver,
    defaultValues: {
      site_id: siteId,
      key: 'udose_action',
    },
  });

  const onSubmit = async (formData: SiteStatusFormFields) => {
    setSubmitted(true);
    formData.value = doserStatus ? DOSER_ACTION_START : DOSER_ACTION_STOP;
    formData.status = doserStatus ? DOSER_ACTION_START : DOSER_ACTION_STOP;
    updateSiteDoserStatusMutation.mutate(formData);
  };

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setDoserStatus(e.target.checked);
    toggleModal();
  };

  const handleCancel = () => {
    setDoserStatus((prev) => !prev);
    toggleModal();
  };

  return {
    register,
    control,
    errors,
    handleSubmit,
    onSubmit,
    serverValidationError,
    setServerValidationError,
    updateSiteDoserStatusMutation,
    submitted,
    doserStatus,
    setDoserStatus,
    handleChange,
    handleCancel,
  };
}
