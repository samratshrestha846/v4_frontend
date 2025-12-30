import {
  EXPORT_UDOSE_REPORT,
  EXPORT_DEVICE_NEW_INSTALLED_REPORT,
  EXPORT_DEVICE_SWAPPED_REPORT,
  EXPORT_UDOSE_REPORT_CHECK_PROGRESS,
} from '../../constants/apiUrls';

import ExportDeviceParams from '../../types/report/device';
import {
  UdoseExportReport,
  UdoseExportReportCheckProgress,
} from '../../types/report/udoseReport';
import { prepareDynamicUrl } from '../helpers';

import { APICore } from './apiCore';

function apiReport() {
  const apiCore = new APICore();

  return {
    exportUdoseReport: async (params: any): Promise<UdoseExportReport> => {
      const response = await apiCore.get(EXPORT_UDOSE_REPORT, params);
      return response.data.body;
    },

    exportDeviceNewInstalled: async (
      params: ExportDeviceParams
    ): Promise<any> => {
      const response = await apiCore.getFile(
        EXPORT_DEVICE_NEW_INSTALLED_REPORT,
        params
      );
      return response.data;
    },

    exportDeviceSwappedReport: async (
      params: ExportDeviceParams
    ): Promise<any> => {
      const response = await apiCore.getFile(
        EXPORT_DEVICE_SWAPPED_REPORT,
        params
      );
      return response.data;
    },

    checkUdoseReportProgress: async (
      batchId?: string
    ): Promise<UdoseExportReportCheckProgress> => {
      const response = await apiCore.get(
        prepareDynamicUrl(EXPORT_UDOSE_REPORT_CHECK_PROGRESS, batchId)
      );
      return response.data.body;
    },
  };
}

export default apiReport();
