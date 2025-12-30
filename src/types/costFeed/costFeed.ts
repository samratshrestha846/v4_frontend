export type CalculateCostFeedFormFields = {
  dosing_rate: number;
  water_consumption: number;
  head_count: number;
  product: string;
};

export type FeedAnalysisData = {
  sulphur?: number;
  nitrogen?: number;
  phosphorus?: number;
  crude_protein?: number;
  urea_equivalent: number;
  iodine?: number;
  cobalt?: number;
  selenium?: number;
  dextrose?: number;
  copper?: number;
  zinc?: number;
  manganese?: number;
};

export type CostFeedAnalysis = {
  productName: string;
  actualNutrientConsumption: number;
  nutrientConsumptionPerHeadPerMonth: number;
  nutrientConsumptionPerMonth: number;
  quantityInBulkers: number;
  priceInBulkers: number;
  costPerMonth: number;
  costPerDayPerHead: number;
  feedAnalysis: FeedAnalysisData;
};
