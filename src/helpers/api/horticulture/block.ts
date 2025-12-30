import {
  BLOCKS,
  BLOCKS_BY_PADDOCK,
  CROPABLES_BY_BLOCK,
} from '../../../constants/apiUrls';
import {
  Block,
  BlockFormValues,
  BlockPlantationHistoryResponse,
} from '../../../types/horticulture/block';

import { prepareDynamicUrl } from '../../helpers';

import { APICore } from '../apiCore';

function apiBlock() {
  const api = new APICore();

  return {
    listBlocksByPaddock: async (id: number): Promise<Block[]> => {
      const response = await api.get(prepareDynamicUrl(BLOCKS_BY_PADDOCK, id));
      return response.data.body;
    },

    createBlock: async (
      fromData: BlockFormValues,
      paddockId: number
    ): Promise<Block> => {
      const response = await api.create(
        prepareDynamicUrl(BLOCKS_BY_PADDOCK, paddockId),
        fromData
      );
      return response.data.body;
    },

    readBlockById: async (id?: number): Promise<Block> => {
      const response = await api.get(`${BLOCKS}/${id}`);
      return response.data.body;
    },

    updateBlock: async (
      fromData: BlockFormValues,
      id: number
    ): Promise<Block> => {
      const response = await api.update(`${BLOCKS}/${id}`, fromData);
      return response.data.body;
    },

    deleteBlock: async (id: number): Promise<Block> => {
      const response = await api.delete(`${BLOCKS}/${id}`);
      return response.data;
    },

    listPlantationHistoryByBlock: async (
      id: number
    ): Promise<BlockPlantationHistoryResponse> => {
      const response = await api.get(prepareDynamicUrl(CROPABLES_BY_BLOCK, id));
      return response.data;
    },
  };
}

export default apiBlock();
