import { LabelValueDropdown } from '../types/common';
import { Param } from '../types/lab/labTestParams';

export const LAB_REPORT_CREATED: string = 'created';
export const LAB_REPORT_PUBLISHED: string = 'published';

export const LAB_REPORT_OPTIONS: LabelValueDropdown[] = [
  { value: LAB_REPORT_CREATED, label: 'Created' },
  { value: LAB_REPORT_PUBLISHED, label: 'Published' },
];

export const LAB_SAMPLE_TYPE_PASTURE: string = 'Pasture';
export const LAB_SAMPLE_TYPE_WATER: string = 'Water';
export const LAB_SAMPLE_TYPE_DUNG: string = 'Dung';

export const WATER_SAMPLE_DETAULT_RESULTS: Param[] = [
  {
    key: 'ph_field',
    unit: '',
    name: 'pH Field',
    range: '6 to 9',
  },
  {
    key: 'ph_lab',
    unit: '',
    name: 'pH Lab',
    range: '6 to 9',
  },
  {
    key: 'electrical_conductivity',
    unit: 'μS/cm',
    name: 'Electrical Conductivity (EC)',
    range: '< 1,600 uS/cm 0-6,300 uS/cm',
  },
  {
    key: 'total_dissolved_solids',
    unit: 'mg/L',
    name: 'Total Dissolved Solids (TDS)',
    range: '< 4,000 mg/L',
  },
  {
    key: 'salinity',
    unit: 'ppt',
    name: 'Salinity',
    range: '< 10',
  },
];

export const WATER_SAMPLE_OTHERS_RESULTS: Param[] = [
  {
    key: 'alkalinity',
    unit: 'mg/L',
    name: 'Alkalinity',
  },
  {
    key: 'ammonia',
    unit: 'mg/L',
    name: 'Ammonia',
  },
  {
    key: 'total_hardness',
    unit: 'mg/L',
    name: 'Total Hardness',
  },
  {
    key: 'percent_of_expected_nitrogen',
    unit: '%',
    name: '% of Expected Nitrogen',
  },

  {
    key: 'percent_of_expected_phosphorus',
    unit: '%',
    name: '% of Expected Phosphorus',
  },
];

export const PASTURE_SAMPLE_RESULTS: Param[] = [
  {
    key: 'dry_matter',
    unit: '%',
    name: 'Dry Matter',
  },
  {
    key: 'protein',
    unit: '%',
    name: 'Protein',
  },
  {
    key: 'ash',
    unit: '%',
    name: 'Ash',
  },
  {
    key: 'ndf',
    unit: '%',
    name: 'NDF',
  },
  {
    key: 'adf',
    unit: '%',
    name: 'ADF',
  },
  {
    key: 'fiber',
    unit: '%',
    name: 'Fiber',
  },
  {
    key: 'energy',
    unit: 'MJ/Kg',
    name: 'Energy',
  },
];
