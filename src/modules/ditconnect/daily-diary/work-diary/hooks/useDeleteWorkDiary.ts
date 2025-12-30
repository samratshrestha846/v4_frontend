import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { WORK_DIARY } from '../constants/constant';
import HttpApi from '../../../Http/http';

type Props = {
  id?: number;
  toggleModal?: () => void;
};

export default function useDeleteWorkDiary({ id, toggleModal }: Props) {
  const apiCore = new HttpApi();
  const queryClient = useQueryClient();

  const deleteWorkDiary = async () => {
    const response = await apiCore.delete(`${WORK_DIARY}/${id}`);
    return response.data;
  };

  const onSuccess = (): void => {
    toast.success('Daily Diary Deleted Successfully.');
    if (toggleModal) {
      toggleModal();
    }
    queryClient.invalidateQueries([WORK_DIARY]);
  };

  const onError = () => {
    toast.error('Unable to delete daily diary. Please try again.');
  };

  const deleteMutation = useMutation({
    mutationKey: ['delete-WorkDiary', id],
    mutationFn: deleteWorkDiary,
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
