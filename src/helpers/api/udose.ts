import {
  EXPORT_UDOSE_LIST,
  SITES_FOLLOWUP,
  SERVICE_LOGS,
  SUPPLEMENTS_USAGE_SUMMARY,
  UDOSE_SITES,
  UDOSE_SITES_FOLLOWUP,
  UDOSE_SITE_SERVICE_LOGS,
  EXPORT_ASSET_USAGE_REPORT,
  UDOSE_STOP_REASONS,
  EXPORT_UDOSE_STOP_REASONS,
  UDOSE_SITE_SUPPLEMENTS,
} from '../../constants/apiUrls';
import {
  ServiceLog,
  ServiceLogFormValues,
  ServiceLogResponse,
} from '../../types/udose/serviceLog';
import {
  SiteFollowup,
  SiteFollowUpResponse,
} from '../../types/udose/siteFollowup';
import {
  SupplementUsageSummary,
  TestSiteQueryParams,
  Udose,
  UdoseFormFields,
  UdoseListResponse,
  UdoseQuery,
} from '../../types/udose/udoseList';
import {
  UdoseSiteSupplement,
  UdoseSiteSupplementFormFields,
} from '../../types/udose/udoseSettings';
import {
  UdoseStopReasonFilterParam,
  UdoseStopReasonResponse,
} from '../../types/udose/udoseStopReason';
import { prepareDynamicUrl } from '../helpers';
import { APICore } from './apiCore';

function apiUdose() {
  const apiCore = new APICore();

  return {
    fetchUdoses: async (
      params: UdoseQuery | TestSiteQueryParams
    ): Promise<UdoseListResponse> => {
      const response = await apiCore.get(UDOSE_SITES, params);
      return response.data;
    },

    exportUdoseList: async (params: any): Promise<Blob> => {
      const response = await apiCore.get(EXPORT_UDOSE_LIST, {
        ...params,
        responseType: 'blob',
      });
      return response.data;
    },

    createUdoseSite: async (formData: UdoseFormFields): Promise<Udose> => {
      const response = await apiCore.create(UDOSE_SITES, formData);
      return response.data.body;
    },

    getUdoseSiteById: async (id: string | undefined): Promise<Udose> => {
      const response = await apiCore.get(`${UDOSE_SITES}/${id}`);
      return response.data.body;
    },

    updateUdoseSite: async (
      formData: Udose,
      id: string | undefined
    ): Promise<UdoseFormFields> => {
      const response = await apiCore.update(`${UDOSE_SITES}/${id}`, formData);
      return response.data.body;
    },

    getSupplementUsageSummaryById: async (
      id: string | undefined
    ): Promise<SupplementUsageSummary> => {
      const response = await apiCore.get(
        prepareDynamicUrl(SUPPLEMENTS_USAGE_SUMMARY, id)
      );
      return response.data.body;
    },

    getUdoseSitesFollowup: async (
      id: string | undefined,
      params: any
    ): Promise<SiteFollowUpResponse> => {
      const response = await apiCore.get(
        prepareDynamicUrl(UDOSE_SITES_FOLLOWUP, id),
        params
      );
      return response.data;
    },

    getUdoseSitesFollowUpById: async (
      id: number | undefined,
      followUpId: number | undefined
    ): Promise<SiteFollowup> => {
      const response = await apiCore.get(
        `udose-sites/${id}/site-follow-ups/${followUpId}`
      );
      return response.data.body;
    },

    createUdoseSiteFollowup: async (formData: any): Promise<SiteFollowup> => {
      const response = await apiCore.create(SITES_FOLLOWUP, formData);
      return response.data.body;
    },

    updateUdoseSiteFollowup: async (
      id: number | undefined,
      formData: any
    ): Promise<SiteFollowup> => {
      const response = await apiCore.update(
        `${SITES_FOLLOWUP}/${id}`,
        formData
      );
      return response.data.body;
    },

    getServiceLogs: async (
      id: string | undefined,
      params: any
    ): Promise<ServiceLogResponse> => {
      const response = await apiCore.get(
        prepareDynamicUrl(UDOSE_SITE_SERVICE_LOGS, id),
        params
      );
      return response.data;
    },

    createUdoseSiteServiceLog: async (
      formData: ServiceLogFormValues
    ): Promise<ServiceLog> => {
      const response = await apiCore.create(SERVICE_LOGS, formData);
      return response.data.body;
    },

    updateSiteServiceLog: async (
      id: number | undefined,
      formData: ServiceLogFormValues
    ): Promise<ServiceLog> => {
      const response = await apiCore.update(`${SERVICE_LOGS}/${id}`, formData);
      return response.data.body;
    },

    exportAssetUsageReport: async (params: {
      report_date?: string;
    }): Promise<Blob> => {
      const response = await apiCore.get(EXPORT_ASSET_USAGE_REPORT, {
        ...params,
        responseType: 'blob',
      });
      return response.data;
    },

    fetchUdoseStopReasons: async (
      params: UdoseStopReasonFilterParam
    ): Promise<UdoseStopReasonResponse> => {
      const response = await apiCore.get(UDOSE_STOP_REASONS, params);
      return response.data;
    },

    exportUdoseStopReason: async (
      params?: UdoseStopReasonFilterParam
    ): Promise<Blob> => {
      const response = await apiCore.get(EXPORT_UDOSE_STOP_REASONS, {
        ...params,
        responseType: 'blob',
      });
      return response.data;
    },

    updateUdoseSiteSupplement: async (
      formData: UdoseSiteSupplementFormFields,
      id: number
    ): Promise<UdoseSiteSupplement> => {
      const response = await apiCore.create(
        prepareDynamicUrl(UDOSE_SITE_SUPPLEMENTS, id),
        formData
      );
      return response.data.body;
    },
  };
}

export default apiUdose();
