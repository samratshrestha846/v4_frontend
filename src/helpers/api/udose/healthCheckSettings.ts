import { SITE_HEALTH_CHECK_SETTINGS } from '../../../constants/apiUrls';
import { SiteHealthSettings } from '../../../types/udose/siteHealthSettings';
import { prepareDynamicUrl } from '../../helpers';

import { APICore } from '../apiCore';

function apiSiteHealthCheckSettings() {
  const api = new APICore();

  return {
    getSiteHealthCheckSettings: async (
      id: string | undefined
    ): Promise<SiteHealthSettings> => {
      const response = await api.get(
        prepareDynamicUrl(SITE_HEALTH_CHECK_SETTINGS, id)
      );
      return response.data.body;
    },

    updateSiteHealthCheckSettings: async (
      formData: any,
      id: string | undefined
    ): Promise<any> => {
      const response = await api.create(
        prepareDynamicUrl(SITE_HEALTH_CHECK_SETTINGS, id),
        formData
      );
      return response.data.body;
    },
  };
}

export default apiSiteHealthCheckSettings();
