import { QueryParam } from '@uhub/types/common';
import { GeneralResponse } from '@uhub/types/generalResponse';
import { User } from '@uhub/types/user/user';
import { InventoryLocationResponse } from '../../inventory-location/types/InventoryLocation';
import { SupplementResponse } from '../../supplement/types/Supplement';

export type StocktakeItemResponse = {
  id: number;
  stocktake_id: number;
  supplement_id: number;
  batch_no: string;
  available_qty: number;
  new_qty: number;
  is_available_product: boolean;
  notes: string;
  supplement: SupplementResponse;
  created_at: string;
  updated_dat: string;
};

export type StocktakeResponse = {
  id: number;
  approved_at: string;
  approved_by: User;
  created_at: string;
  created_by: User;
  date: string;
  location_id: number;
  location: InventoryLocationResponse;
  notes: null | string;
  status: string;
  updated_at: string;
  available_stocktake_items: StocktakeItemResponse[];
  not_found_stocktake_items: StocktakeItemResponse[];
};

export type StocktakeItemFormProps = {
  id?: null | number;
  supplement_id: null | number;
  supplement_name?: null | string;
  supplement_slug?: null | string;
  batch_no: null | string;
  available_qty: null | number;
  new_qty: null | number;
  notes: null | string;
};

export type StocktakeFormProps = {
  id: null | number;
  date: null | string | Date;
  location_id: null | number;
  notes: null | string;
  available_stocktake_items: StocktakeItemFormProps[];
  not_found_stocktake_items: StocktakeItemFormProps[];
};

export interface StocktakeListResponse
  extends GeneralResponse<StocktakeResponse[]> {
  data: StocktakeResponse[];
}

export type StocktakeParams = QueryParam & {
  location_id?: number;
  user_id?: number;
  status?: string;
};
