import { GeneralResponse } from '../generalResponse';
import { Property } from '../property/propertyList';
import UdoseRecordSettings from '../udose/udoseSettings';
import { Param } from './labTestParams';
import { LabTestResult } from './labTestResult';

type LabSample = {
  id: number;
  sample_id?: string;
  sample_kind: string;
  collected_datetime: string;
  received_datetime: string;
  site: any;
  lab_sample_type: any;
  sample_taken_by: any;
  latitude?: string;
  longitude?: string;
  animal_specs?: string;
  paddock?: string;
  grass_species?: string;
  file?: File;
  file_url?: string;
  site_id?: number;
  lab_sample_type_id?: number;
  udose_setting_id?: number;
  comments?: string;
  test_type?: string;
  default_test_parameters: null | Param[];
  lab_test_param: {
    id: number;
    test_type: string;
  } | null;
  lab_test_param_id: number | null;
  customer_property: Property | null;
  lab_test_result?: LabTestResult | null;
  udose_setting?: UdoseRecordSettings;
};

interface LabSampleListResponse extends GeneralResponse<LabSample[]> {
  body: LabSample[];
}

type LabSampleQuery = {
  page?: number;
  search?: string;
  customer_id?: number;
  customer_property_id?: number;
  site_id?: number;
  lab_sample_type_id?: number;
};

type LabSampleDropdownQueryParams = {
  page: number;
  search?: string;
  lab_sample_type_id?: number;
  lab_report_id?: number;
  customer_property_id?: number;
  site_id?: number;
};

type LabSampleFormValues = {
  lab_sample_type_id: number;
  site_id: number;
  collected_datetime: string | Date;
  received_datetime: string | Date;
  sample_taken_by: number;
  file?: string;
  sample_id?: string;
  sample_kind?: string;
  latitude?: string;
  longitude?: string;
  grass_species?: string;
  animal_specs?: string;
  paddock?: string;
  comments?: string;
  test_type?: string;
  default_test_parameters: null | Param[];
  lab_test_param_id: number;
  customer_property_id: number;
  select_all: Record<string, boolean>;
};

export type {
  LabSampleListResponse,
  LabSampleQuery,
  LabSample,
  LabSampleFormValues,
  LabSampleDropdownQueryParams,
};
