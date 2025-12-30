import { QueryParam } from '@uhub/types/common';
import { GeneralResponse } from '@uhub/types/generalResponse';
import { DitUser } from '@uhub/types/user/user';

export type LabSamplePhotoResponse = {
  created_at: string;
  id: number;
  image_path: string;
  lab_sample_id: number;
  updated_at: string;
};

export type LabSampleResponse = {
  id: number;
  animal_bcs: null | string;
  animal_specs: null | string;
  approved_at: null | string;
  approved_by: null | DitUser;
  collected_at: string;
  created_at: string;
  customer_property: string;
  customer_property_id: number;
  device_serial_number: null | string;
  dung_freshness_score: null | string;
  faecal_score: null | string;
  latitude: null | string;
  longitude: null | string;
  notes: null | string;
  number_of_cattle: null | number;
  other_site: string;
  ph_value: number;
  plant_species: null;
  received_datetime: string;
  sample_id: number;
  sample_taken_from: string;
  sample_type: string;
  sample_type_id: number;
  site_id: number;
  site_name: string;
  status: string;
  updated_at: string;
  used_tablespoon_collection: null | boolean;
  sample_taken_by: DitUser;
  lab_sample_photos: LabSamplePhotoResponse[];
};

export type LabSampleFormProps = {
  id?: null | number;
  sample_id: null | number;
  latitude: null | string;
  longitude: null | string;
  animal_bcs: null | string;
  animal_specs: null | string;
  collected_at: null | string | Date;
  customer_property_id: null | number;
  device_serial_number: null | string;
  sample_taken_from: null | string;
  dung_freshness_score: null | number;
  faecal_score: null | number;
  notes: null | string;
  number_of_cattle: null | number;
  other_site: null | string;
  ph_value: null | number;
  plant_species: null | string;
  received_datetime: null | string | Date;
  sample_type_id: null | number;
  site_id: null | number;
  site_name: null | string;
  status: null | string;
  updated_at: null | string | Date;
  used_tablespoon_collection: null | number;
  images?: any;
  uploadedImages?: LabSamplePhotoResponse[];
};

export interface LabSampleListResponse
  extends GeneralResponse<LabSampleResponse[]> {
  data: LabSampleResponse[];
}

export type LabSampleParams = QueryParam & {
  sample_type_id?: number;
  status?: string;
};
