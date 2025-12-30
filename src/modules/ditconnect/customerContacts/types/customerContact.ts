import { GeneralResponse } from '@uhub/types/generalResponse';

export type CustomerContactResponse = {
  id: number;
  customer: string;
  phone_number: string;
  address: string | null;
  details: string | null;
  created_at: string | null;
  updated_at: string | null;
};

export interface CustomerContactListResponse
  extends GeneralResponse<CustomerContactResponse[]> {
  data: CustomerContactResponse[];
}

export type CustomerContactParams = {
  paginate: boolean;
  page?: number;
  per_page?: number;
  search?: string;
  sort?: string;
};

export type CustomerContactFormProps = {
  customer: string;
  phone_number: string;
  address: string | null;
  details: string | null;
};
