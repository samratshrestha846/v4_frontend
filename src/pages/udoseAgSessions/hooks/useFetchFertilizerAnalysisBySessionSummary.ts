import { useQuery } from '@tanstack/react-query';
import udoseAgs from '../../../helpers/api/udoseAgs';

export default function useFetchFertilizerAnalysisBySessionSummary(
  id?: number
) {
  const fetchFertilizerAnalysisBySessionSummary = () => {
    return udoseAgs.fetchFertilizerAnalysisBySessionSummary(id);
  };

  const { data, isFetching, isFetched, isError } = useQuery({
    queryKey: ['fetch-fertilizer-analysis-by-session-summary', id],
    queryFn: fetchFertilizerAnalysisBySessionSummary,
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
