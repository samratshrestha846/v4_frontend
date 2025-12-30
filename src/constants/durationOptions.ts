import { LabelValue, LabelValueDropdown } from '../types/common';

export const DURATION_LAST_24_HOURS: string = 'last_24_hours';

export const DURATION_LAST_7_DAYS: string = 'last_7_days';

export const DURATION_LAST_14_DAYS: string = 'last_14_days';

export const DURATION_LAST_MONTH: string = 'last_month';

export const DURATION_LAST_3_MONTHS: string = 'last_3_months';

export const DURATION_LAST_6_MONTHS: string = 'last_6_months';

export const DURATION_YEAR_TO_DATE: string = 'year_to_date';

const DURATION_OPTIONS: LabelValueDropdown[] = [
  { value: DURATION_LAST_7_DAYS, label: 'Last 7 Days' },
  { value: DURATION_LAST_14_DAYS, label: 'Last 14 Days' },
  { value: DURATION_LAST_MONTH, label: 'Last Month' },
  { value: DURATION_LAST_3_MONTHS, label: 'Last 3 Months' },
  { value: DURATION_LAST_6_MONTHS, label: 'Last 6 Months' },
  { value: DURATION_YEAR_TO_DATE, label: 'Year to Date' },
];

export const RAINFALL_FILTER_TYPE_CUMULATIVE: string = 'cummulative_rainfall';

export const RAINFALL_FILTER_TYPE_HOURLY: string = 'hourly_rainfall';

export const RAINFALL_FILTER_TYPE_OPTIONS: LabelValue[] = [
  { value: RAINFALL_FILTER_TYPE_CUMULATIVE, label: 'Cumulative Rainfall' },
  { value: RAINFALL_FILTER_TYPE_HOURLY, label: 'Hourly Rainfall' },
];

export const CERES_TAG_DURATION_OPTIONS: LabelValueDropdown[] = [
  { value: DURATION_LAST_24_HOURS, label: 'Last 24 Hours' },
  { value: DURATION_LAST_7_DAYS, label: 'Last 7 Days' },
  { value: DURATION_LAST_14_DAYS, label: 'Last 14 Days' },
  { value: DURATION_LAST_MONTH, label: 'Last Month' },
  { value: DURATION_LAST_3_MONTHS, label: 'Last 3 Months' },
  { value: DURATION_LAST_6_MONTHS, label: 'Last 6 Months' },
  { value: DURATION_YEAR_TO_DATE, label: 'Year to Date' },
];

export default DURATION_OPTIONS;

// Carbon accounting constants

export const CC_DURATION_ONE_MONTH: string = 'one_month';
export const CC_DURATION_THREE_MONTHS: string = 'three_months';
export const CC_DURATION_SIX_MONTHS: string = 'six_months';
export const CC_DURATION_TWELVE_MONTHS: string = 'twelve_months';
export const CC_DURATION_CUSTOM_DATE: string = 'custom_date';

export const CC_DURATION_MONTH_OPTIONS: Record<
  string,
  { short_label: string; label: string; value: string }
> = {
  [CC_DURATION_ONE_MONTH]: {
    short_label: '1M',
    label: 'One Month',
    value: CC_DURATION_ONE_MONTH,
  },
  [CC_DURATION_THREE_MONTHS]: {
    short_label: '3M',
    label: 'Three Months',
    value: CC_DURATION_THREE_MONTHS,
  },
  [CC_DURATION_SIX_MONTHS]: {
    short_label: '6M',
    label: 'Six Months',
    value: CC_DURATION_SIX_MONTHS,
  },
  [CC_DURATION_TWELVE_MONTHS]: {
    short_label: '12M',
    label: 'Twelve Months',
    value: CC_DURATION_TWELVE_MONTHS,
  },
  [CC_DURATION_CUSTOM_DATE]: {
    short_label: 'Custom Date',
    label: 'Custom Date',
    value: CC_DURATION_CUSTOM_DATE,
  },
};
