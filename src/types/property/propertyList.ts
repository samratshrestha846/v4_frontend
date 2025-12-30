import { Customer } from '../customer/customerList';
import { GeneralResponse } from '../generalResponse';
import Region from '../region/regionList';
import { Supplement } from '../supplements/supplement';
import { User } from '../user/user';
import { PropertyResponse } from './PropertyResponse';

type Optiweigh = {
  client_id: number | null;
  is_enable: boolean;
};

type CeresTagAlertNotificationSettings = {
  enable_alert_type_activity_threshold_none: boolean;
  enable_alert_type_activity_threshold_low: boolean;
  enable_alert_type_activity_threshold_high: boolean;
  enable_frequent_alert_type_activity_threshold_none: boolean;
  enable_frequent_alert_type_activity_threshold_low: boolean;
  enable_frequent_alert_type_activity_threshold_high: boolean;
  frequency_alert_type_activity_threshold_none: number | null;
  frequency_alert_type_activity_threshold_low: number | null;
  frequency_alert_type_activity_threshold_high: number | null;
};

type Settings = {
  optiweigh?: Optiweigh;
  ceres_tag?: CeresTagAlertNotificationSettings;
};

export type CustomerSubscription = {
  id: number;
  cost_per_ltr: number | string;
  is_active: number;
  supplement: Supplement;
};

export type LabelValueWithCost = {
  label: string;
  value: number;
  cost_per_ltr: number | string;
};

type Property = {
  id: number;
  name: string;
  customer_id?: number;
  business_name?: string;
  region_name?: string;
  region_state?: string;
  settings?: Settings;
  customer_property_managers?: User[];
  territory_managers?: User[];
  customer?: Customer;
  region?: Region;
  is_active: boolean;
  customer_subscriptions?: CustomerSubscription[];
};

type PropertyDropdownQueryParams = {
  customer_id?: number;
};

interface PropertyListResponse extends GeneralResponse<Property[]> {
  body: Property[];
}

interface PropertyDataResponse extends PropertyResponse<Property> {
  data: Property;
}

type PropertyList = {
  data: Property[];
};

type PropertyFormValues = {
  customer_id: number;
  name: string;
  region_id: number;
  settings?: Settings;
  agreed?: boolean;
};

export type {
  PropertyDropdownQueryParams,
  Property,
  PropertyListResponse,
  PropertyList,
  PropertyDataResponse,
  PropertyFormValues,
};
