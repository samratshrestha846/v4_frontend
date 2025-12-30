import { Customer } from '../customer/customerList';
import { Device } from '../device/device';
import { GeneralResponse } from '../generalResponse';
import { Block } from '../horticulture/block';
import { Fertilizer } from '../horticulture/fertilizer';
import { Paddock } from '../horticulture/paddock';
import { SubBlock } from '../horticulture/subBlock';
import { Property } from '../property/propertyList';

type UdoseAgs = {
  id: number;
  device_id: number;
  name: string;
  serial_number?: string;
  status: number;
  trailer_no: string;
  is_alarmed: boolean;
  is_running: boolean;
  communicated_at?: string;
  installed_at: string;
  customer_id: number;
  customer: Customer;
  device: Device;
};

type UdoseAgsQueryParams = {
  page?: number;
  search?: string;
  customer_id?: number;
  is_alarmed?: number;
  is_running?: number;
  status?: number;
};

type UdoseAgsFormValues = {
  name: string;
  customer_id: number;
  device_id: number;
  installed_at: Date | string;
  status: number;
  trailer_no: string;
};

type UdoseAgSessionSummariesParams = {
  page?: number;
  from_date?: string;
  to_date?: string;
};

type UDoseAgDailyMessage = {
  highest_battery_voltage?: string;
  highest_solar_voltage?: string;
  id?: number;
  latitude?: string;
  longitude?: string;
  lowest_battery_voltage?: string;
  message_date?: string;
  uptime_percent?: string;
};

interface UdoseAgDailyMessageResponse
  extends GeneralResponse<UDoseAgDailyMessage[]> {
  data: UDoseAgDailyMessage[];
}

type UdoseAgMessageParams = {
  page?: number;
  from_date?: string;
  to_date?: string;
};

type UdoseAgSessionArmedMessage = {
  id: number;
  session_id: number;
  message_date: string;
  minimum_flowrate: string;
  prefert_minutes: string;
  prefert_units: string;
  prefert_volume: string;
  fertigation_duration_minutes: string;
  fertigation_volume_litres: string;
  created_at: string;
};

type UdoseAgSessionStartMessage = {
  id: number;
  udose_ag_id: number;
  session_id: number;
  message_date: string;
  latitude: string;
  longitude: string;
  current_tank_pressure: string;
  current_battery_voltage: string;
  fertigation_run: null | number;
};

type UdoseAgSessionRunningVolume = {
  id: number;
  udose_ag_id: number;
  session_id: number;
  message_date: string;
  water_flow: number;
  fertiliser_flow: number;
  max_pressure_in_20bins: number;
};

type UdoseAgSessionEndOfRunMessage = {
  id: number;
  udose_ag_id: number;
  session_id: number;
  message_date: string;
  prefertigation_litres_water: number;
  fertigation_litres_water: number;
  post_fertigation_litres_water: number;
  fertigation_litres_fertiliser: number;
  stop_reason: string;
  final_tank_pressure: string;
  final_battery_voltage: string;
  total_run_battery_amp_hours: string;
};

type UdoseAgSessionSummary = {
  id: number;
  session_id: number;
  fertiliser_flow: number;
  started_at: string;
  ended_at: string;
  status: string;
  udose_ag: UdoseAgs;
  udose_ag_id: number;
  water_flow: number;
  armed_messages?: UdoseAgSessionArmedMessage[];
  block?: Block;
  customer_property?: Property;
  fertilizer?: Fertilizer;
  paddock?: Paddock;
  running_volumes?: UdoseAgSessionRunningVolume[];
  session_end?: UdoseAgSessionEndOfRunMessage;
  session_start?: UdoseAgSessionStartMessage;
  sub_block?: SubBlock;
};

interface UdoseAgSessionSummariesResponse
  extends GeneralResponse<UdoseAgSessionSummary[]> {
  body: UdoseAgSessionSummary[];
}

export type {
  UdoseAgs,
  UdoseAgsQueryParams,
  UdoseAgsFormValues,
  UdoseAgSessionSummariesParams,
  UdoseAgSessionSummary,
  UdoseAgSessionSummariesResponse,
  UdoseAgMessageParams,
  UDoseAgDailyMessage,
  UdoseAgDailyMessageResponse,
  UdoseAgSessionArmedMessage,
  UdoseAgSessionStartMessage,
  UdoseAgSessionRunningVolume,
  UdoseAgSessionEndOfRunMessage,
};

export type AssignAreaAndFertilizerFormFields = {
  customer_property_id: number;
  paddock_id: number;
  block_id: number;
  sub_block_id: number;
  fertilizer_id: number;
};

export type SessionSummaryFertilizerAnalysisPerHectare = {
  fertilizer_per_hectare: number;
  breakdown: Record<string, number>;
};

export type SessionSummaryFertilizerAnalysisPerHectarePerPlant = {
  fertilizer_per_plant: number;
  breakdown: Record<string, number>;
};

export type SessionSummaryFertilizerAnalysis = {
  fertilizer_name: string | null;
  fertiliser_flow: number | null;
  fertilizer_in_grams: number | null;
  fertilizer_composition: Record<string, number> | null;
  hectare: SessionSummaryFertilizerAnalysisPerHectare | null;
  plant: SessionSummaryFertilizerAnalysisPerHectarePerPlant | null;
};

export interface UdoseAgListResponse extends GeneralResponse<UdoseAgs[]> {
  body: UdoseAgs[];
}
