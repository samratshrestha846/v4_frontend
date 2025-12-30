import { Alarm } from '../alarm/alarm';
import { Device } from '../device/device';
import { GeneralResponse } from '../generalResponse';
import Location from '../location/locationList';
import { Property } from '../property/propertyList';
import Region from '../region/regionList';
import { UdoseSiteSupplement } from './udoseSettings';

type SiteSetting = {
  key: string;
  value: string;
};

type Udose = {
  id: number;
  name: string;
  site_number: string;
  is_alarmed: boolean;
  is_running: boolean;
  latest_setting: any;
  low_water_flow: boolean;
  nutrient_level: number;
  tank_run_out_days: number;
  alarm_message: string;
  cage_serial_number?: string;
  trailer_no?: string;
  communicated_at: string;
  communication_message: string;
  credit_type: string;
  credit_until: string;
  bore_type: string;
  device?: Device;
  status: number;
  customer_property?: Property;
  location?: Location;
  site_settings: SiteSetting[];
  region?: Region;
  site_supplement?: UdoseSiteSupplement | null;
  alarm_type: Alarm | null;
};

interface UdoseListResponse extends GeneralResponse<Udose[]> {
  body: Udose[];
}

type UdoseList = {
  data: Udose[];
};

type UdoseQuery = {
  page: number;
  search?: string;
};

type SupplementUsageSummary = {
  last_month_total: number;
  current_month_total: number;
  forecasted_month_end: number;
  percent_text: string;
};

type UdoseFormFields = {
  name: string;
  status: number;
  device_id: number;
  credit_type: string;
  credit_until: string | Date | undefined;
  bore_type: string;
  cage_serial_number?: string;
  trailer_no?: string;
  customer_property_id: number;
  site_settings: {
    key: string;
    value: string | number | undefined;
  }[];
};

type TestSiteQueryParams = {
  device_type: string;
  'filterable[status]': number;
};

export type {
  UdoseListResponse,
  UdoseList,
  UdoseQuery,
  Udose,
  SupplementUsageSummary,
  SiteSetting,
  UdoseFormFields,
  TestSiteQueryParams,
};
