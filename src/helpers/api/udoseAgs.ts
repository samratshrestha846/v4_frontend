import {
  UDOSE_AG_MESSAGE,
  READ_UDOSE_AG_SESSION_SUMMARY,
  UDOSE_AG_SESSION_SUMMARIES,
  UDOSE_AGS,
  FERTILIZER_ANALYSIS_BY_SESSION_RUN,
} from '../../constants/apiUrls';

import {
  UdoseAgDailyMessageResponse,
  UdoseAgMessageParams,
  UdoseAgs,
  UdoseAgSessionSummariesParams,
  UdoseAgSessionSummariesResponse,
  UdoseAgSessionArmedMessage,
  UdoseAgSessionEndOfRunMessage,
  UdoseAgSessionRunningVolume,
  UdoseAgSessionStartMessage,
  UdoseAgsFormValues,
  UdoseAgsQueryParams,
  UdoseAgSessionSummary,
  SessionSummaryFertilizerAnalysis,
  UdoseAgListResponse,
} from '../../types/udoseAgs/udoseAgs';
import { prepareDynamicUrl } from '../helpers';
import { APICore } from './apiCore';

function apiUdoseAgs() {
  const apiCore = new APICore();

  return {
    fetchUdoseAgs: async (
      params: UdoseAgsQueryParams
    ): Promise<UdoseAgListResponse> => {
      const response = await apiCore.get(UDOSE_AGS, params);
      return response.data;
    },

    createUdoseAg: async (formData: UdoseAgsFormValues): Promise<UdoseAgs> => {
      const response = await apiCore.create(UDOSE_AGS, formData);
      return response.data.body;
    },

    getUdoseAgById: async (id?: string): Promise<UdoseAgs> => {
      const response = await apiCore.get(`${UDOSE_AGS}/${id}`);
      return response.data.body;
    },

    updateUdoseAg: async (
      formData: UdoseAgsFormValues,
      id: string | undefined
    ): Promise<UdoseAgs> => {
      const response = await apiCore.update(`${UDOSE_AGS}/${id}`, formData);
      return response.data.data;
    },

    udoseAgSessionSummaries: async (
      id: string | undefined,
      params: UdoseAgSessionSummariesParams
    ): Promise<UdoseAgSessionSummariesResponse> => {
      const response = await apiCore.get(
        prepareDynamicUrl(UDOSE_AG_SESSION_SUMMARIES, id),
        params
      );
      return response.data;
    },

    fetchUdoseAgMessage: async (
      id: string | undefined,
      params: UdoseAgMessageParams
    ): Promise<UdoseAgDailyMessageResponse> => {
      const response = await apiCore.get(
        prepareDynamicUrl(UDOSE_AG_MESSAGE, id),
        params
      );
      return response.data;
    },

    readUdoseAgSessionSummary: async (
      id?: number
    ): Promise<UdoseAgSessionSummary> => {
      const response = await apiCore.get(
        prepareDynamicUrl(READ_UDOSE_AG_SESSION_SUMMARY, id)
      );
      return response.data.body;
    },

    fetchUdoseAgArmedMessages: async (
      udoseAgId?: number,
      sessionId?: number
    ): Promise<UdoseAgSessionArmedMessage> => {
      const response = await apiCore.get(
        `${UDOSE_AGS}/${udoseAgId}/armed-messages/${sessionId}`
      );
      return response.data.body;
    },

    fetchUdoseAgStartMessages: async (
      udoseAgId?: number,
      sessionId?: number
    ): Promise<UdoseAgSessionStartMessage> => {
      const response = await apiCore.get(
        `${UDOSE_AGS}/${udoseAgId}/start-messages/${sessionId}`
      );
      return response.data.body;
    },

    fetchUdoseAgEndOfRunMessages: async (
      udoseAgId?: number,
      sessionId?: number
    ): Promise<UdoseAgSessionEndOfRunMessage> => {
      const response = await apiCore.get(
        `${UDOSE_AGS}/${udoseAgId}/end-of-runs/${sessionId}`
      );
      return response.data.body;
    },

    fetchUdoseAgRunningVolumes: async (
      udoseAgId?: number,
      sessionId?: number
    ): Promise<UdoseAgSessionRunningVolume[]> => {
      const response = await apiCore.get(
        `${UDOSE_AGS}/${udoseAgId}/running-volumes/${sessionId}`
      );
      return response.data.body;
    },

    fetchFertilizerAnalysisBySessionSummary: async (
      sessionId?: number
    ): Promise<SessionSummaryFertilizerAnalysis> => {
      const response = await apiCore.get(
        prepareDynamicUrl(FERTILIZER_ANALYSIS_BY_SESSION_RUN, sessionId)
      );
      return response.data.body;
    },
  };
}

export default apiUdoseAgs();
