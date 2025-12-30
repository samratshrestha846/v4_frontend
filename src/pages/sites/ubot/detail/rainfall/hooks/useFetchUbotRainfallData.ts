import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import ubot from '../../../../../../helpers/api/ubot';

import {
  DURATION_LAST_14_DAYS,
  DURATION_LAST_3_MONTHS,
  DURATION_LAST_6_MONTHS,
  DURATION_LAST_7_DAYS,
  DURATION_LAST_MONTH,
  DURATION_YEAR_TO_DATE,
  RAINFALL_FILTER_TYPE_CUMULATIVE,
} from '../../../../../../constants/durationOptions';
import { DurationQueryFilterParams } from '../../../../../../types/common';

export default function useFetchUbotRainfallData() {
  const { id } = useParams();
  const [duration, setDuration] = useState<string>(DURATION_LAST_7_DAYS);
  const [rainfallFilterType, setRainfallFilterType] = useState<string>(
    RAINFALL_FILTER_TYPE_CUMULATIVE
  );

  const prepareDurationQueryParams = (): DurationQueryFilterParams | null => {
    const currentDate = moment();
    let startDate = moment().subtract(7, 'days');
    let endDate = currentDate;
    const params: DurationQueryFilterParams = {
      date_from: moment
        .parseZone(startDate)
        .utc()
        .format('YYYY-MM-DD')
        .toString(),
      date_to: moment.parseZone(endDate).utc().format('YYYY-MM-DD').toString(),
    };

    if (duration === DURATION_LAST_14_DAYS) {
      startDate = moment().subtract(14, 'days');
    }

    if (duration === DURATION_LAST_MONTH) {
      startDate = moment().subtract(1, 'month').startOf('month').add(1, 'day');
      endDate = moment(startDate).endOf('month');
    }

    if (duration === DURATION_LAST_3_MONTHS) {
      startDate = moment().subtract(3, 'month').startOf('month').add(1, 'day');
      endDate = moment(startDate).add(2, 'month').endOf('month');
    }

    if (duration === DURATION_LAST_6_MONTHS) {
      startDate = moment().subtract(6, 'month').startOf('month').add(1, 'day');
      endDate = moment(startDate).add(5, 'month').endOf('month');
    }

    if (duration === DURATION_YEAR_TO_DATE) {
      startDate = moment().startOf('year').startOf('month').add(1, 'day');
    }

    params.date_from = moment.parseZone(startDate).utc().format('YYYY-MM-DD');
    params.date_to = moment.parseZone(endDate).utc().format('YYYY-MM-DD');
    return params;
  };

  const getCumulativeRainfallById = () => {
    const params = prepareDurationQueryParams();
    return ubot.getCumulativeRainfallById(id, params);
  };

  const getHourlyRainfallById = () => {
    const params = prepareDurationQueryParams();
    return ubot.getHourlyRainfallById(id, params);
  };

  const { data, isFetching, isFetched, isError, isSuccess }: any = useQuery({
    queryKey: ['ubot1-rainfall', id, duration, rainfallFilterType],
    queryFn: async () =>
      rainfallFilterType === RAINFALL_FILTER_TYPE_CUMULATIVE
        ? getCumulativeRainfallById()
        : getHourlyRainfallById(),
    refetchOnWindowFocus: false,
    enabled: !!id,
  });

  return {
    data,
    isFetching,
    isFetched,
    isError,
    isSuccess,
    duration,
    setDuration,
    rainfallFilterType,
    setRainfallFilterType,
  };
}
