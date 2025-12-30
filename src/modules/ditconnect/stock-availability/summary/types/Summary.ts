import { QueryParam } from '@uhub/types/common';
import { GeneralResponse } from '@uhub/types/generalResponse';

export type SummaryResponse = {
  group: string;
  total_dry_qty: number;
  total_liquid_qty: number;
  unit: string;
};

export type SummaryFormProps = {
  // @TODO: Add form fields here
};

export interface SummaryListResponse
  extends GeneralResponse<SummaryResponse[]> {
  data: SummaryResponse[];
}

export type SummaryParams = QueryParam & {
  location_id?: number | null;
  group?: string | null;
};
