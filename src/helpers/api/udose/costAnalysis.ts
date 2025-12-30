import { NUTRIENT_CALCULATOR } from '../../../constants/apiUrls';
import { NutrientCostAnalysis } from '../../../types/udose/costAnalysis';

import { APICore } from '../apiCore';

function apiCostAnalysis() {
  const api = new APICore();

  return {
    calculateCostAnalysis: async (
      params: any
    ): Promise<NutrientCostAnalysis> => {
      const response = await api.get(NUTRIENT_CALCULATOR, params);
      return response.data.body;
    },
  };
}

export default apiCostAnalysis();
