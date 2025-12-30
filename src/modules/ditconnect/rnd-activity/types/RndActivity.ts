import { QueryParam } from '@uhub/types/common';
import { GeneralResponse } from '@uhub/types/generalResponse';

export type RndActivityResponse = {
  id: number;
  description: string;
  group: string;
  name: string;
  parent_id?: number;
  section_no: string;
  status: string;
};

export type RndActivityFormProps = {
  section_no: null | string;
  name: null | string;
  description: null | string;
  group: null | string;
  parent_id: null | number;
};

export interface RndActivityListResponse
  extends GeneralResponse<RndActivityResponse[]> {
  data: RndActivityResponse[];
}

export type RndActivityParams = QueryParam & {
  group?: string;
  status?: string;
};
