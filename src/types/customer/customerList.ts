import { GeneralResponse } from '../generalResponse';

type Settings = {
  show_dashboard: boolean;
};

type Referrer = {
  address: string;
  email: string;
  first_name: string;
  id: number;
  last_name: string;
};

type Customer = {
  id: number;
  business_name: string;
  email: string;
  phone: string;
  subscribed_products: Array<string>;
  settings: Settings;
  referrer_id?: number;
  is_active: boolean;
  referrer?: Referrer;
};

interface CustomerListResponse extends GeneralResponse<Customer[]> {
  body: Customer[];
}

type CustomerList = {
  data: Customer[];
};

export type { CustomerListResponse, CustomerList, Customer };
