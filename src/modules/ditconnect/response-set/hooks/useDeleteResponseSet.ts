import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import HttpApi from '../../Http/http';
import { RESPONSE_SET } from '../constants/constant';

type Props = {
  id?: number;
  toggleModal?: () => void;
};

export default function useDeleteResponseSet({ id, toggleModal }: Props) {
  const apiCore = new HttpApi();
  const queryClient = useQueryClient();

  const deleteResponseSet = async () => {
    const response = await apiCore.delete(`${RESPONSE_SET}/${id}`);
    return response.data;
  };

  const onSuccess = (): void => {
    toast.success('Response Set Deleted Successfully.');
    if (toggleModal) {
      toggleModal();
    }
    queryClient.invalidateQueries([RESPONSE_SET]);
  };

  const onError = () => {
    toast.error('Unable to delete response set. Please try again.');
  };

  const deleteMutation = useMutation({
    mutationKey: ['delete-response-set', id],
    mutationFn: deleteResponseSet,
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
