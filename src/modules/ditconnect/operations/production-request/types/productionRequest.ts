import { GeneralResponse } from '@uhub/types/generalResponse';
import { QueryParam } from '@uhub/types/common';
import { IUser } from '../../../types/ditConnect';

export type ISupplement = {
  id: number;
  name: string;
  slug: string;
  status: string;
  tags: string[];
  group: string;
  type: string;
};

export type ILocation = {
  id: number;
  name: string;
  state: string;
};
export type ISalesOrderConfirmation = {
  id: number;
  sales_order_confirmation_id: number;
  customer: string;
  status: string;
  total: string;
  created_by: IUser;
};

export type ISalesOrderConfirmationDropdown = {
  id: number;
  name: string;
};

export type IProduct = {
  id: number;
  sales_order_confirmation_id: number;
  supplement_id: number;
  supplement: ISupplement;
  qty: string;
  rate: string;
  total: string;
};

export type ProductionRequestResponse = {
  id: number;
  sales_order_confirmation: ISalesOrderConfirmationDropdown;
  location: ILocation;
  supplement: ISupplement;
  qty: number;
  status: string;
  created_at: string;
  updated_at: string;
};
export type ProductionRequestFormProps = {
  date: string | Date;
  site_id: number | null;
  device_id: number | null;
  customer_notes: string | null;
  admin_notes: string | null;
  attachments?: File[] | null;
  attachmentResponses?: any[] | null;
};
export interface ProductionRequestListResponse
  extends GeneralResponse<ProductionRequestResponse[]> {
  data: ProductionRequestResponse[];
}
export type ProductionRequestQueryParam = QueryParam & {
  location_id?: number | null;
  supplement_id?: number | null;
  status?: string | null;
};
