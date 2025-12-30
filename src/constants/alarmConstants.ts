import { LabelValueDropdown } from '../types/common';

export const SEVERITY_LEVEL_OPTIONS: LabelValueDropdown[] = [
  { value: 'Caution', label: 'Caution' },
  { value: 'Alert', label: 'Alert' },
  { value: 'Alarm', label: 'Alarm' },
];

export const VISIBILITY_OPTIONS: any = [
  { value: 1, label: 'Yes' },
  { value: 0, label: 'No' },
];

export const VISIBILITY_OPTIONS_BOOLEAN: any = [
  { value: true, label: 'Yes' },
  { value: false, label: 'No' },
];
