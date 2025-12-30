import { QueryParam } from '@uhub/types/common';
import { GeneralResponse } from '@uhub/types/generalResponse';

export type SupplementSummaryResponse = {
  id: number;
  supplement_id: number;
  location_id: number;
  supplement_manufacture_id: number;
  current_qty: number;
  batch_number: string;
  supplement_name: string;
  location_name: string;
  supplement: {
    id: number;
    name: string;
    group: string;
  };
};

export type SupplementSummaryFormProps = {
  // @TODO: Add form fields here
};

export interface SupplementSummaryListResponse
  extends GeneralResponse<SupplementSummaryResponse[]> {
  data: SupplementSummaryResponse[];
}

export type SupplementSummaryParams = QueryParam & {
  location_id?: number | null;
};
