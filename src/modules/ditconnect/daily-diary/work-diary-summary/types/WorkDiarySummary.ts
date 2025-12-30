import { QueryParam } from '@uhub/types/common';
import { GeneralResponse } from '@uhub/types/generalResponse';
import { User } from '@uhub/types/user/user';

export type WorkDiarySummaryResponse = {
  latestSevenDates: string[];
  totActiveStaff: number;
  workDiaryYetToCreateUsers: User[];
};

export interface WorkDiarySummaryListResponse
  extends GeneralResponse<WorkDiarySummaryResponse> {
  data: WorkDiarySummaryResponse;
}

export type WorkDiarySummaryParams = QueryParam & {
  user_id?: number;
  date?: string;
};
