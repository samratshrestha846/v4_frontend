import { Alarm } from './alarm/alarm';
import { Device } from './device/device';
import { Property } from './property/propertyList';
import Region from './region/regionList';
import { UdoseSiteSupplement } from './udose/udoseSettings';
import {
  UdoseRecordFourHour,
  UdoseRecordHour,
  UdoseRecordTwentyFourHour,
} from './udose/udoseSummary';

type Nutridose = {
  alarm: number | null;
  battery_voltage: string;
  created_at: string;
  current_24h_water: number;
  dose: number;
  dosing_mode: number;
  id: number;
  last_24h_water: number;
  last_alarm: number;
  msg_original_date: string;
  nutrient_tank_capacity: number;
  nutrient_tank_level: number;
  site_id: number;
  skywave_message_id: number;
  status: number;
  tank_level_percent: number;
  temperature: number;
  trigger: number;
  updated_at: string;
};

type NutridoseWaterFlow = {
  date: string;
  id: number;
  last_24h_water: number;
  msg_original_date: string;
  site_id: number;
};

type SiteSetting = {
  board_firmware_day: number;
  board_firmware_month: number;
  board_firmware_year: number;
  conductivity_alarm_level: number;
  conductivity_probe_mode: number;
  conductivity_skip_level: number;
  conductivity_skip_limit: number;
  dose_runtime: number;
  dosing_mode: number;
  id: number;
  livestock_count: number;
  max_pump_runtime: number;
  message_date: string;
  ml_while_pump_off_alarm: number;
  nutrient_concentration: number;
  nutrient_meter_ppl: number;
  nutrient_probe_mode: number;
  nutrient_tank_capacity: number;
  nutrient_tank_current_level: number;
  nutrient_tank_height: number;
  recent_startup: number;
  site_id: number;
  supplement_id: number;
  supplement_name: string;
  target_dose: number;
  telemetry_major_version: number;
  telemetry_mode: number;
  trigger_point: number;
  water_flow_limit_per_hr: number;
  water_flow_unit: number;
  water_meter_ppl_or_lpp: number;
};

type UdoseRecordAlarm = {
  error_code: number;
  error_data: string;
  id: number;
  message_date: string;
  site_id: number;
  alarm_type?: Alarm;
};

export type SiteWaterFlowCheck = {
  status: boolean;
  message: string | null;
};

type Site = {
  bore_type: string | null;
  cage_serial_number: string | null;
  communicated_at: string;
  credit_type: string;
  credit_until: string;
  customer_property_id: number;
  device: Device | null;
  device_id: number | null;
  id: number;
  installation_type: string;
  is_alarmed: boolean;
  is_running: boolean;
  last_nutridose: Nutridose | null;
  last_udose_record_alarm: UdoseRecordAlarm | null;
  last_udose_record_four_hour: UdoseRecordFourHour | null;
  last_udose_record_hour: UdoseRecordHour | null;
  latitude: string | null;
  location_updated_at: string | null;
  longitude: string | null;
  name: string;
  nutridose_water_flow: NutridoseWaterFlow[] | [];
  region: Region | null;
  setting: SiteSetting | null;
  site_number: number | null;
  status: number;
  udose_record_twenty_four_hour: UdoseRecordTwentyFourHour[] | [];
  updated_at: string;
  alarm_type: Alarm;
  latest_udose_record_alarm: UdoseRecordAlarm | null;
  water_flow_check: SiteWaterFlowCheck;
  customer_property: Property;
  latest_setting: SiteSetting;
  nutrient_level: number;
  trailer_no?: string;
  site_supplement: UdoseSiteSupplement | null;
};

export type {
  Nutridose,
  NutridoseWaterFlow,
  SiteSetting,
  UdoseRecordAlarm,
  Site,
};
