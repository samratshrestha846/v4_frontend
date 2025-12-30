import { FormEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import {
  SiteAlarmFilterParams,
  SiteAlarmSetting,
} from '../../../../../../types/udose/siteAlarm';
import alarmHistory from '../../../../../../helpers/api/udose/alarmHistory';

export default function useFetchAlarmHistory() {
  const { id } = useParams();
  const { t } = useTranslation();
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);
  const [startDate, endDate] = dateRange;
  const [days, setDays] = useState<number>(60);
  const [alarmOccurrence, setAlarmOccurrence] =
    useState<Record<string, number>>();

  const [dateParams, setDateParams] = useState<SiteAlarmFilterParams | null>(
    null
  );

  const prepareQueryParams = () => {
    const params: SiteAlarmFilterParams = {};

    if (!startDate) {
      return null;
    }

    params.date_from = moment(startDate).format('YYYY-MM-DD');

    params.date_to = endDate
      ? moment(endDate).format('YYYY-MM-DD')
      : moment().format('YYYY-MM-DD');

    return params;
  };

  const getAlarmHistory = () => {
    return alarmHistory.getAlarmHistory(id, dateParams);
  };

  const { data, isFetching, isFetched, isError } = useQuery({
    queryKey: ['get-site-alarms', dateParams],
    queryFn: getAlarmHistory,
    refetchOnWindowFocus: false,
    enabled: !!id,
  });

  const getTextFromErrorCode = (
    errorCode: number,
    setting: SiteAlarmSetting
  ) => {
    const placeholders: Record<number, Object> = {
      4: { alarm_level: setting?.conductivity_alarm_level },
      8: {
        conductivity_skip_limit: setting?.conductivity_skip_limit,
        conductivity_skip_level: setting?.conductivity_skip_level,
      },
      9: { water_flow_limit: setting?.water_flow_limit_per_hr },
    };

    return (
      t(`errorCode.${errorCode}`, placeholders[errorCode]) ||
      t(`errorCode.${errorCode}`)
    );
  };

  useEffect(() => {
    setAlarmOccurrence(getAlarmOccurrence());
  }, [data]);

  const getAlarmOccurrence = () => {
    const alarmOccurrenceCount: Record<number, number> = {};
    data?.forEach((alarm) => {
      if (alarmOccurrenceCount[alarm.error_code]) {
        alarmOccurrenceCount[alarm.error_code] += 1;
      } else {
        alarmOccurrenceCount[alarm.error_code] = 1;
      }
    });
    return alarmOccurrenceCount;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (startDate) {
      const dateTo = endDate ? moment(endDate).endOf('day') : moment.now();
      const params = {
        date_from: moment
          .parseZone(startDate)
          .utc()
          .format('YYYY-MM-DD HH:mm:ss'),
        date_to: moment.parseZone(dateTo).utc().format('YYYY-MM-DD HH:mm:ss'),
      };
      setDays(moment(params.date_to).diff(moment(params.date_from), 'days'));
    }
    setDateParams(prepareQueryParams());
  };

  return {
    data,
    isFetching,
    isFetched,
    isError,
    setDateRange,
    handleSubmit,
    alarmOccurrence,
    getTextFromErrorCode,
    days,
    startDate,
    endDate,
  };
}
