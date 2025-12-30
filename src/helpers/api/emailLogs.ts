import { EMAIL_LOGS } from '../../constants/apiUrls';

import {
  EmailLogListResponse,
  EmailLogsQueryParams,
} from '../../types/email-logs/emailLogs';
import { APICore } from './apiCore';

function apiEmailLogs() {
  const api = new APICore();

  return {
    listDeviceLogs: async (
      params: EmailLogsQueryParams
    ): Promise<EmailLogListResponse> => {
      const response = await api.get(EMAIL_LOGS, params);
      return response.data;
    },
  };
}

export default apiEmailLogs();
