import { UDOSE_STOP_REASONS } from '../../constants/apiUrls';
import { SiteStatusFormFields } from '../../types/siteStatus';

import { APICore } from './apiCore';

function apiSiteStatus() {
  const apiCore = new APICore();

  return {
    updateSiteDoserStatus: async (
      formData: SiteStatusFormFields
    ): Promise<any> => {
      const response = await apiCore.create(UDOSE_STOP_REASONS, formData);
      return response.data.body;
    },
  };
}

export default apiSiteStatus();
