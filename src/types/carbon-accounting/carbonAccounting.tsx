import { GeneralResponse } from '../generalResponse';
import { Supplement } from '../supplements/supplement';

export type CarbonTopPerformerSites = {
  site_id: number;
  total_actual_emission: string;
  supplement_feed_in_ml: number;
  total_project_emission: number;
  total_baseline_emission: number;
  trendItem: {
    site_id: number;
    total_actual_emission: string;
    supplement_feed_in_ml: number;
    total_project_emission: number;
    total_baseline_emission: number;
  };
  supplements?: Supplement[];
  site: {
    id: number;
    name: string;
    customer_property_id: number;
    customer_property: {
      id: number;
      name: string;
      customer: {
        id: number;
        business_name: string;
      };
    };
  };
};

export type CarbonTopPerformerCustomer = {
  customer_id: number;
  total_actual_emission: string;
  supplement_feed_in_ml: number;
  total_project_emission: number;
  total_baseline_emission: number;
  trendItem: {
    site_id: number;
    total_actual_emission: string;
    supplement_feed_in_ml: number;
    total_project_emission: number;
    total_baseline_emission: number;
  };
  supplements?: Supplement[];
  customer: {
    id: number;
    business_name: string;
    customer_property_count: number;
  };
};

export type CarbonTopPerformerProperties = {
  customer_property_id: number;
  total_actual_emission: string;
  supplement_feed_in_ml: number;
  total_project_emission: number;
  total_baseline_emission: number;
  trendItem: {
    site_id: number;
    total_actual_emission: string;
    supplement_feed_in_ml: number;
    total_project_emission: number;
    total_baseline_emission: number;
  };
  supplements?: Supplement[];
  customer_property: {
    id: number;
    name: string;
    sites_count: number;
    customer: {
      id: number;
      business_name: string;
    };
  };
};

export type CarbonTopPerformerQueryParameters = {
  page?: number;
  page_size?: number;
  customer_id?: number;
  customer_property_id?: number;
  date_from?: string;
  date_to?: string;
  sort_by?: string;
  sort_direction?: string;
};

export interface ListCarbonTopPerformerSitesResponse
  extends GeneralResponse<CarbonTopPerformerSites> {
  body: CarbonTopPerformerSites[];
}

export interface ListCarbonTopPerformerPropertiesResponse
  extends GeneralResponse<CarbonTopPerformerProperties> {
  body: CarbonTopPerformerProperties[];
}

export interface ListCarbonTopPerformerCustomerResponse
  extends GeneralResponse<CarbonTopPerformerCustomer> {
  body: CarbonTopPerformerCustomer[];
}

export type CarbonEmissionReduction = {
  total_actual_emission: number;
  supplement_feed_in_ml: number;
  total_project_emission: number;
  total_baseline_emission: number;
  site_count: number;
  customer_property_count: number;
  customer_count: number;
  supplements: Supplement[];
  carbon_credit_claim: number;
};

export type CarbonEmissionReductionSummary = {
  total_actual_emission: number;
  supplement_feed_in_ml: number | null;
  total_project_emission: number | null;
  total_baseline_emission: number | null;
  date_from: string;
  date_to: string;
  site_count: number;
  customer_property_count: number;
  customer_count: number;
  trend_values: {
    total_actual_emission: number | null;
    supplement_feed_in_ml: number | null;
    total_project_emission: number | null;
    total_baseline_emission: number | null;
  };
  supplements: Supplement[];
};

export type CarbonEmissionReductionSummaryQueryParams = {
  customer_id?: number;
  customer_property_id?: number;
  site_id?: number;
  date_from?: string;
  date_to?: string;
};
