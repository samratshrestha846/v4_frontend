import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import HttpApi from '../../../Http/http';
import { TEMPLATE } from '../constants/constant';

type Props = {
  id?: number;
  toggleModal?: () => void;
};

export default function useDeleteTemplate({ id, toggleModal }: Props) {
  const apiCore = new HttpApi();
  const queryClient = useQueryClient();

  const deleteTemplate = async () => {
    const response = await apiCore.delete(`${TEMPLATE}/${id}`);
    return response.data;
  };

  const onSuccess = (): void => {
    toast.success('Template Deleted Successfully.');
    if (toggleModal) {
      toggleModal();
    }
    queryClient.invalidateQueries([TEMPLATE]);
  };

  const onError = () => {
    toast.error('Unable to delete Template. Please try again.');
  };

  const deleteMutation = useMutation({
    mutationKey: ['delete-template', id],
    mutationFn: deleteTemplate,
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
