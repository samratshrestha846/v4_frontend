import { GeneralResponse } from '../generalResponse';

type SiteFollowup = {
  id: number;
  site_id: number;
  site_class: string;
  runout_days_calculated: number;
  general_note: string;
  raingauze_note: string;
  review_note: string;
  last_fill_detected: string;
  status: string;
  created_at: string;
  updated_at: string;
};

interface SiteFollowUpResponse extends GeneralResponse<SiteFollowup[]> {
  body: SiteFollowup[];
}

type SiteFollowUpFormValues = {
  site_id: number;
  site_class: string;
  runout_days_calculated: number;
  general_note?: string;
  raingauze_note?: string;
  review_note?: string;
  status?: string;
  last_fill_detected?: string | Date;
};

export type { SiteFollowUpResponse, SiteFollowup, SiteFollowUpFormValues };
