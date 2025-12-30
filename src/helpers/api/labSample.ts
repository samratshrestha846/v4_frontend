import {
  LAB_SAMPLES,
  EXPORT_LAB_TEST_REPORT,
  UPDATE_LAB_SAMPLE,
} from '../../constants/apiUrls';
import {
  LabSample,
  LabSampleFormValues,
  LabSampleListResponse,
  LabSampleQuery,
} from '../../types/lab/labSampleList';
import { prepareDynamicUrl } from '../helpers';

import { APICore } from './apiCore';

function apiLabSample() {
  const apiCore = new APICore();

  return {
    fetchLabSamples: async (
      params: LabSampleQuery
    ): Promise<LabSampleListResponse> => {
      const response = await apiCore.get(LAB_SAMPLES, params);
      return response.data;
    },

    getLabSampleById: async (id: string | undefined): Promise<LabSample> => {
      const response = await apiCore.get(`${LAB_SAMPLES}/${id}`);
      return response.data.body;
    },

    createLabSample: async (
      formData: LabSampleFormValues
    ): Promise<LabSample> => {
      const response = await apiCore.createWithFile(LAB_SAMPLES, formData);
      return response.data.data;
    },

    updateLabSample: async (
      formData: any,
      id: string | undefined
    ): Promise<LabSample> => {
      const response = await apiCore.createWithFile(
        prepareDynamicUrl(UPDATE_LAB_SAMPLE, id),
        formData
      );
      return response.data.data;
    },

    exportLabSampleReport: async (
      params: LabSampleQuery | null
    ): Promise<Blob> => {
      const response = await apiCore.get(EXPORT_LAB_TEST_REPORT, {
        ...params,
        responseType: 'blob',
      });
      return response.data;
    },
  };
}

export default apiLabSample();
