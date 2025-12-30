import { Tag } from '../common';
import { GeneralResponse } from '../generalResponse';
import { Log } from '../log/logList';
import { DeviceConfiguration } from './deviceConfiguration';
import { StockType } from './stockType';

type Device = {
  id: number;
  serial_number: string;
  gateway_modem_number?: string;
  stock_type_id: number;
  stock_type_name: string;
  telemetry: string;
  device_configuration: DeviceConfiguration;
  stock_type_history: StockType[];
  tags: Tag[];
  latitude?: number;
  longitude?: number;
  location_updated_at?: string;
  site?: any;
  log?: Log[];
  doser_usage?: any;
  updated_at?: string;
  created_at?: string | Date;
  variant?: string;
  is_refurbished: boolean;
  has_telemetry: boolean;
  has_flow_meter: boolean;
};

type DeviceQueryParams = {
  page?: number;
  search?: string;
  config?: number;
  stock?: number;
  telemetry?: string;
  tag_ids?: string;
  as_of_date?: string;
};

type DeviceDropdownQueryParams = {
  action?: string;
  device_type?: string;
  device_id?: number;
  is_test_site?: boolean;
};

interface DeviceListResponse extends GeneralResponse<Device[]> {
  data: Device[];
}

type DoserUsages = {
  id: number;
  device_id: number;
  dose_count: number;
  pump_second: string;
  water_in_litre: number;
  nutrient_in_litre: number;
  created_at: string;
  updated_at: string;
};

type StockTypeInDeviceCount = {
  id: number;
  name: string;
  slug: string;
  status: number;
};

type DeviceCount = {
  device_count: number;
  stock_type_id: null | number;
  stock_type: null | StockTypeInDeviceCount;
};

interface DeviceCountResponse extends GeneralResponse<DeviceCount[]> {
  body: DeviceCount[];
}

export type DeviceFormFields = {
  device_configuration_id: number;
  gateway_modem_number?: string | null;
  tag_ids: any;
  telemetry?: string | null;
  variant?: string;
  is_refurbished: boolean;
  has_telemetry: boolean;
  has_flow_meter: boolean;
};

export type DeviceStockTypeUpdateFormFields = {
  remarks: string;
  stock_type_id: number;
};

export type {
  Device,
  DeviceQueryParams,
  DeviceListResponse,
  DoserUsages,
  DeviceDropdownQueryParams,
  DeviceCountResponse,
};

export type DoserCommunicationMessage = {
  variant: string;
  message: string;
  alarmedMessage: string;
  icon?: string;
  iconColorClass?: string;
  alarmSeverity?: {
    level?: string;
    bgColor?: string;
    iconColor?: string;
  };
};
