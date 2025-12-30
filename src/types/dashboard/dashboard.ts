type DashboardQueryParams = {
  page: number;
  search?: string;
  sort?: string;
  filter?: number;
  customer_property_id?: number;
  assigned_to_me?: boolean;
};

export default DashboardQueryParams;

type DashboardAnalyticsDailyRecords = {
  water_flow: number[];
  nutrient_flow: number[];
  date: string[];
};

export type DashboardAnalytics = {
  sites_count: number;
  alarmed_sites: number;
  stopped_sites: number;
  running_sites: number;
  customer_count: number;
  devices_count: number;
  properties_count: number;
  livestock_equivalent: number;
  total_water_flow: number;
  total_nutrient_flow: number;
  daily_records: DashboardAnalyticsDailyRecords;
};
