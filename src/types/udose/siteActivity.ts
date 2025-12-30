import { GeneralResponse } from '../generalResponse';

type SiteActivityFilterParams = {
  site_id: string | undefined;
  page: number;
};

type ActivityDetail = {
  key: string;
  old_value: number | string;
  new_value: number | string;
};

type SiteActivity = {
  id: number;
  site_id: number;
  user_id: number;
  type: string;
  detail: ActivityDetail | null;
  status: number;
  created_at: string;
  user: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    profile_picture_url: string | null;
  };
};

type ActivityTypeProperty = {
  colorVariant: string;
  message: string;
  icon: string;
};

interface SiteActivityListResponse extends GeneralResponse<SiteActivity[]> {
  data: SiteActivity[];
}

export type {
  SiteActivityFilterParams,
  SiteActivity,
  ActivityTypeProperty,
  SiteActivityListResponse,
};
