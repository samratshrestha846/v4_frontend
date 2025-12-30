import { QueryParam } from '@uhub/types/common';
import { GeneralResponse } from '@uhub/types/generalResponse';
import { InventoryLocationResponse } from '../../inventory-location/types/InventoryLocation';
import { SupplementBaseResponse } from '../../supplement-transfer/types/SupplementTransfer';
import { SupplementResponse } from '../../supplement/types/Supplement';

export type SupplementMixingItemResponse = {
  id: number;
  batch_no: string;
  created_at: string;
  qty: number;
  supplement_id: number;
  supplement: any; // Todo
  supplement_manufacture: any; // Todo
  supplement_manufacture_id: null;
  supplement_mixing_id: number;
  updated_at: string;
};

export type SupplementMixingResponse = SupplementBaseResponse & {
  notes: null | string;
  updated_batch_no: string;
  updated_qty: number;
  updated_supplement_id: number;
  updated_supplement: SupplementResponse;
  updated_supplement_manufacture: null;
  stock_location: InventoryLocationResponse;
  supplement_mixing_items: SupplementMixingItemResponse[];
};

export interface SupplementMixingListResponse
  extends GeneralResponse<SupplementMixingResponse[]> {
  data: SupplementMixingResponse[];
}

export type SupplementMixingParams = QueryParam & {
  location_id?: number;
  supplement_id?: number;
  status?: string;
};
