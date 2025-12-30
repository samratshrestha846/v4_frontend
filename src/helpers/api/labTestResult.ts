import { LAB_TEST_PARAMS, LAB_TEST_RESULTS } from '../../constants/apiUrls';
import {
  LabSample,
  LabSampleListResponse,
} from '../../types/lab/labSampleList';
import { LabTestParams } from '../../types/lab/labTestParams';
import { LabTestResult } from '../../types/lab/labTestResult';

import { APICore } from './apiCore';

function apiLabTestResult() {
  const apiCore = new APICore();

  return {
    createLabTestResult: async (
      formData: FormData
    ): Promise<LabSampleListResponse> => {
      const response = await apiCore.create(LAB_TEST_RESULTS, formData);
      return response.data;
    },

    getLabTestParamsByLabSampleTypeId: async (
      params: any
    ): Promise<LabTestParams[]> => {
      const response = await apiCore.get(LAB_TEST_PARAMS, params);
      return response.data.body;
    },

    getLabRestResultById: async (
      id: string | undefined
    ): Promise<LabTestResult> => {
      const response = await apiCore.get(`${LAB_TEST_RESULTS}/${id}`);
      return response.data.body;
    },

    updateLabTestResult: async (
      formData: LabTestResult,
      id: string | undefined
    ): Promise<LabTestResult> => {
      const response = await apiCore.update(
        `${LAB_TEST_RESULTS}/${id}`,
        formData
      );
      return response.data.data;
    },

    getLabTestResultByLabSampleById: async (
      id: string | undefined
    ): Promise<LabSample[]> => {
      const response = await apiCore.get(LAB_TEST_RESULTS, {
        lab_sample_id: id,
      });
      return response.data.body;
    },

    updatePatchLabResult: async (formData: any, id: string | number) => {
      const response = await apiCore.updatePatch(
        `${LAB_TEST_RESULTS}/${id}`,
        formData
      );
      return response.data.data;
    },
  };
}

export default apiLabTestResult();
