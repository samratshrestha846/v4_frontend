type Location = {
  id: number;
  site_id: number;
  device_id: number;
  action: string;
  latitude: number | null;
  longitude: number | null;
  msg_original_date: string;
};

type SiteLocationFilterParams = {
  customer_property_id?: string;
};

export default Location;

export type { SiteLocationFilterParams };
