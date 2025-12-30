import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import news from '../../../helpers/api/news';

type Props = {
  toggleModal?: () => void;
  refetch?: () => void;
  id?: number;
};

export default function useDeleteNews({ toggleModal, refetch, id }: Props) {
  const deleteNews = async () => {
    return news.deleteNews(id);
  };

  const onSuccess = (): void => {
    toast.success('News Deleted Successfully.');
    if (refetch) {
      refetch();
    }
    if (toggleModal) {
      toggleModal();
    }
  };

  const onError = () => {
    toast.error('Unable to delete the News. Please try again.');
    if (toggleModal) {
      toggleModal();
    }
  };

  const deleteNewsMutation = useMutation({
    mutationKey: ['delete-news', id],
    mutationFn: deleteNews,
    onSuccess,
    onError,
  });

  const handleDelete = () => {
    deleteNewsMutation.mutate();
  };

  return {
    deleteNewsMutation,
    handleDelete,
  };
}
