import { GeneralResponse } from '../generalResponse';
import { Cropable } from './cropable';
import { CropLifeCycle } from './horticulture';

export type Block = {
  id: number;
  name: string;
  area_in_hectares: number;
  paddock_id: number;
  customer_property_id: number;
  sub_blocks_count: number;
  cropable?: Cropable;
  crop_life_cycle_stage?: CropLifeCycle | null;
};

export interface BlockPlantationHistoryResponse
  extends GeneralResponse<Block[]> {
  body: Block[];
}

export type BlockFormValues = {
  name: string;
  area_in_hectares: number;
};
