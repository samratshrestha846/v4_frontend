import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { STORAGE_TANK } from '../constants/constant';
import HttpApi from '../../Http/http';

type Props = {
  id?: number;
  toggleModal?: () => void;
};

export default function useDeleteStorageTank({ id, toggleModal }: Props) {
  const apiCore = new HttpApi();
  const queryClient = useQueryClient();

  const deleteStorageTank = async () => {
    const response = await apiCore.delete(`${STORAGE_TANK}/${id}`);
    return response.data;
  };

  const onSuccess = (): void => {
    toast.success('Storage Tank Deleted Successfully.');
    if (toggleModal) {
      toggleModal();
    }
    queryClient.invalidateQueries([STORAGE_TANK]);
  };

  const onError = () => {
    toast.error('Unable to delete storage tank. Please try again.');
  };

  const deleteMutation = useMutation({
    mutationKey: ['delete-storage-tank', id],
    mutationFn: deleteStorageTank,
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
