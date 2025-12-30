import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import user from '../../../helpers/api/user';

type Props = {
  toggleModal: () => void;
  refetch?: () => void;
  id?: number;
};

export default function useDeactivateUser({ toggleModal, refetch, id }: Props) {
  const deactivateUser = async (formData: any) => {
    return user.deactivateUser(formData, Number(id));
  };

  const onSuccess = (): void => {
    toast.success('User Deactivated Successfully.');
    if (refetch) {
      refetch();
    }
    toggleModal();
  };

  const onError = () => {
    toast.error('Unable to deactivate user. Please try again.');
    toggleModal();
  };

  const deactivateUserMutation = useMutation({
    mutationKey: ['deactivate-user', id],
    mutationFn: deactivateUser,
    onSuccess,
    onError,
  });

  const handleDeactivate = () => {
    const formData: any = { status: 0 };
    deactivateUserMutation.mutate(formData);
  };

  return {
    deactivateUserMutation,
    handleDeactivate,
  };
}
