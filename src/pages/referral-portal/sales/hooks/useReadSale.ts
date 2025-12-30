import { useQuery } from '@tanstack/react-query';
import sale from '../../../../helpers/api/sale';

export default function useReadSale(id?: number) {
  const getSaleById = async () => {
    return sale.getSaleById(Number(id));
  };

  const { data, isFetching, isFetched, isError } = useQuery({
    queryKey: ['read-sale', id],
    queryFn: getSaleById,
    refetchOnWindowFocus: false,
    enabled: !!id,
  });

  return {
    data,
    isFetching,
    isFetched,
    isError,
  };
}
