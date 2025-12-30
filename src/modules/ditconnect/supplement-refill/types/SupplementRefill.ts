import { QueryParam } from '@uhub/types/common';
import { GeneralResponse } from '@uhub/types/generalResponse';
import { SalesOrderResponse } from '../../sales-order/types/SalesOrder';
import { InventoryLocationResponse } from '../../inventory-location/types/InventoryLocation';
import { SupplementBaseResponse } from '../../supplement-transfer/types/SupplementTransfer';

export type AttachmentResponse = {
  id: number;
  attachmentable_id: number;
  attachmentable_type: string;
  file_path: string;
  file_url: string;
  created_at: string;
  updated_at: string;
};

export type SupplementRefillResponse = SupplementBaseResponse & {
  attachments: AttachmentResponse[];
  admin_notes: string | null;
  customer_notes: string | null;
  invoice_no: null | string;
  sales_order_confirmation: null | SalesOrderResponse;
  sales_order_confirmation_id: null | number;
  site_id: null | number;
  site_snapshot: null | string;
  stock_location: InventoryLocationResponse;
  to_location: string;
};

export interface SupplementRefillListResponse
  extends GeneralResponse<SupplementRefillResponse[]> {
  data: SupplementRefillResponse[];
}

export type SupplementRefillParams = QueryParam & {
  location_id?: number;
  supplement_id?: number;
  status?: string;
};
