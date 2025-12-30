import { Crop } from './horticulture';

export type Cropable = {
  id: number;
  date_from: Date | string;
  date_to: Date | string;
  crop_id: number;
  number_of_plants?: number;
  crop?: Crop;
};

export type CropableFormValues = {
  crop_id: number;
  date_from: Date | string;
  date_to?: Date | string;
  number_of_plants?: number;
};
