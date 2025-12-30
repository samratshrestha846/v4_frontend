import { useQuery } from '@tanstack/react-query';
import udoseAgs from '../../../helpers/api/udoseAgs';

export default function useFetchUdoseAgEndOfRunMessage(
  udoseAgId?: number,
  sessionId?: number
) {
  const fetchUdoseAgEndOfRunMessages = () => {
    return udoseAgs.fetchUdoseAgEndOfRunMessages(udoseAgId, sessionId);
  };

  const { data, isFetching, isFetched, isError } = useQuery({
    queryKey: ['fetch-udose-ag-end-of-runs-messages'],
    queryFn: fetchUdoseAgEndOfRunMessages,
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
