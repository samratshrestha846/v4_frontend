import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import cropable from '../../../../../helpers/api/horticulture/cropable';

type Props = {
  toggleModal: () => void;
  refetchBlocks?: () => void;
  refetchSubBlocks?: () => void;
  id?: number;
};

export default function useDeleteCropable({
  toggleModal,
  refetchBlocks,
  refetchSubBlocks,
  id,
}: Props) {
  const deleteCropable = async () => {
    return cropable.deleteCropable(Number(id));
  };

  const onSuccess = (): void => {
    toast.success('Assigned Crop Deleted Successfully.');
    if (refetchBlocks) {
      refetchBlocks();
    }

    if (refetchSubBlocks) {
      refetchSubBlocks();
    }

    toggleModal();
  };

  const onError = () => {
    toast.error('Unable to delete the crop. Please try again.');
    toggleModal();
  };

  const deleteCropableMutation = useMutation({
    mutationKey: ['delete-cropable', id],
    mutationFn: deleteCropable,
    onSuccess,
    onError,
  });

  const handleDelete = () => {
    deleteCropableMutation.mutate();
  };

  return {
    deleteCropableMutation,
    handleDelete,
  };
}
