import { SITE_HEALTH_CHECK_SUMMARY } from '../../constants/apiUrls';
import {
  SiteHealthCheckSumamryQueryParams,
  SiteHealthCheckSumamryResponse,
} from '../../types/siteHealthCheck';
import { APICore } from './apiCore';

function apiSiteHealthCheckSummary() {
  const api = new APICore();

  return {
    fetchSiteHealthCheckSummary: async (
      params: SiteHealthCheckSumamryQueryParams
    ): Promise<SiteHealthCheckSumamryResponse> => {
      const response = await api.get(SITE_HEALTH_CHECK_SUMMARY, params);
      return response.data;
    },
  };
}

export default apiSiteHealthCheckSummary();
