import { FILEPATH } from '../../constants/apiUrls';
import { APICore } from './apiCore';

function apiRainfall() {
  const apiCore = new APICore();

  return {
    fetchRainfallRasterData: async (param: any): Promise<any> => {
      const response = await apiCore.get(FILEPATH, param);
      return response.data.body;
    },
  };
}

export default apiRainfall();
