import { GeneralResponse } from '../generalResponse';
import { Property } from '../property/propertyList';

type CeresTagAnimalUpdate = {
  id: number;
  ceres_tag_id: number;
  animal_tag_taken_off_at: string | null;
  animal_tag_put_on_at: string | null;
  created_at?: string;
  updated_at?: string;
};

type CeresTag = {
  id: number;
  customer_property_id: number;
  customer_property: Property;
  esn: string;
  vid: string;
  rfid: string;
  bt_mac: string;
  charge_type: string;
  linked_date: string;
  brand: string;
  first_date: string;
  firmware_version: string;
  last_animal_updated_at: string | null;
  last_animal_taken_off_at: string | null;
  animal_updates: CeresTagAnimalUpdate[];
  last_communicated_at?: string;
};

interface CeresTagListResponse extends GeneralResponse<CeresTag[]> {
  body: CeresTag[];
}

type CeresTagQueryParams = {
  page?: number;
  search?: string;
  customer_property_id?: number;
};

type CeresTagObservationParams = {
  customer_property_id?: number;
  ceres_tag_id?: number | null;
  as_of_date_from?: string; // date in format 'yyyy-mm-dd'
  as_of_date_to?: string; // date in format 'yyyy-mm-dd'
};

type CeresTagObservationFeatureProperty = {
  id: number;
  customer_property_id: number;
  esn: string;
  ceres_tag_id: number;
  firmware_version: string;
  datetime: string;
  Latitude: string;
  Activity1: string;
  Activity2: string;
  Activity3: string;
  Activity4: string;
  Longitude: string;
  Temperature: string;
  Location_Accuracy: string;
};

type CeresTagNewObservationFeatureProperty = {
  id: number;
  customer_property_id: number;
  esn: string;
  ceres_tag_id: number;
  firmware_version: string;
  datetime: string;
  Latitude: string;
  Other_Minutes: string;
  Grazing_Minutes: string;
  Walking_Minutes: string;
  'Resting/Ruminating_Minutes': string;
  Longitude: string;
  Temperature: string;
  Location_Accuracy: string;
};

type CeresTagWildObservationFeatureProperty = {
  id: number;
  customer_property_id: number;
  esn: string;
  ceres_tag_id: number;
  firmware_version: string;
  datetime: string;
  Latitude: string;
  Activity_LatestHour: string;
  Activity_PreviousHour: string;
  Longitude: string;
  Temperature: string;
  Location_Accuracy: string;
};

type CeresTagObservationFeature = {
  type: string;
  properties:
    | CeresTagObservationFeatureProperty
    | CeresTagNewObservationFeatureProperty
    | CeresTagWildObservationFeatureProperty;
  geometry: {
    type: string;
    coordinates: [number, number];
  };
};

interface CeresTagObservationsResponse
  extends GeneralResponse<CeresTagObservationFeature[]> {
  type: string;
  name: string;
  crs: {
    type: string;
    properties: {
      name: string;
    };
  };
  features: CeresTagObservationFeature[];
}

type CeresTagObservationQueryParams = {
  page?: number;
  page_size?: number;
  ceres_tag_id?: number;
  customer_property_id?: number;
  as_of_date_from?: string;
  as_of_date_to?: string;
};

type CeresTagAlert = {
  id: number;
  customer_property_id: number;
  esn: string;
  alert_type: string;
  alert_timestamp: string;
  latitude: string;
  longitude: string;
};

interface CeresTagAlertsListResponse extends GeneralResponse<CeresTagAlert[]> {
  body: CeresTagAlert[];
}

type CeresTagAlertQueryParams = {
  page?: number;
};

type CeresTagObservation = {
  id: number;
  observation_date: string;
  customer_property_id: number;
  esn: string;
  data: {
    Latitude: string;
    Activity1: string;
    Activity2: string;
    Activity3: string;
    Activity4: string;
    Longitude: string;
    Temperature: string;
    Location_Accuracy: string;
  };
  created_at: string;
  updated_at: string | null;
};

type CeresTagObservationNewData = {
  id: number;
  observation_date: string;
  customer_property_id: number;
  esn: string;
  data: {
    0: null;
    Latitude: string;
    Longitude: string;
    Temperature: string;
    Other_Minutes: string;
    Grazing_Minutes: string;
    Walking_Minutes: string;
    Location_Accuracy: string;
    'Resting/Ruminating_Minutes': string;
  };
  created_at: string;
  updated_at: string | null;
};

type CeresWildObservationNewData = {
  id: number;
  observation_date: string;
  customer_property_id: number;
  esn: string;
  data: {
    Location_Accuracy: string;
    Activity_LatestHour: string;
    Temperature: string;
    Latitude: string;
    Longitude: string;
    Activity_PreviousHour: string;
  };
  created_at: string;
  updated_at: string | null;
};

interface CeresTagObservationListResponse
  extends GeneralResponse<
    | CeresTagObservation[]
    | CeresTagObservationNewData[]
    | CeresWildObservationNewData[]
  > {
  body:
    | CeresTagObservation[]
    | CeresTagObservationNewData[]
    | CeresWildObservationNewData[];
}

type CeresTagPFIQueryParams = {
  as_of_date_from?: string;
  as_of_date_to?: string;
};

type CeresTagPFISummary = {
  id: number;
  customer_property_id: number;
  esn: string;
  data: string[];
  observation_date: string;
};

type CeresTagHistoricalDataFormFields = {
  esn: string;
};

type CeresTagUpdateFormFields = {
  last_animal_taken_off_at: Date | string | undefined | null;
  last_animal_updated_at: Date | string | undefined | null;
};

export type {
  CeresTagListResponse,
  CeresTagQueryParams,
  CeresTag,
  CeresTagObservationParams,
  CeresTagObservationsResponse,
  CeresTagObservationFeature,
  CeresTagAlert,
  CeresTagObservationQueryParams,
  CeresTagAlertQueryParams,
  CeresTagAlertsListResponse,
  CeresTagObservation,
  CeresTagObservationListResponse,
  CeresTagPFIQueryParams,
  CeresTagPFISummary,
  CeresTagObservationFeatureProperty,
  CeresTagHistoricalDataFormFields,
  CeresTagObservationNewData,
  CeresWildObservationNewData,
  CeresTagUpdateFormFields,
  CeresTagNewObservationFeatureProperty,
  CeresTagWildObservationFeatureProperty,
  CeresTagAnimalUpdate,
};
