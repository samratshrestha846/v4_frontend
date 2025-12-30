type SiteAlarmFilterParams = {
  date_from?: Date | null | string;
  date_to?: Date | null | string;
};

type SiteAlarmSetting = {
  conductivity_alarm_level: number;
  conductivity_skip_limit: number;
  conductivity_skip_level: number;
  water_flow_limit_per_hr: number;
  supplement_name: string | null;
};

type SiteAlarm = {
  id: number;
  site_id: number;
  error_code: number;
  error_data: string | number;
  message_date: string;
  setting: SiteAlarmSetting;
};

export type { SiteAlarmFilterParams, SiteAlarmSetting, SiteAlarm };
