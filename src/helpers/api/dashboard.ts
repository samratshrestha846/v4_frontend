import {
  DASHBOARD_KPIS_COUNT,
  DASHBOARD_KPIS_UDOSE_SITE,
  SITES,
  UBOT_SITES,
} from '../../constants/apiUrls';
import DashboardQueryParams from '../../types/dashboard/dashboard';
import {
  DashboardCountKPI,
  DashboardKPIUdoseSite,
  DashboardKPIUdoseSiteFilterParams,
} from '../../types/dashboard/kpi';
import { Site } from '../../types/site';
import { UbotSite } from '../../types/ubot';
import { APICore } from './apiCore';

function apiDashboard() {
  const apiCore = new APICore();
  return {
    getUdoseSites: async (params: DashboardQueryParams): Promise<Site[]> => {
      const response = await apiCore.get(SITES, params);
      return response.data.body;
    },

    getKpisCount: async (): Promise<DashboardCountKPI> => {
      const response = await apiCore.get(DASHBOARD_KPIS_COUNT);
      return response.data.body;
    },

    getUbotSites: async (params: DashboardQueryParams): Promise<UbotSite[]> => {
      const response = await apiCore.get(UBOT_SITES, params);
      return response.data.data;
    },

    getDashboardUdoseSiteKpis: async (
      params: DashboardKPIUdoseSiteFilterParams
    ): Promise<DashboardKPIUdoseSite> => {
      const response = await apiCore.get(DASHBOARD_KPIS_UDOSE_SITE, params);
      return response.data.body;
    },
  };
}

export default apiDashboard();
