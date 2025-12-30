import { TAGS } from '../../constants/apiUrls';
import {
  Tag,
  TagFormfields,
  TagQueryParams,
  TagResponse,
} from '../../types/tag';

import { APICore } from './apiCore';

function apiTag() {
  const apiCore = new APICore();

  return {
    fetchTags: async (params: TagQueryParams): Promise<TagResponse> => {
      const response = await apiCore.get(TAGS, params);
      return response.data;
    },

    createTag: async (formData: TagFormfields): Promise<Tag> => {
      const response = await apiCore.create(TAGS, formData);
      return response.data.body;
    },

    readTag: async (id?: number): Promise<Tag> => {
      const response = await apiCore.get(`${TAGS}/${id}`);
      return response.data.data;
    },

    updateTag: async (formData: TagFormfields, id: number): Promise<Tag> => {
      const response = await apiCore.update(`${TAGS}/${id}`, formData);
      return response.data.body;
    },
  };
}

export default apiTag();
