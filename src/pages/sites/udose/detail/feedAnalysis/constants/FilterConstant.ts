import {
  DURATION_LAST_6_MONTHS,
  DURATION_LAST_7_DAYS,
  DURATION_LAST_MONTH,
} from '../../../../../../constants/durationOptions';
import { LabelValueDropdown } from '../../../../../../types/common';

export const FILTER_BREAKDOWN_TYPE: string = 'breakdown_type';
export const FILTER_BREAKDOWN_NUMBER: string = 'breakdown_number';
export const FILTER_DURATION: string = 'duration';

export const BREAKDOWN_TYPE_WATER: string = 'per_litre';
export const BREAKDOWN_TYPE_ANIMAL: string = 'per_head';

export const BREAKDOWN_TYPE_LABEL: Record<string, string> = {
  [BREAKDOWN_TYPE_WATER]: 'Water Consumption',
  [BREAKDOWN_TYPE_ANIMAL]: 'Number of Livestock Equivalent',
};

export const DURATION_LABEL: Record<string, string> = {
  [DURATION_LAST_7_DAYS]: 'Last 7 days',
  [DURATION_LAST_MONTH]: 'Last Month',
  [DURATION_LAST_6_MONTHS]: 'Last 6 Months',
};

export const breakdownOptions: LabelValueDropdown[] = [
  {
    value: BREAKDOWN_TYPE_ANIMAL,
    label: 'Number of Livestock Equivalent',
  },
  {
    value: BREAKDOWN_TYPE_WATER,
    label: 'Water Consumption',
  },
];

export const durationOptions: LabelValueDropdown[] = [
  {
    value: DURATION_LAST_7_DAYS,
    label: 'Last 7 days',
  },
  {
    value: DURATION_LAST_MONTH,
    label: 'Last Month',
  },
  {
    value: DURATION_LAST_6_MONTHS,
    label: 'Last 6 Months',
  },
];
