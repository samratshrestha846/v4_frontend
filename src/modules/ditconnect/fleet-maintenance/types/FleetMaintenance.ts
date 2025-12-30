import { QueryParam } from '@uhub/types/common';
import { GeneralResponse } from '@uhub/types/generalResponse';
import { User } from '@uhub/types/user/user';
import { FleetVehicleResponse } from '../../fleet-vehicle/types/FleetVehicle';

export type FleetMaintenanceBooking = {
  id: number;
  maintenance_id: number;
  booking_date: string | Date;
  assignee_id: number;
  location: string;
  assignee: User;
};

export type FleetMaintenanceResponse = {
  id: number;
  assignee_id: number;
  first_aid_kit: number;
  fleet_card_number: string;
  location: string;
  maintenance_date: null;
  maintenance_detail: string;
  maintenance_status: string;
  maintenance_type: string;
  no_of_kms: number;
  reported_by: number;
  tyre_condition: string;
  created_at: string | Date;
  updated_at: string | Date;
  vehicle_id: number;
  windscreen: string;
  vehicle: FleetVehicleResponse;
  reported_by_user: User;
  maintenance_booking: FleetMaintenanceBooking;
};

export type FleetMaintenanceFormProps = {
  // @TODO: Add form fields here
};

export interface FleetMaintenanceListResponse
  extends GeneralResponse<FleetMaintenanceResponse[]> {
  data: FleetMaintenanceResponse[];
}

export type FleetMaintenanceParams = QueryParam & {
  status?: string;
};
