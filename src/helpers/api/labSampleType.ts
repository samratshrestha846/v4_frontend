import { LAB_SAMPLE_TYPES } from '../../constants/apiUrls';
import { LabSampleType } from '../../types/lab/labSampleType';

import { APICore } from './apiCore';

function apiLabSampleType() {
  const apiCore = new APICore();

  return {
    getLabSampleTypeById: async (id: number): Promise<LabSampleType> => {
      const response = await apiCore.get(`${LAB_SAMPLE_TYPES}/${id}`);
      return response.data.body;
    },
  };
}

export default apiLabSampleType();
