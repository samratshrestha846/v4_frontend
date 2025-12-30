import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import referrer from '../../../../helpers/api/referrer';

export default function useReferrerAnalyticsCount() {
  const { id } = useParams();

  const getCustomersCountByReferrerId = async () => {
    return referrer.getCustomersCountByReferrerId(Number(id));
  };

  const { data, isFetching, isFetched, isError } = useQuery({
    queryKey: ['get-customer-counts-by-id', id],
    queryFn: getCustomersCountByReferrerId,
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
