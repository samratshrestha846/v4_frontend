import { SITE_ALARMS } from '../../../constants/apiUrls';
import {
  SiteAlarm,
  SiteAlarmFilterParams,
} from '../../../types/udose/siteAlarm';
import { prepareDynamicUrl } from '../../helpers';

import { APICore } from '../apiCore';

function apiAlarmHistory() {
  const api = new APICore();

  return {
    getAlarmHistory: async (
      id: string | undefined,
      params: SiteAlarmFilterParams | null
    ): Promise<SiteAlarm[]> => {
      const response = await api.get(
        prepareDynamicUrl(SITE_ALARMS, id),
        params
      );
      return response.data.body;
    },
  };
}

export default apiAlarmHistory();
