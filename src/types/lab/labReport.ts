import { GeneralResponse } from '../generalResponse';
import { LabSample } from './labSampleList';

type CustomerSnapshot = {
  customer: string;
  name?: string;
  phone?: string;
  email?: string;
};

export type LabReportSetting = {
  show_supplement: boolean;
  show_comprehensive_report: boolean;
  show_summary: boolean;
  show_recommendation: boolean;
};

type LabReport = {
  id: number;
  summary: string;
  recommendation: string;
  job_description: string;
  sample_condition: string;
  report_date: Date | string;
  no_of_sample_received: string;
  status: string;
  analysed_by: null | { id: string; name: string; email: string };
  published_by: null | { id: string; name: string; email: string };
  lab_samples: LabSample[];
  created_at: string;
  updated_at: string;
  read_at: string | null;
  read_by: null | { id: string; name: string; email: string };
  customer_id: null | number;
  customer_property_id: null | number;
  customer_snapshot?: CustomerSnapshot;
  settings?: LabReportSetting;
};

type LabReportNotificationCount = {
  unread_lab_report_count: number;
};

interface LabReportListResponse extends GeneralResponse<LabReport[]> {
  body: LabReport[];
}

type LabReportQueryParams = {
  page?: number;
  search?: string;
  status?: string;
};

type LabReportFormValues = {
  lab_sample_ids: number[];
  job_description: string;
  sample_condition: string;
  report_date: Date | string;
  no_of_sample_received: string;
  customer_snapshot?: CustomerSnapshot;
  customer_property_id?: number | null;
  customer?: string;
  name?: string;
  phone?: string;
  email?: string;
  is_existing_property?: boolean;
  settings?: LabReportSetting;
  summary?: string;
  recommendation?: string;
};

type LabReportPublishFormValues = {
  status?: string;
};

export type {
  LabReportListResponse,
  LabReportQueryParams,
  LabReport,
  LabReportFormValues,
  LabReportPublishFormValues,
  LabReportNotificationCount,
  CustomerSnapshot,
};
