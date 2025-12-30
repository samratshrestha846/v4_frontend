import { Supplement } from '../supplements/supplement';

export type UdoseSiteTraceSupplement = {
  supplement_id: number;
  volume_in_liter: number;
  supplement?: Supplement;
};

export type UdoseSiteSupplement = {
  supplement_id: number;
  supplement?: Supplement;
  bulk_bag_weight_in_kg: number;
  final_solution_volume: number;
  nutrients: UdoseSiteTraceSupplement[];
};

type UdoseRecordSettings = {
  id: number;
  site_id: number;
  message_date: string;
  supplement_id: number;
  external_device_id: number;
  water_meter_ppl_or_lpp: number;
  nutrient_meter_ppl: number;
  dosing_mode: number;
  nutrient_probe_mode: number;
  conductivity_probe_mode: number;
  telemetry_mode: number;
  trigger_point: number;
  target_dose: number;
  dose_runtime: number;
  max_pump_runtime: number;
  ml_while_pump_off_alarm: number;
  nutrient_tank_capacity: number;
  nutrient_tank_height: number;
  nutrient_tank_current_level: number;
  conductivity_skip_level: number;
  conductivity_alarm_level: number;
  conductivity_skip_limit: number;
  nutrient_concentration: number;
  livestock_count: number;
  telemetry_major_version: number;
  board_firmware_year: number;
  board_firmware_month: number;
  board_firmware_day: number;
  water_flow_unit: string | null;
  water_flow_limit_per_hr: number;
  recent_startup: number;
  supplement_name: string;
  supplement: UdoseSiteSupplement | null;
};

export default UdoseRecordSettings;

export type UdoseSiteSupplementFormFields = {
  supplement_id: number;
  bulk_bag_weight_in_kg: number;
  final_solution_volume: number;
  nutrients: {
    supplement_id: number | undefined;
    volume_in_liter: number | undefined;
  }[];
};
