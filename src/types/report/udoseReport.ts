type UdoseReportFilterParams = {
  customer_id?: number;
  customer_property_id?: number[];
  site_id?: number[];
  supplement_id?: number;
  credit_type?: string;
  dosing_mode?: number;
  start_date?: string;
  end_date?: string;
  columns?: string;
};

export type UdoseExportReport = {
  batch_id: string;
  file_url: string;
};

export type UdoseExportReportCheckProgress = {
  export_processing: boolean;
};

export default UdoseReportFilterParams;
