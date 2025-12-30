import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import udose from '../../../../../../../helpers/api/udose';

export default function useSupplementUsageSummary() {
  const { id } = useParams();

  const getSupplementUsageSummaryById = () => {
    return udose.getSupplementUsageSummaryById(id);
  };

  const { data, isFetching, isError } = useQuery({
    queryKey: ['get-supplement-usage-summary-by-id', id],
    queryFn: getSupplementUsageSummaryById,
    refetchOnWindowFocus: false,
    enabled: !!id,
  });

  const trendPercentage = () => {
    if (data && data?.forecasted_month_end > 0) {
      return Math.round(
        ((data.forecasted_month_end - data.last_month_total) /
          data.forecasted_month_end) *
          100
      );
    }
    return 0;
  };

  return {
    data,
    isFetching,
    isError,
    trendPercentage,
  };
}
