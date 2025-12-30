import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import HttpApi from '../../../Http/http';
import { FOLDERS } from '../../constants/constant';

type Props = {
  id?: number;
  toggleModal?: () => void;
};

export default function useDeleteFolder({ id, toggleModal }: Props) {
  const apiCore = new HttpApi();
  const queryClient = useQueryClient();

  const deleteFolder = async () => {
    const response = await apiCore.delete(`${FOLDERS}/${id}`);
    return response.data;
  };

  const onSuccess = (): void => {
    toast.success('Folder Deleted Successfully.');
    if (toggleModal) {
      toggleModal();
    }
    queryClient.invalidateQueries([FOLDERS]);
  };

  const onError = () => {
    toast.error('Unable to delete Folder. Please try again.');
  };

  const deleteMutation = useMutation({
    mutationKey: ['delete-folder', id],
    mutationFn: deleteFolder,
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
