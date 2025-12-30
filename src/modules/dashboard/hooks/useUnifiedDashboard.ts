import { useQuery } from '@tanstack/react-query';
import { APICore } from '@uhub/helpers/api/apiCore';
import { DASHBOARD_UNIFIED } from '../constants/path';
import { UnifiedDashboard } from '../types/UnifiedDashboard';

export default function useUnifiedDashboard() {
  const apiCore = new APICore();

  const getUnifiedDashboardData = async (): Promise<UnifiedDashboard> => {
    const response = await apiCore.get(DASHBOARD_UNIFIED);
    return response.data.body;
  };
  const { data, isFetching, isError } = useQuery({
    queryKey: ['unified-dashboard'],
    queryFn: getUnifiedDashboardData,
    refetchOnWindowFocus: false,
  });

  return {
    data,
    isFetching,
    isError,
  };
}
