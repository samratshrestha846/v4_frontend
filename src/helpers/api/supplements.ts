import { SUPPLEMENTS } from '../../constants/apiUrls';
import {
  Supplement,
  SupplementQueryParams,
  SupplementResponse,
} from '../../types/supplements/supplement';

import { APICore } from './apiCore';

function apiSupplement() {
  const api = new APICore();

  return {
    getSupplements: async (
      params: SupplementQueryParams
    ): Promise<SupplementResponse> => {
      const response = await api.get(SUPPLEMENTS, params);
      return response.data;
    },

    createSupplement: async (formData: FormData): Promise<Supplement> => {
      const response = await api.create(SUPPLEMENTS, formData);
      return response.data.body;
    },

    updateSupplement: async (
      fromData: FormData,
      id: number
    ): Promise<Supplement> => {
      const response = await api.update(`${SUPPLEMENTS}/${id}`, fromData);
      return response.data.body;
    },
    getSupplementById: async (id: number): Promise<Supplement> => {
      const response = await api.get(`${SUPPLEMENTS}/${id}`);
      return response.data.body;
    },
  };
}

export default apiSupplement();
