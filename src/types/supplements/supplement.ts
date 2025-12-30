import { GeneralResponse } from '../generalResponse';
import Nutrient from '../nutrients/nutrients';

type UProGreenNutrition = {
  sulphur: number;
  nitrogen: number;
  phosphorus: number;
  crude_protein: number;
  urea_equivalent: number;
};

type UTraceNutrition = {
  zinc: number;
  cobalt: number;
  copper: number;
  iodine: number;
  selenium: number;
  manganese: number;
};

type UCalmWeanerNutrition = {
  uTrace: number;
  sulphur: number;
  dextrose: number;
  nitrogen: number;
  magnesium: number;
  phosphorus: number;
  flossy_salt: number;
  crude_protein: number;
  urea_equivalent: number;
};

type UCalmNutrition = {
  uTrace: number;
  sulphur: number;
  dextrose: number;
  nitrogen: number;
  magnesium: number;
  phosphorus: number;
  flossy_salt: number;
  crude_protein: number;
  urea_equivalent: number;
};

type UProForageNutrition = {
  uTrace: number;
  sulphur: number;
  nitrogen: number;
  magnesium: number;
  phosphorus: number;
  flossy_salt: number;
  crude_protein: number;
  urea_equivalent: number;
};

type UProSouthernNutrition = {
  uTrace: number;
  sulphur: number;
  nitrogen: number;
  magnesium: number;
  phosphorus: number;
  crude_protein: number;
  urea_equivalent: number;
};

type UProMulgaNutrition = {
  PEG: number;
  sulphur: number;
  nitrogen: number;
  phosphorus: number;
  crude_protein: number;
  urea_equivalent: number;
};

type UProBlueAgolinNutrition = {
  agolin: number;
  dit_trace_elements: number;
};

type UProOrangeNutrition = {
  sulphur: number;
  nitrogen: number;
  phosphorus: number;
  crude_protein: number;
  urea_equivalent: number;
};

type UProOrangeHighPhosNutrition = {
  sulphur: number;
  nitrogen: number;
  phosphorus: number;
  crude_protein: number;
  urea_equivalent: number;
};

type SupplementNutrition =
  | null
  | UProGreenNutrition
  | UTraceNutrition
  | UCalmWeanerNutrition
  | UCalmNutrition
  | UProForageNutrition
  | UProSouthernNutrition
  | UProMulgaNutrition
  | UProBlueAgolinNutrition
  | UProOrangeNutrition
  | UProOrangeHighPhosNutrition;

type Supplement = {
  id: number;
  name: string;
  slug: string;
  nutrition: Record<string, number>;
  external_device_id: number;
  density: number;
  is_active: boolean;
  standard_concentration: number;
  methane_reducing_factor: number;
};

type KeyValue = {
  key: string;
  value: number;
};

interface SupplementResponse extends GeneralResponse<Supplement[]> {
  body: Supplement[];
}

type SupplementQueryParams = {
  page: number;
  per_page: number;
  is_active?: number;
  search?: string | number;
};

type SupplementFormFields = {
  name: string;
  slug: string;
  density: number;
  is_active: boolean;
  nutrition: Nutrient;
  standard_concentration: number;
  methane_reducing_factor: number;
};

export type {
  Supplement,
  SupplementNutrition,
  UProGreenNutrition,
  UTraceNutrition,
  UCalmWeanerNutrition,
  UCalmNutrition,
  UProForageNutrition,
  UProSouthernNutrition,
  UProMulgaNutrition,
  UProBlueAgolinNutrition,
  UProOrangeNutrition,
  UProOrangeHighPhosNutrition,
  KeyValue,
  SupplementResponse,
  SupplementQueryParams,
  SupplementFormFields,
};
