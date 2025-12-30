import { Site } from './site';

export type WaterPressure = {
  id: number;
  site_id: number;
  pressure: number;
  created_at: string;
  updated_at: string;
};

export type WaterPressureQueryParams = {
  site_id?: number;
};

export type WaterPressureFormFields = {
  site_id: number;
  pressure: number;
};

export type WaterPressureData = Site & {
  water_pressures: WaterPressure[];
};
