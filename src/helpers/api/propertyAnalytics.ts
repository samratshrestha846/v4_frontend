import {
  CUSTOMER_COST_NUTRIENT_ANALYTICS,
  CUSTOMER_DASHBOARD_COUNTS,
} from '../../constants/apiUrls';
import {
  CostNutrientData,
  CountData,
  FilterByPropertyQueryParams,
} from '../../types/property/analytics';

import { APICore } from './apiCore';

function propertyAnalytics() {
  const apiCore = new APICore();
  return {
    fetchDashboardCounts: async (
      params: FilterByPropertyQueryParams
    ): Promise<CountData> => {
      const response = await apiCore.get(CUSTOMER_DASHBOARD_COUNTS, params);
      return response.data.body;
    },

    fetchCostNutrientAnalytics: async (
      params: FilterByPropertyQueryParams
    ): Promise<CostNutrientData> => {
      const response = await apiCore.get(
        CUSTOMER_COST_NUTRIENT_ANALYTICS,
        params
      );
      return response.data.body;
    },
  };
}

export default propertyAnalytics();
