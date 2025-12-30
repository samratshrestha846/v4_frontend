import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import HttpApi from '../../../Http/http';
import { FILES } from '../../constants/constant';

type Props = {
  id?: number;
  toggleModal?: () => void;
};

export default function useDeleteFile({ id, toggleModal }: Props) {
  const apiCore = new HttpApi();
  const queryClient = useQueryClient();

  const deleteFile = async () => {
    const response = await apiCore.delete(`${FILES}/${id}`);
    return response.data;
  };

  const onSuccess = (): void => {
    toast.success('File Deleted Successfully.');
    if (toggleModal) {
      toggleModal();
    }
    queryClient.invalidateQueries([FILES]);
  };

  const onError = () => {
    toast.error('Unable to delete File. Please try again.');
  };

  const deleteMutation = useMutation({
    mutationKey: ['delete-file', id],
    mutationFn: deleteFile,
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
