import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import horticulture from '../../../../helpers/api/horticulture';

type Props = {
  cropCycleId: number;
  refetch: () => void;
};

export default function useDeleteCropCycle({ cropCycleId, refetch }: Props) {
  const [showModal, setShowModal] = useState<boolean>(false);

  const deleteCropLifeCyle = async () => {
    return horticulture.deleteCropCycle(cropCycleId);
  };

  const onSuccess = (): void => {
    toast.success('Crop Cycle Deleted Successfully.');
    toggleModal();
    refetch();
  };

  const onError = () => {
    toast.error('Unable to delete the Crop Cycle. Please try again.');
  };

  const deleteCropCycleMutation = useMutation({
    mutationKey: ['delete-crop-life-cycle', cropCycleId],
    mutationFn: deleteCropLifeCyle,
    onSuccess,
    onError,
  });

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleDelete = () => {
    deleteCropCycleMutation.mutate();
  };

  return {
    showModal,
    toggleModal,
    deleteCropCycleMutation,
    handleDelete,
  };
}
