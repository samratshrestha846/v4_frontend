import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import HttpApi from '../Http/http';

type Props = {
  title: string;
  endpoint: string;
  refetchKey: string;
  toggleModal: () => void;
};

export default function useDelete({
  title,
  endpoint,
  refetchKey,
  toggleModal,
}: Props) {
  const apiCore = new HttpApi();

  const queryClient = useQueryClient();

  const remove = async () => {
    return apiCore.delete(endpoint);
  };

  const onSuccess = (): void => {
    toast.success(`${title} Deleted Successfully.`);
    queryClient.invalidateQueries({ queryKey: [refetchKey] });
    toggleModal();
  };

  const onError = () => {
    toast.error(`Unable to delete the ${title}. Please try again.`);
    toggleModal();
  };

  const deleteMutation = useMutation({
    mutationKey: [`${title}-Delete`],
    mutationFn: remove,
    onSuccess,
    onError,
  });

  const deleteRecord = () => {
    deleteMutation.mutate();
  };
  return {
    deleteRecord,
  };
}
