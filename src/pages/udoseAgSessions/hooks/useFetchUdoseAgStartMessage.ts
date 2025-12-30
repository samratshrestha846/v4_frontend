import { useQuery } from '@tanstack/react-query';
import udoseAgs from '../../../helpers/api/udoseAgs';

export default function useFetchUdoseAgStartMessage(
  udoseAgId?: number,
  sessionId?: number
) {
  const fetchUdoseAgStartMessages = () => {
    return udoseAgs.fetchUdoseAgStartMessages(udoseAgId, sessionId);
  };

  const { data, isFetching, isFetched, isError } = useQuery({
    queryKey: ['fetch-udose-ag-start-messages'],
    queryFn: fetchUdoseAgStartMessages,
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
