import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import user from '../../../helpers/api/user';

type Props = {
  toggleModal: () => void;
  refetch?: () => void;
  id?: number;
};

export default function useResetUserPassword({
  toggleModal,
  refetch,
  id,
}: Props) {
  const resetUserPassword = async (formData: any) => {
    return user.resetUserPassword(formData, Number(id));
  };

  const onSuccess = (): void => {
    toast.success(
      'Password reset successfully. The new password will be sent to email shortly.'
    );
    if (refetch) {
      refetch();
    }
    toggleModal();
  };

  const onError = () => {
    toast.error('Unable to deactivate user. Please try again.');
    toggleModal();
  };

  const resetUserPasswordMutation = useMutation({
    mutationKey: ['reset-user-password', id],
    mutationFn: resetUserPassword,
    onSuccess,
    onError,
  });

  const handleResetPassword = () => {
    resetUserPasswordMutation.mutate({});
  };

  return {
    resetUserPasswordMutation,
    handleResetPassword,
  };
}
