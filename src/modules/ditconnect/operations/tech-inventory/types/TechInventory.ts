import { QueryParam } from '@uhub/types/common';
import { GeneralResponse } from '@uhub/types/generalResponse';
import { IUser } from '../../../types/ditConnect';

export type LocationFormProps = {
  location_id: number | null;
  qty: number | null;
};

export interface RelatedLocation {
  id: number;
  name: string;
  state: string;
  created_at: string;
  updated_at: string;
  is_production_facility: number;
}
export interface InventoryItemCount {
  id: number;
  inventory_item_id: number;
  qty: number;
  location_id: number;
  created_at: string;
  updated_at: string;
  related_location: RelatedLocation;
}

export type TechInventoryResponse = {
  id: number;
  name: string;
  sku: string;
  type: string;
  qr_code: string;
  qr_image_path: string;
  created_at: string;
  updated_at: string;
  is_device_item: number;
  is_udose_item: boolean;
  inventory_item_counts: InventoryItemCount[];
};

export type TechInventoryFormProps = {
  name: string;
  sku: string;
  type: string;
  is_udose_item: boolean;
  locations: LocationFormProps[];
};

export type TechInventoryItemCountResponse = {
  id: number;
  inventory_item_id: number;
  qty: number;
  location_id: number;
  created_at: string;
  updated_at: string;
  inventory_item: TechInventoryResponse;
  related_location: RelatedLocation;
};

export interface TechInventoryListResponse
  extends GeneralResponse<TechInventoryItemCountResponse[]> {
  data: TechInventoryItemCountResponse[];
}
export interface InventoryItemCountWithItem extends InventoryItemCount {
  inventory_item: TechInventoryResponse;
}
export type InventoryItemFlag = {
  id: number;
  inventory_item_count: InventoryItemCountWithItem;
  user: IUser;
  notes: string;
  created_at: string;
};
export interface InventoryItemFlagListResponse
  extends GeneralResponse<InventoryItemFlag[]> {
  data: InventoryItemFlag[];
}

export type InventoryItemStock = {
  id: number;
  inventory_item_count: InventoryItemCountWithItem;
  user: IUser;
  action: string;
  qty: number;
  notes: string;
  created_at: string;
};

export interface InventoryItemStockListResponse
  extends GeneralResponse<InventoryItemStock[]> {
  data: InventoryItemStock[];
}

export type TechInventoryQueryParam = QueryParam & {
  type?: string | null;
  location_id?: number | null;
};
export type TechInventoryItemFlagQueryParam = QueryParam & {
  inventory_item_count_id?: string | null;
  title?: string | null;
};

export const InventoryItemType = {
  INVENTORY: 'Inventory',
  NON_INVENTORY: 'Non-Inventory',
} as const;

export const inventoryItemTypeOptions = Object.entries(InventoryItemType).map(
  ([, value]) => ({
    label: value,
    value,
  })
);
export const EMPTY_LOCATION_FORM = { location_id: null, qty: null };
