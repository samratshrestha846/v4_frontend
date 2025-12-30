import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import payment from '../../../../helpers/api/payment';

type Props = {
  toggleModal?: () => void;
  id: number;
  refetch: () => void;
};

export default function useDeletePayment({ toggleModal, id, refetch }: Props) {
  const onSuccess = () => {
    toast.success('Payment Deleted Successfully.');
    refetch();
    if (toggleModal) {
      toggleModal();
    }
  };

  const onError = () => {
    toast.error('Oops! Something went wrong. Try again later.');
  };

  const deletePaymentById = async () => {
    return payment.deletePaymentById(id);
  };

  const deletePaymentMutation = useMutation({
    mutationKey: ['delete-payment-by-id'],
    mutationFn: deletePaymentById,
    onSuccess,
    onError,
  });

  const handleDelete = () => {
    deletePaymentMutation.mutate();
  };

  return {
    handleDelete,
  };
}
