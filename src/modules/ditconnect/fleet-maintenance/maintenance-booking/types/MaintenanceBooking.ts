import { QueryParam } from '@uhub/types/common';
import { GeneralResponse } from '@uhub/types/generalResponse';

export type MaintenanceBookingResponse = {
  id: number;
  assignee_id: null | number;
  booking_date: null | string | Date;
  location: null | string;
  maintenance_id: null | number;
};

export type MaintenanceBookingFormProps = {
  id: null | number;
  assignee_id: null | number;
  booking_date: null | string | Date;
  location: null | string;
  maintenance_id: null | number;
};

export interface MaintenanceBookingListResponse
  extends GeneralResponse<MaintenanceBookingResponse[]> {
  data: MaintenanceBookingResponse[];
}

export type MaintenanceBookingParams = QueryParam & {};
