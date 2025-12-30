import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import HttpApi from '../../Http/http';
import { ROLE } from '../constants/constant';

type Props = {
  id?: number;
  toggleModal?: () => void;
};

export default function useDeleteRole({ id, toggleModal }: Props) {
  const apiCore = new HttpApi();
  const queryClient = useQueryClient();

  const deleteRole = async () => {
    const response = await apiCore.delete(`${ROLE}/${id}`);
    return response.data;
  };

  const onSuccess = (): void => {
    toast.success('Role Deleted Successfully.');
    if (toggleModal) {
      toggleModal();
    }
    queryClient.invalidateQueries([ROLE]);
  };

  const onError = () => {
    toast.error('Unable to delete role. Please try again.');
  };

  const deleteMutation = useMutation({
    mutationKey: ['delete-role', id],
    mutationFn: deleteRole,
    onSuccess,
    onError,
  });

  const handleDelete = () => {
    deleteMutation.mutate();
  };

  return {
    handleDelete,
  };
}
