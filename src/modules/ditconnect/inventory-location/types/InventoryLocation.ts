import { QueryParam } from '@uhub/types/common';
import { GeneralResponse } from '@uhub/types/generalResponse';

export type InventoryLocationResponse = {
  id: number;
  name: string;
  state: string;
  is_production_facility: number;
};

export type InventoryLocationFormProps = {
  name: null | string;
  state: null | string;
  is_production_facility: null | number;
};

export interface InventoryLocationListResponse
  extends GeneralResponse<InventoryLocationResponse[]> {
  data: InventoryLocationResponse[];
}

export type InventoryLocationParams = QueryParam & {};
