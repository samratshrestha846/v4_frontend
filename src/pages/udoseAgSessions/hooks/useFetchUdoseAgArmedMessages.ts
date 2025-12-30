import { useQuery } from '@tanstack/react-query';
import udoseAgs from '../../../helpers/api/udoseAgs';

export default function useFetchUdoseAgArmedMessages(
  udoseAgId?: number,
  sessionId?: number
) {
  const fetchUdoseAgArmedMessages = () => {
    return udoseAgs.fetchUdoseAgArmedMessages(udoseAgId, sessionId);
  };

  const { data, isFetching, isFetched, isError } = useQuery({
    queryKey: ['fetch-udose-ag-armed-messages'],
    queryFn: fetchUdoseAgArmedMessages,
    refetchOnWindowFocus: false,
    enabled: !!(udoseAgId && sessionId),
  });

  return {
    data,
    isFetching,
    isFetched,
    isError,
  };
}
