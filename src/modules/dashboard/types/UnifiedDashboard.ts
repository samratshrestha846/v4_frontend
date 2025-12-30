export type DashboardDeviceInfo = {
  installed: number;
  ready: number;
  others: number;
};

export type UnifiedDashboard = {
  customer_count: number;
  customer_property_count: number;
  device_info: DashboardDeviceInfo;
  installed: number;
  others: number;
  ready: number;
  number_live_stock: number;
  site_count: number;
  total_nutrient_flow: number;
  total_water_flow: number;
  udose_count: number;
};
