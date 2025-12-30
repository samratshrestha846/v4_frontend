import { QueryParam } from '@uhub/types/common';
import { GeneralResponse } from '@uhub/types/generalResponse';

type Causer = {
  created_at: string;
  department: string;
  email: string;
  email_verified_at?: string;
  fcm_topic: string;
  id: number;
  mobile_number: string;
  name: string;
  position: string;
  role: string;
  status: string;
  uhub_user_id: number;
  updated_at: string;
};

type Subject = {
  id: number;
  title: string;
};

type Properties = {
  old: {
    status: string;
    updated_at: string;
  };
  attributes: {
    status: string;
    updated_at: string;
  };
};

export type ActivityLogResponse = {
  batch_uuid: string;
  causer: Causer;
  causer_id: number;
  causer_type: string;
  created_at: string;
  description: string;
  event: string;
  id: number;
  log_name: string;
  properties: Properties;
  subject_id: number;
  subject: Subject;
  subject_type: string;
  subject_title: string;
  updated_at: string;
};

export interface ActivityLogListResponse
  extends GeneralResponse<ActivityLogResponse[]> {
  data: ActivityLogResponse[];
}

export type ActivityLogParams = QueryParam & {};
