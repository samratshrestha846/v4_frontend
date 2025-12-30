import { QueryParam } from '@uhub/types/common';
import { GeneralResponse } from '@uhub/types/generalResponse';
import { StaffResponse } from '../../staff/types/Staff';

export type PolicyResponse = {
  id: number;
  title: string;
  file: string;
  created_at: string;
  updated_at: string;
  file_url: string;
  is_checked: boolean;
  staffs: StaffResponse[];
  yet_to_accept_policy: StaffResponse[];
};

export type PolicyFormProps = {
  id?: number;
  title: string | null;
  file?: string | null;
  file_url?: string | null;
  _method?: string;
};

export interface PolicyListResponse extends GeneralResponse<PolicyResponse[]> {
  data: PolicyResponse[];
}

export type PolicyParams = QueryParam & {};
