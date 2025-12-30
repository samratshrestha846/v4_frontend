import {
  CROPABLES,
  CROPABLES_BY_BLOCK,
  CROPABLES_BY_SUB_BLOCK,
} from '../../../constants/apiUrls';
import {
  Cropable,
  CropableFormValues,
} from '../../../types/horticulture/cropable';

import { prepareDynamicUrl } from '../../helpers';

import { APICore } from '../apiCore';

function apiCropable() {
  const api = new APICore();

  return {
    assignCropToBlock: async (
      fromData: CropableFormValues,
      blockId: number
    ): Promise<Cropable> => {
      const response = await api.create(
        prepareDynamicUrl(CROPABLES_BY_BLOCK, blockId),
        fromData
      );
      return response.data.body;
    },

    assignCropToSubBlock: async (
      fromData: CropableFormValues,
      subBlockId: number
    ): Promise<Cropable> => {
      const response = await api.create(
        prepareDynamicUrl(CROPABLES_BY_SUB_BLOCK, subBlockId),
        fromData
      );
      return response.data.body;
    },

    readCropableById: async (id?: number): Promise<Cropable> => {
      const response = await api.get(`${CROPABLES}/${id}`);
      return response.data.body;
    },

    updateCropable: async (
      fromData: CropableFormValues,
      id: number
    ): Promise<Cropable> => {
      const response = await api.update(`${CROPABLES}/${id}`, fromData);
      return response.data.body;
    },

    deleteCropable: async (id: number): Promise<any> => {
      const response = await api.delete(`${CROPABLES}/${id}`);
      return response.data;
    },
  };
}

export default apiCropable();
