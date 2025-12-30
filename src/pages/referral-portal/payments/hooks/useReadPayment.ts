import { useQuery } from '@tanstack/react-query';
import payment from '../../../../helpers/api/payment';

export default function useReadPayment(id: number) {
  const getPaymentById = async () => {
    return payment.getPaymentById(id);
  };

  const { data, isFetching, isFetched, isError } = useQuery({
    queryKey: ['get-payment-by-id', id],
    queryFn: getPaymentById,
    refetchOnWindowFocus: false,
  });

  return {
    data,
    isFetching,
    isFetched,
    isError,
  };
}
