export type DailyAverageSupplementIntake = {
  avg_daily_intake: number;
  supplement_name: string;
};

export type CostNutrientData = {
  daily_avg_cost_per_head: number;
  daily_avg_nutrient_consumption: Record<string, number>;
  daily_avg_supplement_intake: DailyAverageSupplementIntake[];
};

export type CountData = {
  alarmed_sites: number;
  running_sites: number;
  stopped_sites: number;
  total_sites: number;
  livestock_equivalent: number;
};

type PropertyDashboardAnalytics = {
  costNutrientData?: CostNutrientData;
  countData?: CountData;
};

export default PropertyDashboardAnalytics;

export type FilterByPropertyQueryParams = {
  customer_property_id?: number;
};
