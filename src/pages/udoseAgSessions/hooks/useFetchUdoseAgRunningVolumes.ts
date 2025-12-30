import { useQuery } from '@tanstack/react-query';
import udoseAgs from '../../../helpers/api/udoseAgs';

export default function useFetchUdoseAgRunningVolumes(
  udoseAgId?: number,
  sessionId?: number
) {
  const fetchUdoseAgRunningVolumes = () => {
    return udoseAgs.fetchUdoseAgRunningVolumes(udoseAgId, sessionId);
  };

  const { data, isFetching, isFetched, isError } = useQuery({
    queryKey: ['fetch-udose-ag-running-volumes'],
    queryFn: fetchUdoseAgRunningVolumes,
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
