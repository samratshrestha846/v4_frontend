import { useEffect, useState } from 'react';
import {
  CC_LAST_3_MONTHS,
  CC_LAST_6_MONTHS,
  CC_LAST_7_DAYS,
  CC_LAST_MONTH,
  CC_SUMMARY_DURATIONS,
  CC_YEAR_TO_DATE,
} from '../../../../../../constants/CarbonCreditDurationOptions';

import useFetchCarbonCredits from './useFetchCarbonCredits';
import {
  CarbonCreditSummary,
  CarbonCreditSummaryData,
} from '../../../../../../types/udose/carbonAccounting';

export default function useCarbonAccounting() {
  const [carbonCredits, setCarbonCredits] = useState<CarbonCreditSummaryData[]>(
    []
  );

  const { data, isFetching, isError } = useFetchCarbonCredits();

  useEffect(() => {
    if (data) {
      const preparedData = prepareCarbonCreditSummaryData(data);
      setCarbonCredits(preparedData);
    }
  }, [data]);

  const prepareCarbonCreditSummaryData = (
    carbonCreditSummary: CarbonCreditSummary
  ) => {
    const credits: CarbonCreditSummaryData[] = [];
    CC_SUMMARY_DURATIONS.forEach((itemKey) => {
      const summary: CarbonCreditSummaryData = {
        key: itemKey,
        credit: 0,
        label: '',
        class: '',
      };

      switch (itemKey) {
        case CC_LAST_7_DAYS:
          summary.class = 'week';
          summary.label = 'Last 7 Days';
          summary.credit = carbonCreditSummary.last_seven_days;
          break;

        case CC_LAST_MONTH:
          summary.class = 'month';
          summary.label = 'Last 30 Days';
          summary.credit = carbonCreditSummary.last_month;
          break;

        case CC_LAST_3_MONTHS:
          summary.class = 'week';
          summary.label = 'Last 90 Days';
          summary.credit = carbonCreditSummary.last_three_months;
          break;

        case CC_LAST_6_MONTHS:
          summary.class = 'months';
          summary.label = 'Last 180 Days';
          summary.credit = carbonCreditSummary.last_six_months;
          break;

        case CC_YEAR_TO_DATE:
          summary.class = 'year';
          summary.label = 'Total';
          summary.credit = carbonCreditSummary.total;
          break;

        default:
          break;
      }
      credits.push(summary);
    });
    return credits;
  };

  return {
    data,
    isFetching,
    isError,
    carbonCredits,
  };
}
