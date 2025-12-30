import { QueryParam } from '@uhub/types/common';
import { GeneralResponse } from '@uhub/types/generalResponse';
import { User } from '@uhub/types/user/user';
import {
  TravelDiaryFormProps,
  TravelDiaryResponse,
} from '../../travel-diary/types/TravelDiary';

export type ActivityResponse = {
  id: number;
  description: string;
  group: string;
  name: string;
  parent_id: 1;
  section_no: string;
  status: string;
};

export type RnDResponse = {
  id: number;
  rnd_activity_id: number;
  rnd_description: null | string;
  rnd_hours: number;
  work_diary_id: number;
  activity: ActivityResponse;
};

export type WorkDiaryResponse = {
  id: number;
  date: string | null | Date;
  kms_driven: number;
  non_rnd_description: null | string;
  rnd_activity_id: null | number;
  rnd_description: null | string;
  rnd_hours: number;
  non_rnd_hours: number;
  total_hours: number;
  rnds: RnDResponse[];
  user: User;
  vehicle_reg: string;
  travel_diaries?: TravelDiaryResponse;
};

export type RnDFormProps = {
  id: null | number;
  rnd_activity_id: null | number;
  rnd_description: null | string;
  rnd_hours: null | number;
  group: null | string;
};

export type WorkDiaryFormProps = {
  date: null | string | Date;
  total_hours: null | number;
  kms_driven: null | number;
  non_rnd_description: null | string;
  non_rnd_hours: null | number;
  used_company_vehicle?: null | boolean;
  rnds: RnDFormProps[] | [];
  travel_diaries: TravelDiaryFormProps;
};

export interface WorkDiaryListResponse
  extends GeneralResponse<WorkDiaryResponse[]> {
  data: WorkDiaryResponse[];
}

export type WorkDiaryParams = QueryParam & {
  user_id: number;
  group?: string;
  start_date?: string;
  end_date?: string;
};
