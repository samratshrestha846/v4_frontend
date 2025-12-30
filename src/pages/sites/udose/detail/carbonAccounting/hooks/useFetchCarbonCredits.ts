import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import carbonAccounting from '../../../../../../helpers/api/udose/carbonAccounting';

export default function useFetchCarbonCredits() {
  const { id } = useParams();

  const getCarbonCreditBySiteId = () => {
    return carbonAccounting.getCarbonCreditBySiteId(id);
  };

  const { data, isFetching, isFetched, isError } = useQuery({
    queryKey: ['get-carbon-credit-by-site-id', id],
    queryFn: getCarbonCreditBySiteId,
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
