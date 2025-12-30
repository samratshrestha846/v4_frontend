import { SITE_ACTIVITIES } from '../../../constants/apiUrls';
import {
  SiteActivityFilterParams,
  SiteActivityListResponse,
} from '../../../types/udose/siteActivity';

import { APICore } from '../apiCore';

function apiSiteActivity() {
  const api = new APICore();

  return {
    getSiteActivities: async (
      params: SiteActivityFilterParams
    ): Promise<SiteActivityListResponse> => {
      const response = await api.get(SITE_ACTIVITIES, params);
      return response.data;
    },
  };
}

export default apiSiteActivity();
