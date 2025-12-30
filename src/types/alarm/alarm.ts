import { GeneralResponse } from '../generalResponse';

export type Alarm = {
  id: number;
  severity_level: string;
  alarm_code: number;
  description: string;
  actual_cause: string;
  possible_cause: string;
  potential_actions: string;
  can_auto_restart: number;
  status: number;
  ignorable_weight?: number;
  visible_to_customers: number;
};

export type alarmQueryParams = {
  page?: number;
  severity_level?: string;
  status?: number;
  visible_to_customers?: number;
};

export interface ListAlarmResponse extends GeneralResponse<Alarm> {
  body: Alarm[];
}

export type AlarmFormValues = {
  severity_level: string;
  alarm_code: number;
  description: string;
  potential_actions?: string;
  status: number;
  visible_to_customers: number;
};
