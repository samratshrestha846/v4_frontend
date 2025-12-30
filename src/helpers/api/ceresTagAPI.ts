import {
  CERES_TAG_ALERTS,
  CERES_TAG_HERD_PFI_DAILY_SUMMARY,
  CERES_TAG_OBSERVATIONS,
  CERES_TAG_PFI_DAILY_SUMMARY,
  CERES_TAG_REQUEST_HISTORICAL_DATA,
  CERES_TAG_UPDATE_ANIMAL,
  CERES_TAGS,
  CERESTAG_OBSERVATIONS,
  CERESTAGS_BY_CUSTOMER_PROPERT_ID,
  EXPORT_CERES_TAG_OBSERVATIONS,
  OBSERVATIONS_BY_CERES_TAG,
  OBSERVATIONS_HISTORY_BY_CERES_TAG,
} from '../../constants/apiUrls';

import {
  CeresTag,
  CeresTagAlertQueryParams,
  CeresTagAlertsListResponse,
  CeresTagListResponse,
  CeresTagObservationParams,
  CeresTagObservationListResponse,
  CeresTagObservationQueryParams,
  CeresTagObservationsResponse,
  CeresTagPFIQueryParams,
  CeresTagPFISummary,
  CeresTagQueryParams,
  CeresTagHistoricalDataFormFields,
  CeresTagUpdateFormFields,
} from '../../types/ceresTag/ceresTag';
import { prepareDynamicUrl } from '../helpers';
import { APICore } from './apiCore';

function apiCeresTag() {
  const apiCore = new APICore();

  return {
    fetchCeresTagObservationData: async (
      params: CeresTagObservationParams
    ): Promise<any> => {
      const response = await apiCore.get(CERESTAG_OBSERVATIONS, params);
      return response.data.body;
    },

    fetchCeresTagsByCustomerPropertyId: async (
      params: CeresTagQueryParams,
      id: string | undefined
    ): Promise<CeresTagListResponse> => {
      const response = await apiCore.get(
        prepareDynamicUrl(CERESTAGS_BY_CUSTOMER_PROPERT_ID, id),
        params
      );
      return response.data;
    },

    fetchCeresTags: async (
      params: CeresTagQueryParams
    ): Promise<CeresTagListResponse> => {
      const response = await apiCore.get(CERES_TAGS, params);
      return response.data;
    },

    getCeresTagById: async (id: string | undefined): Promise<CeresTag> => {
      const response = await apiCore.get(`${CERES_TAGS}/${id}`);
      return response.data.body;
    },

    fetchObservations: async (
      params: CeresTagObservationQueryParams,
      id?: string
    ): Promise<CeresTagObservationListResponse> => {
      const response = await apiCore.get(
        prepareDynamicUrl(OBSERVATIONS_BY_CERES_TAG, id),
        params
      );
      return response.data;
    },

    fetchAlerts: async (
      params: CeresTagAlertQueryParams,
      id: string | undefined
    ): Promise<CeresTagAlertsListResponse> => {
      const response = await apiCore.get(
        prepareDynamicUrl(CERES_TAG_ALERTS, id),
        params
      );
      return response.data;
    },

    fetchDailyPFISummary: async (
      params: CeresTagPFIQueryParams,
      id: string | undefined
    ): Promise<CeresTagPFISummary[]> => {
      const response = await apiCore.get(
        prepareDynamicUrl(CERES_TAG_PFI_DAILY_SUMMARY, id),
        params
      );
      return response.data.body;
    },
    fetchDailyPFIHerdSummary: async (
      params: CeresTagPFIQueryParams,
      id: string | undefined
    ): Promise<CeresTagPFISummary[]> => {
      const response = await apiCore.get(
        prepareDynamicUrl(CERES_TAG_HERD_PFI_DAILY_SUMMARY, id),
        params
      );
      return response.data.body;
    },

    fetchCeresTagObservations: async (
      params: CeresTagObservationQueryParams
    ): Promise<CeresTagObservationsResponse> => {
      const response = await apiCore.get(CERES_TAG_OBSERVATIONS, params);
      return response.data.body;
    },

    requestHistoricalData: async (
      formData: CeresTagHistoricalDataFormFields,
      esn: string
    ): Promise<any> => {
      const response = await apiCore.create(
        prepareDynamicUrl(CERES_TAG_REQUEST_HISTORICAL_DATA, esn),
        formData
      );
      return response.data.data;
    },

    updateAnimalCeresTag: async (
      formData: CeresTagUpdateFormFields,
      id: string
    ): Promise<any> => {
      const response = await apiCore.updatePatch(
        prepareDynamicUrl(CERES_TAG_UPDATE_ANIMAL, id),
        formData
      );
      return response.data.data;
    },

    fetchHistoricalObservations: async (
      params: CeresTagObservationQueryParams,
      id?: string
    ): Promise<CeresTagObservationListResponse> => {
      const response = await apiCore.get(
        prepareDynamicUrl(OBSERVATIONS_HISTORY_BY_CERES_TAG, id),
        params
      );
      return response.data;
    },

    exportObservations: async (
      params: CeresTagObservationQueryParams,
      id?: string
    ): Promise<any> => {
      const response = await apiCore.getFile(
        prepareDynamicUrl(EXPORT_CERES_TAG_OBSERVATIONS, id),
        params
      );
      return response.data;
    },
  };
}

export default apiCeresTag();
