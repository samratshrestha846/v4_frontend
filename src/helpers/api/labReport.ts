import {
  DOWNLOAD_LAB_REPORT,
  LAB_REPORTS,
  PUBLISHED_LAB_REPORT_DETAIL,
  PUBLISHED_LAB_REPORTS,
  UNREAD_LAB_REPORT_NOTIFICATION,
} from '../../constants/apiUrls';
import {
  LabReportListResponse,
  LabReport,
  LabReportFormValues,
  LabReportQueryParams,
  LabReportPublishFormValues,
  LabReportNotificationCount,
} from '../../types/lab/labReport';
import { prepareDynamicUrl } from '../helpers';
import { APICore } from './apiCore';

function apiLabReport() {
  const api = new APICore();

  return {
    fetchLabReports: async (
      params: LabReportQueryParams
    ): Promise<LabReportListResponse> => {
      const response = await api.get(LAB_REPORTS, params);
      return response.data;
    },

    createLabReport: async (
      formData: LabReportFormValues
    ): Promise<LabReport> => {
      const response = await api.create(LAB_REPORTS, formData);
      return response.data.data;
    },

    getLabReportById: async (id: string | undefined): Promise<LabReport> => {
      const response = await api.get(`${LAB_REPORTS}/${id}`);
      return response.data.body;
    },

    updateLabReport: async (
      formData: LabReportFormValues,
      id: string | undefined
    ): Promise<LabReport> => {
      const response = await api.update(`${LAB_REPORTS}/${id}`, formData);
      return response.data.data;
    },

    publishLabReport: async (
      formData: LabReportPublishFormValues,
      id: string | undefined
    ): Promise<LabReport> => {
      const response = await api.updatePatch(`${LAB_REPORTS}/${id}`, formData);
      return response.data.data;
    },

    downloadLabReport: async (id?: number): Promise<any> => {
      const response = await api.get(
        prepareDynamicUrl(DOWNLOAD_LAB_REPORT, id),
        {
          responseType: 'blob',
        }
      );
      return response;
    },

    fetchPublishedLabReports: async (
      params: LabReportQueryParams
    ): Promise<LabReportListResponse> => {
      const response = await api.get(PUBLISHED_LAB_REPORTS, params);
      return response.data;
    },

    fetchPublishedLabReportDetail: async (
      id: string | undefined
    ): Promise<LabReport> => {
      const response = await api.get(
        prepareDynamicUrl(PUBLISHED_LAB_REPORT_DETAIL, id)
      );
      return response.data.body;
    },

    fetchNotificationCount: async (): Promise<LabReportNotificationCount> => {
      const response = await api.get(UNREAD_LAB_REPORT_NOTIFICATION);
      return response.data.body;
    },
  };
}

export default apiLabReport();
