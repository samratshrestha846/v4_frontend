import { TRANSPORT_EMISSIONS } from '../../constants/apiUrls';
import {
  TransportEmission,
  TransportEmissionFormFields,
  TransportEmissionQueryParams,
  TransportEmissionResponse,
} from '../../types/transportEmission';

import { APICore } from './apiCore';

function apiTransportEmission() {
  const apiCore = new APICore();

  return {
    fetchTransportEmissions: async (
      params: TransportEmissionQueryParams
    ): Promise<TransportEmissionResponse> => {
      const response = await apiCore.get(TRANSPORT_EMISSIONS, params);
      return response.data;
    },

    createTransportEmission: async (
      formData: TransportEmissionFormFields
    ): Promise<TransportEmission> => {
      const response = await apiCore.create(TRANSPORT_EMISSIONS, formData);
      return response.data.body;
    },

    updateTransportEmission: async (
      formData: TransportEmissionFormFields,
      id: number
    ): Promise<TransportEmission> => {
      const response = await apiCore.update(
        `${TRANSPORT_EMISSIONS}/${id}`,
        formData
      );
      return response.data.body;
    },
  };
}

export default apiTransportEmission();
