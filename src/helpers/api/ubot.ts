import {
  UBOT_CUMULATIVE_RAINFALL,
  UBOT_HOURLY_RAINFALL,
  UBOT_RECORD_SUMMARY,
  UBOT_SITES,
} from '../../constants/apiUrls';
import { DurationQueryFilterParams } from '../../types/common';
import {
  CumulativeRainfallRecord,
  HourlyRainfallRecord,
  UbotSite,
  UbotSiteList,
  UbotSiteQueryParams,
  UbotSummaryRecord,
} from '../../types/ubot';
import { prepareDynamicUrl } from '../helpers';

import { APICore } from './apiCore';

function apiUbot() {
  const apiCore = new APICore();

  return {
    fetchUbotSites: async (
      params: UbotSiteQueryParams
    ): Promise<UbotSiteList> => {
      const response = await apiCore.get(UBOT_SITES, params);
      return response.data;
    },

    createUbotSite: async (formData: UbotSite): Promise<UbotSite> => {
      const response = await apiCore.create(UBOT_SITES, formData);
      return response.data.body;
    },

    getUbotSiteById: async (id: string | undefined): Promise<UbotSite> => {
      const response = await apiCore.get(`${UBOT_SITES}/${id}`);
      return response.data.body;
    },

    updateUbotSite: async (
      formData: UbotSite,
      id: string | undefined
    ): Promise<UbotSite> => {
      const response = await apiCore.update(`${UBOT_SITES}/${id}`, formData);
      return response.data.body;
    },

    getUbotRecordSummaryById: async (
      id: string | undefined,
      params: DurationQueryFilterParams | null
    ): Promise<UbotSummaryRecord[]> => {
      const response = await apiCore.get(
        prepareDynamicUrl(UBOT_RECORD_SUMMARY, id),
        params
      );
      return response.data.body;
    },

    getCumulativeRainfallById: async (
      id: string | undefined,
      params: DurationQueryFilterParams | null
    ): Promise<CumulativeRainfallRecord[]> => {
      const response = await apiCore.get(
        prepareDynamicUrl(UBOT_CUMULATIVE_RAINFALL, id),
        params
      );
      return response.data.body;
    },

    getHourlyRainfallById: async (
      id: string | undefined,
      params: DurationQueryFilterParams | null
    ): Promise<HourlyRainfallRecord[]> => {
      const response = await apiCore.get(
        prepareDynamicUrl(UBOT_HOURLY_RAINFALL, id),
        params
      );
      return response.data.body;
    },
  };
}

export default apiUbot();
