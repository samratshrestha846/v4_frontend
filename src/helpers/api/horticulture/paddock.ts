import { PADDOCKS } from '../../../constants/apiUrls';

import {
  Paddock,
  PaddockFormValues,
  PaddockListResponse,
  PaddockQueryParams,
} from '../../../types/horticulture/paddock';
import { APICore } from '../apiCore';

function apiPaddock() {
  const api = new APICore();

  return {
    fetchPaddocks: async (
      params: PaddockQueryParams
    ): Promise<PaddockListResponse> => {
      const response = await api.get(PADDOCKS, params);
      return response.data;
    },

    createPaddock: async (formData: PaddockFormValues): Promise<Paddock> => {
      const response = await api.create(PADDOCKS, formData);
      return response.data.data;
    },

    getPaddockById: async (id: number | undefined): Promise<Paddock> => {
      const response = await api.get(`${PADDOCKS}/${id}`);
      return response.data.body;
    },

    updatePaddock: async (
      formData: PaddockFormValues,
      id: string | undefined
    ): Promise<Paddock> => {
      const response = await api.update(`${PADDOCKS}/${id}`, formData);
      return response.data.data;
    },

    deletePaddock: async (id: number): Promise<any> => {
      const response = await api.delete(`${PADDOCKS}/${id}`);
      return response.data;
    },
  };
}

export default apiPaddock();
