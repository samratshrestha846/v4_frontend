import { QueryParam } from '@uhub/types/common';
import { GeneralResponse } from '@uhub/types/generalResponse';
import { Customer, IUser } from '../../types/ditConnect';

export type SalesOrderResponse = {
  id: number;
  sales_order_confirmation_id: number;
  customer: string;
  status: string;
  total: string;
  created_by: IUser;
};

export type BaseFieldArrayProps = {
  qty: number | null;
  rate: number | null;
  total: number | null;
};
export type SaleProductFormProps = BaseFieldArrayProps & {
  supplement_id: number | null;
};
export type AdditionalItemFormProps = BaseFieldArrayProps & {
  item_name: string | null;
};
export type UdoseItemFormProps = BaseFieldArrayProps & {
  inventory_item_id: string | null;
};
const createDefaultForm = <T extends Record<string, any>>(
  overrides: T
): T & BaseFieldArrayProps => ({
  qty: null,
  rate: null,
  total: null,
  ...overrides,
});

export const DEFAULT_SALE_PRODUCT_FORM = createDefaultForm({
  supplement_id: null,
});

export const DEFAULT_ADDITIONAL_ITEM_FORM = createDefaultForm({
  item_name: null,
});

export const DEFAULT_UDOSE_INVENTORY_ITEM_FORM = createDefaultForm({
  inventory_item_id: null,
});
export type SalesOrderFormProps = {
  customer: Customer;
  products: SaleProductFormProps[];
  additional_items: AdditionalItemFormProps[];
  udose_items: UdoseItemFormProps[];
  total: number | null;
};

export interface SalesOrderListResponse
  extends GeneralResponse<SalesOrderResponse[]> {
  data: SalesOrderResponse[];
}

export type SalesOrderParams = QueryParam & {
  customer_id?: number | null;
  customer_property_id?: number | null;
  status?: string | null;
};

export const SalesOrderConfirmationStatus = {
  CREATED: 'Created',
  SENT: 'Sent',
  CONFIRMED: 'Confirmed',
  COMPLETED: 'Completed',
} as const;

export const salesOrderConfirmationStatusOptions = Object.entries(
  SalesOrderConfirmationStatus
).map(([, value]) => ({
  label: value,
  value,
}));

export interface CheckAvailabilitySupplement {
  id: number;
  name: string;
  type: string;
  location_id: number;
  location_name: string;
  total_current_qty: number;
  unit: string;
}
