type CarbonCreditSummary = {
  total: number;
  last_six_months: number;
  last_three_months: number;
  last_month: number;
  last_seven_days: number;
  baseline_emission_in_last_seven_days: number;
  project_emission_in_last_seven_days: number;
};

type CarbonCreditSummaryData = {
  key: string;
  label: string;
  credit: number;
  class?: string;
};

export type { CarbonCreditSummary, CarbonCreditSummaryData };
