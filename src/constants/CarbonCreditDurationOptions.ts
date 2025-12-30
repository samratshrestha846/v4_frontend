import { LabelValue } from '../types/common';

export const CC_LAST_7_DAYS: string = 'last_seven_days';

export const CC_LAST_MONTH: string = 'last_month';

export const CC_LAST_3_MONTHS: string = 'last_three_months';

export const CC_LAST_6_MONTHS: string = 'last_six_months';

export const CC_YEAR_TO_DATE: string = 'year_to_date';

const CC_DURATION_OPTIONS: LabelValue[] = [
  {
    value: CC_LAST_7_DAYS,
    label: 'Last 7 Days',
  },
  {
    value: CC_LAST_MONTH,
    label: 'Last 30 Days',
  },
  {
    value: CC_LAST_3_MONTHS,
    label: 'Last 90 Days',
  },
  {
    value: CC_LAST_6_MONTHS,
    label: 'Last 180 Days',
  },
  {
    value: CC_YEAR_TO_DATE,
    label: 'Year to Date',
  },
];

export const CC_SUMMARY_DURATIONS: string[] = [
  CC_LAST_7_DAYS,
  CC_LAST_MONTH,
  CC_LAST_3_MONTHS,
  CC_LAST_6_MONTHS,
  CC_YEAR_TO_DATE,
];

export default CC_DURATION_OPTIONS;
