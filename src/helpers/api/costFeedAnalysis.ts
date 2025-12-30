import { APICore } from './apiCore';
import { CALCULATE_FEED_ANALYSIS } from '../../constants/apiUrls';
import {
  CalculateCostFeedFormFields,
  CostFeedAnalysis,
} from '../../types/costFeed/costFeed';

function apiCostFeedAnalysis() {
  const apiCore = new APICore();
  return {
    calculateCostFeed: async (
      formData: CalculateCostFeedFormFields
    ): Promise<CostFeedAnalysis> => {
      const response = await apiCore.create(CALCULATE_FEED_ANALYSIS, formData);
      return response.data.body;
    },
  };
}

export default apiCostFeedAnalysis();
