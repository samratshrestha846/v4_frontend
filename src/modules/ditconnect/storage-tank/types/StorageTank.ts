import { QueryParam } from '@uhub/types/common';
import { GeneralResponse } from '@uhub/types/generalResponse';

export type StorageTankResponse = {
  id: number;
  capacity: number;
  current_qty: number;
  location_id: number;
  name: string;
  location: {
    id: number;
    is_production_facility: number;
    name: string;
    state: string;
  };
};

export type StorageTankFormProps = {
  capacity: null | number;
  current_qty: null | number;
  location_id: null | number;
  name: null | string;
};

export interface StorageTankListResponse
  extends GeneralResponse<StorageTankResponse[]> {
  data: StorageTankResponse[];
}

export type StorageTankParams = QueryParam & {};
