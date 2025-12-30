import { GeneralResponse } from './generalResponse';

type SiteHealthCheckSumamry = {
  created_at: string;
  health_message: string[];
  health_status: string;
  id: number;
  name: string;
  site_id: number;
};

type SiteHealthCheckSumamryQueryParams = {
  page: number;
  search?: string;
  property_id?: number;
};

interface SiteHealthCheckSumamryResponse
  extends GeneralResponse<SiteHealthCheckSumamry[]> {
  body: SiteHealthCheckSumamry[];
}

export type {
  SiteHealthCheckSumamryResponse,
  SiteHealthCheckSumamry,
  SiteHealthCheckSumamryQueryParams,
};
