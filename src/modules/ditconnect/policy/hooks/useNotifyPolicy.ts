import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { prepareDynamicUrl } from '@uhub/helpers';
import HttpApi from '../../Http/http';
import { POLICY_NOTIFICATIONS } from '../constants/constant';

export default function useNotifyPolicy(id: number) {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const apiCore = new HttpApi();

  const policyNotification = async () => {
    return apiCore.update(prepareDynamicUrl(POLICY_NOTIFICATIONS, id), '');
  };

  const onSuccess = (): void => {
    toast.success('Policy has been notified');
  };

  const onError = (error: any) => {
    toast.error(error.response.data.status.message);
    setSubmitted(false);
  };

  const createMutation = useMutation({
    mutationKey: ['policy-notification'],
    mutationFn: policyNotification,
    onSuccess,
    onError,
  });

  const onSubmit = async () => {
    setSubmitted(true);
    createMutation.mutate();
  };

  return {
    createMutation,
    submitted,
    setSubmitted,
    onSubmit,
  };
}
