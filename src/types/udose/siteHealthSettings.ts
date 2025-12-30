type HealthSettingConfiguration = {
  checking_enabled: boolean;
  tank_level: boolean;
  tank_level_threshold: number | string;
  water_flow: boolean;
  water_flow_threshold_hours: number;

  water_leak: boolean;
  max_water_flow_limit: number | string;
  max_water_flow_limit_hrs: number | string;

  min_water_flow: boolean;
  min_water_flow_threshold: number | string;
};

type HealthCheckConfiguration = {
  id: number;
  site_id: number;
  checking_enabled: boolean;
  configuration: HealthSettingConfiguration;
  created_at?: string;
  updated_at?: string;
};

type SiteHealthSettings = {
  id: number;
  alarm_message?: string;
  health_check_configuration: HealthCheckConfiguration;
};

export type { HealthSettingConfiguration, SiteHealthSettings };
