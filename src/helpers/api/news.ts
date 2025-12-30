import { NEWS } from '../../constants/apiUrls';
import { Device } from '../../types/device/device';
import { News, NewsFilterParams, NewsFormFields } from '../../types/news';

import { APICore } from './apiCore';

function apiNews() {
  const apiCore = new APICore();

  return {
    fetchNewsList: async (params: NewsFilterParams): Promise<any> => {
      const response = await apiCore.get(NEWS, params);
      return response.data;
    },

    deleteNews: async (id: number | undefined): Promise<News> => {
      const response = await apiCore.delete(`${NEWS}/${id}`);
      return response.data.body;
    },

    createNews: async (formData: NewsFormFields): Promise<News> => {
      const response = await apiCore.createWithFile(NEWS, formData);
      return response.data.body;
    },

    getNewsById: async (id: number | undefined): Promise<News> => {
      const response = await apiCore.get(`${NEWS}/${id}`);
      return response.data.data;
    },

    updateNews: async (
      formData: NewsFormFields,
      id: number | undefined
    ): Promise<Device> => {
      const response = await apiCore.update(`${NEWS}/${id}`, formData);
      return response.data.body;
    },
  };
}

export default apiNews();
