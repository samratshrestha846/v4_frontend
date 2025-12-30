import { GeneralResponse } from '../generalResponse';

type Log = {
  id: number;
  message: string | null;
  model: any;
  model_id: number;
  model_type: string;
  new_value: any;
  old_value: any;
  type: string;
  user_id: number;
  user: {
    id: number;
    first_name: string;
    last_name: string;
    profile_picture_url?: string;
  };
  description: string;
  created_at: string;
  updated_at: string;
};

type LogFilterParams = {
  model_type?: string;
  model_id?: string;
  type?: string;
  user_id?: number;
  page?: number;
  search?: string;
  page_size?: number;
  limit?: number;
};

export type { Log, LogFilterParams };

export type UdoseSiteLogFormFields = {
  model_type: string;
  model_id: number;
  type: string;
  description: string;
};

export interface LogListResponse extends GeneralResponse<Log[]> {
  body: Log[];
}
