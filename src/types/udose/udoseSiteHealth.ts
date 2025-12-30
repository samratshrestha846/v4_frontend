import { HealthSettingConfiguration } from './siteHealthSettings';

export type WaterFlowCheck = {
  status: boolean;
  message: string;
};

export type UdoseSiteHealthCheckResult = {
  id: number;
  site_id: number;
  health_status: string;
  health_message: string[];
  created_at: string;
  updated_at: string;
};

export type UdoseSiteHealth = {
  id: number;
  water_flow_check: WaterFlowCheck | null;
  latest_site_health_check_result: UdoseSiteHealthCheckResult;
  health_check_configuration: HealthSettingConfiguration;
};

export default UdoseSiteHealth;
