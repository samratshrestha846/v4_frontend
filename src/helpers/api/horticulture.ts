import {
  CROPS_BY_CROP_ID,
  CROP_LIFE_CYCLES,
  CROPS,
  CROP_LIFE_CYCLE_BY_ID,
} from '../../constants/apiUrls';

import {
  CropFormValues,
  Crop,
  CropsResponse,
  ListCropLifeCycleParams,
  ListCropsParams,
  CropLifeCycleResponse,
  CropLifeCycle,
  CropCycleFormValues,
} from '../../types/horticulture/horticulture';
import { prepareDynamicUrl } from '../helpers';
import { APICore } from './apiCore';

function apiHorticulture() {
  const apiCore = new APICore();
  return {
    fetchCrops: async (params: ListCropsParams): Promise<CropsResponse> => {
      const response = await apiCore.get(CROPS, params);
      return response.data;
    },

    getCropbyId: async (id: any): Promise<Crop> => {
      const response = await apiCore.get(
        prepareDynamicUrl(CROPS_BY_CROP_ID, id)
      );
      return response.data.body;
    },

    addCrop: async (formData: any): Promise<Crop> => {
      const response = await apiCore.create(CROPS, formData);
      return response.data.body;
    },

    updateCrop: async (id: any, formData: CropFormValues): Promise<Crop> => {
      const response = await apiCore.update(
        prepareDynamicUrl(CROPS_BY_CROP_ID, id),
        formData
      );
      return response.data.body;
    },

    getCropCycleList: async (
      params: ListCropLifeCycleParams
    ): Promise<CropLifeCycleResponse> => {
      const response = await apiCore.get(CROP_LIFE_CYCLES, params);
      return response.data;
    },

    getCropCyclebyId: async (id: any): Promise<CropLifeCycle> => {
      const response = await apiCore.get(
        prepareDynamicUrl(CROP_LIFE_CYCLE_BY_ID, id)
      );
      return response.data.body;
    },

    addCropCycle: async (
      formData: CropCycleFormValues
    ): Promise<CropLifeCycle> => {
      const response = await apiCore.create(CROP_LIFE_CYCLES, formData);
      return response.data.body;
    },

    updateCropCycle: async (
      id: any,
      formData: CropCycleFormValues
    ): Promise<CropLifeCycle> => {
      const response = await apiCore.update(
        prepareDynamicUrl(CROP_LIFE_CYCLE_BY_ID, id),
        formData
      );
      return response.data.body;
    },

    deleteCropCycle: async (id: number): Promise<any> => {
      const response = await apiCore.delete(
        prepareDynamicUrl(CROP_LIFE_CYCLE_BY_ID, id)
      );
      return response.data;
    },
  };
}

export default apiHorticulture();
