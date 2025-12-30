import { QueryParam } from '@uhub/types/common';
import { GeneralResponse } from '@uhub/types/generalResponse';
import { User } from '@uhub/types/user/user';
import { FleetVehicleResponse } from '../../../fleet-vehicle/types/FleetVehicle';

export type TravelDiaryResponse = {
  id: number;
  customer_property_id: number;
  customer_property_name: string;
  date: string | Date;
  start_time: string;
  end_time: string;
  rnd_distance: number;
  non_rnd_distance: number;
  notes: string;
  private_road_distance: number;
  public_road_distance: number;
  rnd_flying_hours: null | number;
  non_rnd_flying_hours: null | number;
  total_flying_hours: null | number;
  start_odometer_reading: number;
  end_odometer_reading: number;
  total_hours: number;
  personal_kms: number;
  work_kms: number;
  total_kms: number;
  user_id: number;
  user: User;
  vehicle_id: number;
  vehicle: FleetVehicleResponse;
  created_at?: string | Date;
  updated_at?: string | Date;
};

export type TravelDiaryFormProps = {
  vehicle_id: null | number;
  date: null | string | Date;
  start_time: null | string | Date;
  end_time: null | string | Date;
  total_kms: null | number;
  start_odometer_reading: null | number;
  end_odometer_reading: null | number;
  total_flying_hours: null | number;
  rnd_flying_hours: null | number;
  non_rnd_flying_hours: null | number;
  work_kms: null | number;
  personal_kms: null | number;
  rnd_distance: null | number;
  non_rnd_distance: null | number;
  public_road_distance: null | number;
  private_road_distance: null | number;
  notes: null | string;
  customer_property_id: null | number;
};

export interface TravelDiaryListResponse
  extends GeneralResponse<TravelDiaryResponse[]> {
  data: TravelDiaryResponse[];
}

export type TravelDiaryParams = QueryParam & {
  user_id?: number;
  start_date?: string;
  end_date?: string;
};
