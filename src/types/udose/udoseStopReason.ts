import { GeneralResponse } from '../generalResponse';
import { User } from '../user/user';

export type UdoseStopReason = {
  id: number;
  site_id: number;
  user_id?: number;
  reason: string;
  notes: string;
  status: string;
  command_sent_at: string;
  acknowledge_at?: string;
  created_at: string;
  performed_by?: User;
};

export type UdoseStopReasonFilterParam = {
  site_id?: number;
  customer_property_id?: number;
  customer_id?: number;
  page?: number;
  page_size?: number;
  sort?: string;
  direction?: string;
};

export interface UdoseStopReasonResponse
  extends GeneralResponse<UdoseStopReason> {
  body: UdoseStopReason[];
}
