import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import paddock from '../../../helpers/api/horticulture/paddock';

type Props = {
  paddockId: number;
  refetch: () => void;
};

export default function useDeletePaddock({ paddockId, refetch }: Props) {
  const [showModal, setShowModal] = useState<boolean>(false);

  const deletePaddock = async () => {
    return paddock.deletePaddock(paddockId);
  };

  const onSuccess = (): void => {
    toast.success('Paddock Deleted Successfully.');
    toggleModal();
    refetch();
  };

  const onError = () => {
    toast.error('Unable to delete the paddock. Please try again.');
  };

  const deletePaddockMutation = useMutation({
    mutationKey: ['delete-paddock', paddockId],
    mutationFn: deletePaddock,
    onSuccess,
    onError,
  });

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleDelete = () => {
    deletePaddockMutation.mutate();
  };

  return {
    showModal,
    toggleModal,
    deletePaddockMutation,
    handleDelete,
  };
}
