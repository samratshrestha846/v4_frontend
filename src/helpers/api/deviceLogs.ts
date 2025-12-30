import { DEVICE_LOGS } from '../../constants/apiUrls';
import {
  DeviceLogListResponse,
  DeviceLogQueryParams,
} from '../../types/device/deviceLogs';

import { APICore } from './apiCore';

function apiDeviceLogs() {
  const api = new APICore();

  return {
    listDeviceLogs: async (
      params: DeviceLogQueryParams
    ): Promise<DeviceLogListResponse> => {
      const response = await api.get(DEVICE_LOGS, params);
      return response.data;
    },
  };
}

export default apiDeviceLogs();
