import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import moment from 'moment';

import { SiteFollowUpFormValues } from '../../../../../../../types/udose/siteFollowup';
import udose from '../../../../../../../helpers/api/udose';
import useReadSiteFollowup from './useReadSiteFollowup';

type Props = {
  followupId: number;
  toggleModal: () => void;
  refetchSiteFollowups: any;
};

export default function useUpdateSiteFollowup({
  followupId,
  toggleModal,
  refetchSiteFollowups,
}: Props) {
  const { id: siteId } = useParams();
  const [serverValidationError, setServerValidationError] =
    useState<boolean>(false);

  const [submitted, setSubmitted] = useState(false);

  const {
    data: siteFollowupDetail,
    isError,
    isFetching,
  } = useReadSiteFollowup(Number(siteId), followupId);

  const updateSiteFollowup = (formData: SiteFollowUpFormValues) => {
    const updatedFormData = { ...formData, site_id: siteId };
    return udose.updateUdoseSiteFollowup(followupId, updatedFormData);
  };

  const onSuccess = (): void => {
    setSubmitted(false);
    toast.success('Udose Site Followup Updated Successfully.');
    toggleModal();
    refetchSiteFollowups();
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

  const updateSiteFollowupMutation = useMutation({
    mutationKey: ['update-site-followup'],
    mutationFn: updateSiteFollowup,
    onSuccess,
    onError,
  });

  const schemaResolver = yupResolver(
    yup.object().shape({
      site_class: yup
        .string()
        .typeError('Action Required is invalid.')
        .required('Action Required is required.'),
      runout_days_calculated: yup
        .number()
        .typeError('Runout Days is invalid.')
        .positive('Runout Days must be a positive number.')
        .required('Runout days is required.'),
      status: yup
        .string()
        .typeError('Status is invalid.')
        .required('Status is required.'),
    })
  );

  const {
    register,
    handleSubmit,
    control,
    reset,
    setError,
    formState: { errors },
  } = useForm<SiteFollowUpFormValues>({
    resolver: schemaResolver,
  });

  const onSubmit = async (formData: SiteFollowUpFormValues) => {
    setSubmitted(true);
    if (formData.last_fill_detected)
      formData.last_fill_detected = moment(formData.last_fill_detected).format(
        'YYYY-MM-DD hh:mm:ss'
      );
    updateSiteFollowupMutation.mutate(formData);
  };

  useEffect(() => {
    if (siteFollowupDetail) {
      reset({
        site_class: siteFollowupDetail.site_class,
        runout_days_calculated: siteFollowupDetail.runout_days_calculated,
        general_note: siteFollowupDetail.general_note,
        raingauze_note: siteFollowupDetail.raingauze_note,
        review_note: siteFollowupDetail.review_note,
        status: siteFollowupDetail.status,
        last_fill_detected: siteFollowupDetail.last_fill_detected
          ? new Date(siteFollowupDetail.last_fill_detected)
          : undefined,
      });
    }
  }, [siteFollowupDetail]);

  return {
    register,
    control,
    errors,
    handleSubmit,
    onSubmit,
    serverValidationError,
    setServerValidationError,
    updateSiteFollowupMutation,
    submitted,
    siteFollowupDetail,
    isError,
    isFetching,
  };
}
