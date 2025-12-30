import { SITE_TWENTY_FOUR_HOUR_USAGE } from '../../../constants/apiUrls';
import { DurationQueryFilterStartEndParams } from '../../../types/common';
import { UdoseRecordTwentyFourHour } from '../../../types/udose/udoseSummary';
import { prepareDynamicUrl } from '../../helpers';

import { APICore } from '../apiCore';

function apiTwentyFourHourUsage() {
  const api = new APICore();

  return {
    getSiteTwentyFourHourUsage: async (
      id: string | undefined,
      params: DurationQueryFilterStartEndParams | null
    ): Promise<UdoseRecordTwentyFourHour[]> => {
      const response = await api.get(
        prepareDynamicUrl(SITE_TWENTY_FOUR_HOUR_USAGE, id),
        params
      );
      return response.data.body;
    },
  };
}

export default apiTwentyFourHourUsage();
