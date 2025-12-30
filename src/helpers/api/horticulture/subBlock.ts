import {
  CROPABLES_BY_SUB_BLOCK,
  SUB_BLOCKS,
  SUB_BLOCKS_BY_BLOCK,
} from '../../../constants/apiUrls';
import {
  SubBlock,
  SubBlockFormValues,
  SubBlockPlantationHistoryResponse,
} from '../../../types/horticulture/subBlock';

import { prepareDynamicUrl } from '../../helpers';

import { APICore } from '../apiCore';

function apiSubBlock() {
  const api = new APICore();

  return {
    listSubBlocksByBlock: async (id: number): Promise<SubBlock[]> => {
      const response = await api.get(
        prepareDynamicUrl(SUB_BLOCKS_BY_BLOCK, id)
      );
      return response.data.body;
    },

    createSubBlock: async (
      fromData: SubBlockFormValues,
      id: number
    ): Promise<SubBlock> => {
      const response = await api.create(
        prepareDynamicUrl(SUB_BLOCKS_BY_BLOCK, id),
        fromData
      );
      return response.data.body;
    },

    updateSubBlock: async (
      fromData: SubBlockFormValues,
      id: number
    ): Promise<SubBlock> => {
      const response = await api.update(`${SUB_BLOCKS}/${id}`, fromData);
      return response.data.body;
    },

    readSubBlockById: async (id?: number): Promise<SubBlock> => {
      const response = await api.get(`${SUB_BLOCKS}/${id}`);
      return response.data.body;
    },

    listPlantationHistoryBySubBlock: async (
      id: number
    ): Promise<SubBlockPlantationHistoryResponse> => {
      const response = await api.get(
        prepareDynamicUrl(CROPABLES_BY_SUB_BLOCK, id)
      );
      return response.data;
    },
  };
}

export default apiSubBlock();
