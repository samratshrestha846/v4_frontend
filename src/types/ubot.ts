import { StatusUpdatedBy } from './common';
import { GeneralResponse } from './generalResponse';
import { Property } from './property/propertyList';

type UbotSiteQueryParams = {
  page: number;
  customer_id?: number;
  customer_property_id?: number;
  status?: number;
  search?: string;
  sort?: string;
  direction?: string;
};

type TankSetting = {
  id: number;
  site_id: number;
  tank_height: number;
  tank_capacity?: number;
  density: number;
};

type UbotHourRecord = {
  id: number;
  site_id: number;
  pressure_reading: number;
  tank_level: number;
  battery_voltage: number;
  solar_voltage: number;
  rainfall: number;
  message_date: string;
};

type DeviceStockType = {
  stock_type_name: string | null;
  status_updated_by: StatusUpdatedBy;
  remarks: string;
  created_at: string;
};

type UbotSite = {
  id: number;
  name: string;
  device_id: number;
  customer_property_id: number;
  customer_property?: Property | null;
  site_number: number | null;
  communicated_at: string | null;
  latitude: string | null;
  longitude: string | null;
  device: { id: number; serial_number: string } | null;
  tank_setting: TankSetting | null;
  ubot_record_hours?: UbotHourRecord[];
  latest_ubot_record_hour?: UbotHourRecord;
  device_stock_type: DeviceStockType | null;
  status?: number;
  credit_type: string;
};

interface UbotSiteList extends GeneralResponse<UbotSite[]> {
  body: UbotSite[];
}

type TankLevelOption = {
  level: number;
  d: string;
  textHeight: string;
};

type UbotSummaryRecord = {
  id: number;
  site_id: number;
  pressure_reading: number;
  tank_level: number;
  battery_voltage: number;
  solar_voltage: number;
  rainfall: number;
  message_date: string;
};

type CumulativeRainfallRecord = {
  id: number;
  rainfall: number;
  date: string;
};

type HourlyRainfallRecord = {
  id: number;
  rainfall: number;
  message_date: string;
};

type UbotFormFields = {
  name: string;
  status: number;
  device_id: number;
  credit_type: string;
  customer_property_id: number;
  tank_height: number;
  density: number;
  tank_capacity?: number;
};

export type {
  UbotSiteQueryParams,
  UbotSite,
  UbotSiteList,
  TankLevelOption,
  UbotSummaryRecord,
  CumulativeRainfallRecord,
  HourlyRainfallRecord,
  UbotFormFields,
};
