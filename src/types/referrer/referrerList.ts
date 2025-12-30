import { GeneralResponse } from '../generalResponse';

type Referrer = {
  id: number;
  first_name: string;
  last_name?: string;
  email: string;
  phone_number: string;
  contract_file: string;
  address: string;
  contract_effective_date: string;
  contract_expiry_date: string;
  total_paid_amount: number;
  total_earning: number;
};

type ReferrerQuery = {
  page: number;
  search?: string;
};

interface ReferrerListResponse extends GeneralResponse<Referrer[]> {
  body: Referrer[];
}

interface ReferrerDataResponse extends GeneralResponse<Referrer> {
  data: Referrer;
}

type ReferrerList = {
  data: Referrer[];
};

export type {
  ReferrerListResponse,
  ReferrerDataResponse,
  ReferrerList,
  ReferrerQuery,
  Referrer,
};

export type ReferrerFormFields = {
  first_name: string;
  last_name?: string;
  email: string;
  phone_number: string;
  contract_file?: any;
  address: string;
  contract_effective_date: string | Date | undefined;
  contract_expiry_date: string | Date | undefined;
};
