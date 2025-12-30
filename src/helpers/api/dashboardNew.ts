import { DASHBOARD } from '../../constants/apiUrls';
import { DashboardAnalytics } from '../../types/dashboard/dashboard';

import { APICore } from './apiCore';

function apiDashboardNew() {
  const apiCore = new APICore();

  return {
    fetchDashboardStatistics: async (): Promise<DashboardAnalytics> => {
      const response = await apiCore.get(DASHBOARD);
      return response.data.body;
    },
  };
}

export default apiDashboardNew();
