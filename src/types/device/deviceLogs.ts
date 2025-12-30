import { Customer } from '../customer/customerList';
import { GeneralResponse } from '../generalResponse';
import { Property } from '../property/propertyList';
import { Site } from '../site';
import { User } from '../user/user';
import { Device } from './device';

export type DeviceLog = {
  site_id: number;
  action: string;
  latitude?: string | number;
  longitude?: string | number;
  device_id: number | null;
  updated_at: string;
  site?: Site | null;
  device?: Device | null;
  customer_property?: Property | null;
  customer?: Customer | null;
  performer?: User | null;
};

export type DeviceLogQueryParams = {
  page: number;
  search?: string;
  sort_by?: string;
  sort_direction?: string;
  device_id?: number;
  site_id?: number;
  action_type?: string;
  date_from?: string;
  date_to?: string;
};

export interface DeviceLogListResponse extends GeneralResponse<DeviceLog[]> {
  body: DeviceLog[];
}
