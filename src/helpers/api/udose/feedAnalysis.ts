import { SUPPLEMENT_FEED_ANALYSIS } from '../../../constants/apiUrls';
import {
  SupplementFeedAnalysis,
  SupplementFeedAnalysisFilterParams,
} from '../../../types/udose/supplementFeedAnalysis';

import { APICore } from '../apiCore';

function apiFeedAnalysis() {
  const api = new APICore();

  return {
    getSupplementFeedAnalysis: async (
      params: SupplementFeedAnalysisFilterParams | null
    ): Promise<SupplementFeedAnalysis> => {
      const response = await api.get(SUPPLEMENT_FEED_ANALYSIS, params);
      return response.data.body;
    },
  };
}

export default apiFeedAnalysis();
