import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import moment from 'moment';

import udose from '../../../../../../../helpers/api/udose';
import { SiteFollowUpFormValues } from '../../../../../../../types/udose/siteFollowup';
import { UDOSE_FOLLOWUP_STATUS_TODO } from '../../../../../../../constants/constants';

type Props = {
  toggleModal: () => void;
  refetchSiteFollowups: any;
};

export default function useCreateSiteFollowup({
  toggleModal,
  refetchSiteFollowups,
}: Props) {
  const { id } = useParams();

  const [serverValidationError, setServerValidationError] =
    useState<boolean>(false);
  const [submitted, setSubmitted] = useState(false);

  const createSiteFollowup = (formData: SiteFollowUpFormValues) => {
    const updatedFormData = { ...formData, site_id: id };
    return udose.createUdoseSiteFollowup(updatedFormData);
  };

  const onSuccess = (): void => {
    setSubmitted(false);
    toast.success('Udose Site Followup Created Sucessfully.');
    refetchSiteFollowups();
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

  const createSiteFollowupMutation = useMutation({
    mutationKey: ['create-site-followup'],
    mutationFn: createSiteFollowup,
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
        .required('Runout Days is required.'),
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
    setError,
    formState: { errors },
  } = useForm<SiteFollowUpFormValues>({
    resolver: schemaResolver,
    defaultValues: {
      status: UDOSE_FOLLOWUP_STATUS_TODO,
    },
  });

  const onSubmit = async (formData: SiteFollowUpFormValues) => {
    setSubmitted(true);
    if (formData.last_fill_detected)
      formData.last_fill_detected = moment(formData.last_fill_detected).format(
        'YYYY-MM-DD hh:mm:ss'
      );
    createSiteFollowupMutation.mutate(formData);
  };

  return {
    register,
    control,
    errors,
    handleSubmit,
    onSubmit,
    serverValidationError,
    setServerValidationError,
    createSiteFollowupMutation,
    submitted,
  };
}
