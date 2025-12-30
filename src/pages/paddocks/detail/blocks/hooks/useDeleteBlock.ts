import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import block from '../../../../../helpers/api/horticulture/block';

type Props = {
  toggleModal: () => void;
  refetchBlocks?: () => void;
  blockId?: number;
};

export default function useDeleteBlock({
  toggleModal,
  refetchBlocks,
  blockId,
}: Props) {
  const deleteBlock = async () => {
    return block.deleteBlock(Number(blockId));
  };

  const onSuccess = (): void => {
    toast.success('Block Deleted Successfully.');
    if (refetchBlocks) {
      refetchBlocks();
    }
    toggleModal();
  };

  const onError = () => {
    toast.error('Unable to delete the Block. Please try again.');
    toggleModal();
  };

  const deleteBlockMutation = useMutation({
    mutationKey: ['delete-block', blockId],
    mutationFn: deleteBlock,
    onSuccess,
    onError,
  });

  const handleDelete = () => {
    deleteBlockMutation.mutate();
  };

  return {
    deleteBlockMutation,
    handleDelete,
  };
}
