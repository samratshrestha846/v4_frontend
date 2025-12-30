import { LOGS } from '../../constants/apiUrls';
import { LogFilterParams, LogListResponse } from '../../types/log/logList';

import { APICore } from './apiCore';

function apiLogs() {
  const apiCore = new APICore();

  return {
    fetchLogs: async (params: LogFilterParams): Promise<LogListResponse> => {
      const response = await apiCore.get(LOGS, params);
      return response.data;
    },

    createLog: async (formData: FormData): Promise<any> => {
      const response = await apiCore.create(LOGS, formData);
      return response.data;
    },
  };
}

export default apiLogs();
