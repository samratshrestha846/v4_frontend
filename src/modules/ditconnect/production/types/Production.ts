import { QueryParam } from '@uhub/types/common';
import { GeneralResponse } from '@uhub/types/generalResponse';
import { DitAuthUser, DitUser } from '@uhub/types/user/user';
import { InventoryLocationResponse } from '../../inventory-location/types/InventoryLocation';
import { SupplementResponse } from '../../supplement/types/Supplement';

export type ProductionResponse = {
  id: number;
  batch_number: string;
  supplement_id: number;
  qty: number;
  location_id: number;
  created_by: DitUser;
  updated_by: null | DitAuthUser;
  date: string;
  production_order_no: null | string;
  is_jug_tested: boolean;
  notes: null | string;
  created_at: string;
  updated_at: string;
  is_created_after_mixing: boolean;
  is_created_after_stocktake: boolean;
  supplement: SupplementResponse;
  location: InventoryLocationResponse;
};

export type ProductionFormProps = {
  batch_number: null | string;
  supplement_id: null | number;
  qty: null | number;
  location_id: null | number;
  date: string | Date | null;
  notes: null | string;
  production_order_no: null | string;
  is_jug_tested: boolean;
};

export interface ProductionListResponse
  extends GeneralResponse<ProductionResponse[]> {
  data: ProductionResponse[];
}

export type ProductionParams = QueryParam & {
  location_id?: number;
  supplement_id?: number;
};
