import { GeneralResponse } from '../generalResponse';
import { Cropable } from './cropable';
import { CropLifeCycle } from './horticulture';

export type SubBlock = {
  id: number;
  name: string;
  area_in_hectares: number;
  block_id: number;
  customer_property_id: number;
  cropable?: Cropable;
  crop_life_cycle_stage?: CropLifeCycle | null;
};

export type SubBlockFormValues = {
  name: string;
  area_in_hectares: number;
  block_id: number;
};

export interface SubBlockPlantationHistoryResponse
  extends GeneralResponse<SubBlock[]> {
  body: SubBlock[];
}
