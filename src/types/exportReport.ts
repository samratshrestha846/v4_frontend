export type ExportReportFormFields = {
  site_id: number[];
  customer_id: number;
  property_id: number[];
  credit_type: string;
  supplement_id: number;
  dosing_mode: string;
  start_date: string | Date | undefined;
  end_date: string | Date | undefined;
};
