import { QueryParam } from '@uhub/types/common';
import { GeneralResponse } from '@uhub/types/generalResponse';
import { User } from '@uhub/types/user/user';
import { SupplierResponse } from '../../supplier/types/Supplier';
import { PaymentResponse } from '../../payment/types/Payment';

export type PurchaseRequestItemResponse = {
  id: null | number;
  item_name: null | string;
  unit: null | number;
  qty: null | number;
  rate: null | number;
  total: null | number;
};

export type PurchaseRequestDocumentResponse = {
  id: number;
  pr_id: number;
  file: string;
  created_at: string;
  updated_at: string;
  file_type: string;
  file_url: string;
};

export type PurchaseRequestResponse = {
  id: number;
  pr_no: string;
  comments_count: number;
  created_at: string;
  delivery_location: string;
  delivery_method: string;
  estimated_payment_date: string;
  has_contracts: boolean;
  has_invoices: boolean;
  has_quotations: boolean;
  online_order_url: null | string;
  priority: string;
  remarks: null | string;
  required_by_date: string;
  status: string;
  supplier: SupplierResponse;
  supplier_id: number;
  title: string;
  total_price: number;
  updated_at: string;
  requested_by: number;
  requested_by_user?: User;
  requested_to: number;
  requested_to_user?: User;
  items: PurchaseRequestItemResponse[];
  quotations: PurchaseRequestDocumentResponse[];
  invoices: PurchaseRequestDocumentResponse[];
  contracts: PurchaseRequestDocumentResponse[];
  comments: [];
  payment?: PaymentResponse;
};

export type PurchaseRequestFormProps = {
  title: string | null;
  requested_to: null | number;
  required_by_date: null | Date | string;
  supplier_id: null | number;
  priority: null | string;
  delivery_location: null | string;
  delivery_method: null | string;
  online_order_url: null | string;
  estimated_payment_date: null | Date | string;
  remarks: null | string;
  total_price: number;
  quotation: any[];
  invoice: any[];
  contract: any[];
  purchase_request_items: [] | PurchaseRequestItemResponse[];
  quotationResponse?: PurchaseRequestDocumentResponse[];
  invoiceResponse?: PurchaseRequestDocumentResponse[];
  contractResponse?: PurchaseRequestDocumentResponse[];
};

export interface PurchaseRequestListResponse
  extends GeneralResponse<PurchaseRequestResponse[]> {
  data: PurchaseRequestResponse[];
}

export type PurchaseRequestParams = QueryParam & {
  user_id?: number;
  status?: string;
  start_date?: string;
  end_date?: string;
};
