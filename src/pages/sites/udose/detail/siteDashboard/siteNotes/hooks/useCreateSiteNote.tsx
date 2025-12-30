import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import logs from '../../../../../../../helpers/api/logs';
import { UdoseSiteLogFormFields } from '../../../../../../../types/log/logList';

export default function useCreateSiteNote(
  siteId: number,
  toggleModal?: () => void,
  refetch?: any
) {
  const [serverValidationError, setServerValidationError] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const createNewNote = (formData: any) => {
    return logs.createLog(formData);
  };

  const onSuccess = () => {
    toast.success('Site Note Created Successfully.');
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

  const createNewNoteMutation = useMutation({
    mutationKey: ['add-new-note'],
    mutationFn: createNewNote,
    onSuccess,
    onError,
  });

  const schemaResolver = yupResolver(
    yup.object().shape({
      description: yup
        .string()
        .max(255, 'Only 255 characters are allowed.')
        .required('Note is required.')
        .typeError('Note is required.'),
    })
  );

  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<UdoseSiteLogFormFields>({
    resolver: schemaResolver,
    defaultValues: {
      model_type: 'site',
      model_id: Number(siteId),
      type: 'note',
    },
  });

  const onSubmit = async (formData: UdoseSiteLogFormFields) => {
    createNewNoteMutation.mutate(formData);
  };

  return {
    register,
    control,
    errors,
    handleSubmit,
    onSubmit,
    submitted,
    serverValidationError,
    setServerValidationError,
  };
}
