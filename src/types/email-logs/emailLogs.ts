import { GeneralResponse } from '../generalResponse';

export type EmailLog = {
  id: number;
  recipient: string;
  subject: string;
  error_message: string;
  is_sent: boolean;
  status: string;
  sent_at: string;
  created_at: string;
  updated_at: string;
};

export type EmailLogsQueryParams = {
  page: number;
};

export interface EmailLogListResponse extends GeneralResponse<EmailLog[]> {
  body: EmailLog[];
}
