import { QueryParam } from '@uhub/types/common';
import { GeneralResponse } from '@uhub/types/generalResponse';
import { DitUser } from '@uhub/types/user/user';
import { InventoryLocationResponse } from '../../inventory-location/types/InventoryLocation';
import { StorageTankResponse } from '../../storage-tank/types/StorageTank';
import { SupplementResponse } from '../../supplement/types/Supplement';
import { ProductionResponse } from '../../production/types/Production';

export type SupplementBaseResponse = {
  id: number;
  batch_no: null | string;
  qty: number;
  status: string;
  created_at: string;
  created_by: DitUser;
  updated_at: string;
  updated_by: null | DitUser;
  completed_at: string;
  completed_by: null | DitUser;
  date: string;
  notes: null | string;
  storage_tank: null | StorageTankResponse;
  storage_tank_id: null | number;
  supplement_manufacture_id: number;
  supplement_manufacture: ProductionResponse; // name mismatch
  supplement_id: number;
  supplement: SupplementResponse;
};

export type SupplementTransferResponse = SupplementBaseResponse & {
  stock_location: InventoryLocationResponse;
  to_location: InventoryLocationResponse;
  task_description_id: null;
  task_description: null; // Todo
};

export interface SupplementTransferListResponse
  extends GeneralResponse<SupplementTransferResponse[]> {
  data: SupplementTransferResponse[];
}

export type SupplementTransferParams = QueryParam & {
  supplement_id?: number;
  location_id?: number;
  status?: string;
};
