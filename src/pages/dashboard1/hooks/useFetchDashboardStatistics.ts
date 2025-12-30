import { useQuery } from '@tanstack/react-query';
import apiDashboardNew from '../../../helpers/api/dashboardNew';

export default function useFetchDashboardStatistics() {
  const fetchDashboardStatistics = () => {
    return apiDashboardNew.fetchDashboardStatistics();
  };

  const { data, isFetching, isError } = useQuery({
    queryKey: ['dashboard-statistics'],
    queryFn: fetchDashboardStatistics,
    refetchOnWindowFocus: false,
  });

  return { data, isFetching, isError };
}
