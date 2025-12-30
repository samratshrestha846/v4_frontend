type DashboardCountKPI = {
  total_sites: number;
  avg_water_flow: number;
  avg_nutrient_flow: number;
  total_customer_properties: number;
};

type DashboardKPIUdoseSiteFilterParams = {
  as_of_date_from: string;
  as_of_date_to: string;
  credit_type?: string;
};

type DashboardKPIUdoseSite = {
  total_water_flow: string;
  total_nutrient_flow: string;
  total_alarmed_sites: number;
  total_alarms: number;
};

export type {
  DashboardCountKPI,
  DashboardKPIUdoseSite,
  DashboardKPIUdoseSiteFilterParams,
};
