import { CARBON_CREDITS } from '../../../constants/apiUrls';
import { CarbonCreditSummary } from '../../../types/udose/carbonAccounting';
import { prepareDynamicUrl } from '../../helpers';

import { APICore } from '../apiCore';

function apiCarbonAccounting() {
  const api = new APICore();

  return {
    getCarbonCreditBySiteId: async (
      id: string | undefined
    ): Promise<CarbonCreditSummary> => {
      const response = await api.get(prepareDynamicUrl(CARBON_CREDITS, id));
      return response.data.body;
    },
  };
}

export default apiCarbonAccounting();
