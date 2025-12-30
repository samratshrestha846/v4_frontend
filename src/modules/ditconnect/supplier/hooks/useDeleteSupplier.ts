import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import HttpApi from '../../Http/http';
import { SUPPLIER } from '../constants/constant';

type Props = {
  id?: number;
  toggleModal?: () => void;
};

export default function useDeleteSupplier({ id, toggleModal }: Props) {
  const apiCore = new HttpApi();
  const queryClient = useQueryClient();

  const deleteSupplier = async () => {
    const response = await apiCore.delete(`${SUPPLIER}/${id}`);
    return response.data;
  };

  const onSuccess = (): void => {
    toast.success('Supplier Deleted Successfully.');
    if (toggleModal) {
      toggleModal();
    }
    queryClient.invalidateQueries([SUPPLIER]);
  };

  const onError = () => {
    toast.error('Unable to delete the Supplier. Please try again.');
  };

  const deleteMutation = useMutation({
    mutationKey: ['delete-supplier', id],
    mutationFn: deleteSupplier,
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
