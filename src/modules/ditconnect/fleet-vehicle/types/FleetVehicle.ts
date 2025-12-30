import { QueryParam } from '@uhub/types/common';
import { GeneralResponse } from '@uhub/types/generalResponse';

export type FleetVehicleResponse = {
  id: number;
  next_service_due: null | string;
  purchased_date: null | string | Date;
  reg_number: string;
  rego_until: null | string | Date;
  status: string;
  type: string;
  maintenances: any[];
};

export type FleetVehicleFormProps = {
  id?: null | number;
  next_service_due: null | string | Date;
  purchased_date: null | string | Date;
  reg_number: null | string;
  rego_until: null | string | Date;
  status?: null | string;
  type: null | string;
};

export interface FleetVehicleListResponse
  extends GeneralResponse<FleetVehicleResponse[]> {
  data: FleetVehicleResponse[];
}

export type FleetVehicleParams = QueryParam & {};
