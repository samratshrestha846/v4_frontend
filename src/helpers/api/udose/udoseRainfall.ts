import { SITE_RAINFALL } from '../../../constants/apiUrls';
import {
  Rainfall,
  RainfallFilterParams,
} from '../../../types/udose/udoseRainfall';
import { prepareDynamicUrl } from '../../helpers';

import { APICore } from '../apiCore';

function apiUdoseRainfall() {
  const api = new APICore();

  return {
    getUdoseRainfall: async (
      id: string | undefined,
      params: RainfallFilterParams | null
    ): Promise<Rainfall> => {
      const response = await api.get(
        prepareDynamicUrl(SITE_RAINFALL, id),
        params
      );
      return response.data.body;
    },
  };
}

export default apiUdoseRainfall();
