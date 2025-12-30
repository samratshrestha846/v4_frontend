import { QueryParam } from '@uhub/types/common';
import { GeneralResponse } from '@uhub/types/generalResponse';

export type GroupSummaryResponse = {
  id: number;
  name: string;
  type: string;
  location_id: number;
  location_name: string;
  total_current_qty: number;
  unit: string;
};

export type GroupSummaryFormProps = {
  // @TODO: Add form fields here
};

export interface GroupSummaryListResponse
  extends GeneralResponse<GroupSummaryResponse[]> {
  data: GroupSummaryResponse[];
}

export type GroupSummaryParams = QueryParam & {
  location_id?: number | null;
};
