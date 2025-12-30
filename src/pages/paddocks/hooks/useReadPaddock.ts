import { useQuery } from '@tanstack/react-query';
import paddock from '../../../helpers/api/horticulture/paddock';

export default function useReadPaddock(id?: number) {
  const getPaddockById = () => {
    return paddock.getPaddockById(id);
  };

  const { data, isFetching, isFetched, isError } = useQuery({
    queryKey: ['read-paddock', id],
    queryFn: getPaddockById,
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
