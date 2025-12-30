import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { toast } from 'react-toastify';

import siteStatus from '../../../../../../../../helpers/api/siteStatus';
import { SiteStatusFormFields } from '../../../../../../../../types/siteStatus';
import { DOSER_ACTION_MANUALLY_STOP } from '../../../../../../../../constants/constants';

export default function useManuallyStartStopDoser(
  siteId: number,
  toggleModal?: () => void,
  refetch?: any
) {
  const [serverValidationError, setServerValidationError] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const updateSiteDoserStatus = (fromData: SiteStatusFormFields) => {
    return siteStatus.updateSiteDoserStatus(fromData);
  };

  const onSuccess = () => {
    toast.success('uDOSE Stop Reason Created Successfully.');
    if (toggleModal) {
      toggleModal();
      refetch();
    }

    if (refetch) {
      refetch();
    }
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

  const updateSiteDoserStatusManuallyMutation = useMutation({
    mutationKey: ['manually-update-site-doser-status'],
    mutationFn: updateSiteDoserStatus,
    onSuccess,
    onError,
  });

  const schemaResolver = yupResolver(
    yup.object().shape({
      status: yup.boolean(),
      reason: yup
        .string()
        .required('Reason Type is required.')
        .typeError('Reason Type is required.'),
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
    formData.value = DOSER_ACTION_MANUALLY_STOP;
    formData.status = DOSER_ACTION_MANUALLY_STOP;
    updateSiteDoserStatusManuallyMutation.mutate(formData);
  };

  const handleCancel = () => {
    if (toggleModal) {
      toggleModal();
    }
  };

  return {
    register,
    control,
    errors,
    handleSubmit,
    onSubmit,
    serverValidationError,
    setServerValidationError,
    updateSiteDoserStatusManuallyMutation,
    submitted,
    handleCancel,
  };
}
