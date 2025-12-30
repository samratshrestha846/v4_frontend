import { useQuery } from '@tanstack/react-query';
import apiDashboard from '../../../helpers/api/dashboard';

export default function useFetchDashboardCount() {
  const fetchDashboardCount = () => {
    return apiDashboard.getKpisCount();
  };

  const { data, isFetching, isError } = useQuery(
    ['dashboard-kpi-count'],
    fetchDashboardCount,
    { refetchOnWindowFocus: false }
  );

  return { data, isFetching, isError };
}
