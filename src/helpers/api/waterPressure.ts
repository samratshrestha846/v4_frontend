import { WATER_PRESSURE } from '../../constants/apiUrls';
import {
  WaterPressure,
  WaterPressureData,
  WaterPressureFormFields,
  WaterPressureQueryParams,
} from '../../types/waterPressure';

import { APICore } from './apiCore';

function apiWaterPressure() {
  const apiCore = new APICore();

  return {
    fetchWaterPressure: async (
      params: WaterPressureQueryParams
    ): Promise<WaterPressureData> => {
      const response = await apiCore.get(WATER_PRESSURE, params);
      return response.data.body?.[0];
    },

    createWaterPressure: async (
      formData: WaterPressureFormFields
    ): Promise<WaterPressure> => {
      const response = await apiCore.create(WATER_PRESSURE, formData);
      return response.data.body;
    },

    readWaterPressure: async (id?: number): Promise<WaterPressure> => {
      const response = await apiCore.get(`${WATER_PRESSURE}/${id}`);
      return response.data.body;
    },

    updateWaterPressure: async (
      formData: WaterPressureFormFields,
      id: number
    ): Promise<WaterPressure> => {
      const response = await apiCore.update(
        `${WATER_PRESSURE}/${id}`,
        formData
      );
      return response.data.body;
    },
  };
}

export default apiWaterPressure();
