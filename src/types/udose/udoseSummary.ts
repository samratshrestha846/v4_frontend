import { Site, SiteSetting } from '../site';

type UdoseSummaryFilterParams = {
  date_from: string;
  date_to: string;
};

type UdoseRecordHour = {
  id: number;
  site_id: number;
  water_flow: number;
  nutrient_flow: number;
  message_date: string;
  status_code: number;
  status_message: string;
};

type UdoseRecordFourHour = {
  id: number;
  site_id: number;
  message_date: string;
  highest_conductivity: number;
  lowest_conductivity: number;
  nutrient_tank_level: number;
  tank_level_percent: number;
};

type UdoseHealth = {
  id: number;
  site_id: number;
  battery_voltage: number;
  solar_voltage: number;
  message_date: Date;
};

type UdoseRecordSummary = {
  id: number;
  name: string;
  site_number: number;
  udose_record_hours: UdoseRecordHour[];
  udose_record_four_hours: UdoseRecordFourHour[];
  health: UdoseHealth[];
};

type UdoseDailySummaryRecord = {
  message_date: string;
  rainfall: null;
  water_flow: number;
  nutrient_flow: number;
  expected_nutrient_flow: number;
  on_target: number;
  pump_speed: number;
  dose_count: number;
  no_of_livestock: number;
  setting: {
    target_dose: number;
    trigger_point: number;
    livestock_count: number;
    supplement_name: string;
  };
};

type UdoseRecordTwentyFourHour = {
  id: number;
  message_date: string;
  nutrient_flow: number;
  site_id: number;
  water_flow: number;
  dose_count?: number;
  pump_runtime?: number | string;
  rainfall?: number;
  udose_record_setting_id?: number;
};

type UdoseRecordHourData = {
  hours: UdoseRecordHour[];
  site: Site;
};

type UdoseNutrientUsageData = {
  nutrient: UdoseRecordFourHour[];
  site: Site;
};

type UdoseBatterySolarVoltageData = {
  health: UdoseHealth[];
  site: Site;
};

type UdoseConductivityData = {
  conductivity: UdoseRecordFourHour[];
  setting: SiteSetting;
  site: Site;
};

export type {
  UdoseSummaryFilterParams,
  UdoseRecordSummary,
  UdoseRecordHour,
  UdoseRecordFourHour,
  UdoseHealth,
  UdoseDailySummaryRecord,
  UdoseRecordTwentyFourHour,
  UdoseRecordHourData,
  UdoseNutrientUsageData,
  UdoseBatterySolarVoltageData,
  UdoseConductivityData,
};
