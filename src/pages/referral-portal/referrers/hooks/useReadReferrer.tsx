import { useQuery } from '@tanstack/react-query';
import referrer from '../../../../helpers/api/referrer';

export default function useReadReferrer(id: number) {
  const getReferrerById = async () => {
    return referrer.getReferrerById(id);
  };

  const { data, isFetching, isFetched, isError } = useQuery({
    queryKey: ['read-referrer', id],
    queryFn: getReferrerById,
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
