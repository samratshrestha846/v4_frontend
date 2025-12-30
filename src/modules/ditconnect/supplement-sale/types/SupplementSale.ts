import { QueryParam } from '@uhub/types/common';
import { Customer } from '@uhub/types/customer/customerList';
import { GeneralResponse } from '@uhub/types/generalResponse';
import { InventoryLocationResponse } from '../../inventory-location/types/InventoryLocation';
import { SalesOrderResponse } from '../../sales-order/types/SalesOrder';
import { SupplementBaseResponse } from '../../supplement-transfer/types/SupplementTransfer';

export type SupplementSaleResponse = SupplementBaseResponse & {
  location: InventoryLocationResponse;
  location_id: number;
  sales_order_confirmation: null | SalesOrderResponse;
  sales_order_confirmation_id: null | number;
  customer: Customer | null;
  property_id: null | number;
  property_snapshot: string | null;
  invoice_no: null | string | string[];
  notes: string | null;
};

export interface SupplementSaleListResponse
  extends GeneralResponse<SupplementSaleResponse[]> {
  data: SupplementSaleResponse[];
}

export type SupplementSaleParams = QueryParam & {
  location_id?: number;
  supplement_id?: number;
  status?: string;
};
