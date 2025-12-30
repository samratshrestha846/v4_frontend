import { GeneralResponse } from '../generalResponse';

type Sale = {
  id: number;
  customer_id: number;
  product_detail: string;
  total_billed_amount: number;
  total_received_amount: number;
  referrer_id: number;
  is_first_sale: boolean;
  commission_amount: number;
  purchase_date?: string;
  bill_cleared_date?: string;
  external_invoice_number?: string;
};

type SaleQuery = {
  page: number;
  search?: string;
  customer_id?: number;
  referrer_id?: number;
};

interface SaleListResponse extends GeneralResponse<Sale[]> {
  body: Sale[];
}

type SaleFormFields = {
  customer_id: number;
  product_detail: string;
  total_billed_amount: number;
  total_received_amount: number;
  purchase_date: string | Date;
  bill_cleared_date?: string | Date;
  external_invoice_number?: string;
};

export type { SaleListResponse, SaleQuery, Sale, SaleFormFields };
