import { useQuery } from '@tanstack/react-query';
import udoseAgs from '../../../helpers/api/udoseAgs';

export default function useReadUdoseAgSessionSummary(id?: number) {
  const readUdoseAgSessionSummary = () => {
    return udoseAgs.readUdoseAgSessionSummary(id);
  };

  const { data, isFetching, isFetched, isError } = useQuery({
    queryKey: ['read-udose-ag-session-summary', id],
    queryFn: readUdoseAgSessionSummary,
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
