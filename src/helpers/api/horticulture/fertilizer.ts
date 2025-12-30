import { FERTILIZERS } from '../../../constants/apiUrls';
import {
  Fertilizer,
  FertilizerFormFields,
  FertilizerQueryParams,
} from '../../../types/horticulture/fertilizer';
import { APICore } from '../apiCore';

function apiFertilizer() {
  const api = new APICore();

  return {
    listFertilizers: async (
      params: FertilizerQueryParams
    ): Promise<Fertilizer[]> => {
      const response = await api.get(FERTILIZERS, params);
      return response.data.body;
    },

    createFertilizer: async (
      fromData: FertilizerFormFields
    ): Promise<Fertilizer> => {
      const response = await api.create(FERTILIZERS, fromData);
      return response.data.body;
    },

    getFertilizerById: async (id: number): Promise<Fertilizer> => {
      const response = await api.get(`${FERTILIZERS}/${id}`);
      return response.data.body;
    },

    updateFertilizer: async (
      fromData: FertilizerFormFields,
      id: number
    ): Promise<Fertilizer> => {
      const response = await api.update(`${FERTILIZERS}/${id}`, fromData);
      return response.data.body;
    },
  };
}

export default apiFertilizer();
