import { READ_HEALTH_CHECK } from '../../constants/apiUrls';
import UdoseSiteHealth from '../../types/udose/udoseSiteHealth';
import { prepareDynamicUrl } from '../helpers';

import { APICore } from './apiCore';

function apiUdoseSiteHealth() {
  const apiCore = new APICore();

  return {
    getHealthCheckById: async (
      id: string | undefined
    ): Promise<UdoseSiteHealth> => {
      const response = await apiCore.get(
        prepareDynamicUrl(READ_HEALTH_CHECK, id)
      );
      return response.data.body;
    },
  };
}

export default apiUdoseSiteHealth();
