import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import moment from 'moment';
import udoseSummary from '../../../../../../helpers/api/udose/udoseSummary';
import {
  CONDUCTIVITY_PROBE_MODE_ENABLED,
  CONDUCTIVITY_PROBE_MODE_REPORTING,
} from '../../../../../../constants/udoseSettings';
import {
  DURATION_LAST_14_DAYS,
  DURATION_LAST_3_MONTHS,
  DURATION_LAST_6_MONTHS,
  DURATION_LAST_7_DAYS,
  DURATION_LAST_MONTH,
  DURATION_YEAR_TO_DATE,
} from '../../../../../../constants/durationOptions';
import { UdoseSummaryFilterParams } from '../../../../../../types/udose/udoseSummary';

export default function useUdoseMonitoring() {
  const { id } = useParams();

  const [isConductivityProbeInstalled, setIsConductivityProbeInstalled] =
    useState<boolean>();

  const stateSite = useSelector((state: any) => state.Site);
  const { siteDetail } = stateSite;

  const [selectedDate, setSelectedDate] = useState<string | number>(
    DURATION_LAST_7_DAYS
  );

  const prepareFilterParams = () => {
    const duration = selectedDate;
    let startDate = null;
    let endDate = null;
    if (duration) {
      const currentDate = moment();
      if (duration === DURATION_LAST_7_DAYS) {
        startDate = moment().subtract(7, 'days');
        endDate = currentDate;
      }

      if (duration === DURATION_LAST_14_DAYS) {
        startDate = moment().subtract(14, 'days');
        endDate = currentDate;
      }

      if (duration === DURATION_LAST_MONTH) {
        startDate = moment().subtract(1, 'month').startOf('month');
        endDate = currentDate;
      }

      if (duration === DURATION_LAST_3_MONTHS) {
        startDate = moment().subtract(3, 'month').startOf('month');
        endDate = currentDate;
      }

      if (duration === DURATION_LAST_6_MONTHS) {
        startDate = moment().subtract(6, 'month').startOf('month');
        endDate = currentDate;
      }

      if (duration === DURATION_YEAR_TO_DATE) {
        startDate = moment().startOf('year').startOf('month');
        endDate = currentDate;
      }

      startDate = startDate?.startOf('day');
      endDate = endDate?.endOf('day');

      return {
        date_from: moment
          .parseZone(startDate)
          .utc()
          .format('YYYY-MM-DD HH:mm:ss'),
        date_to: moment.parseZone(endDate).utc().format('YYYY-MM-DD HH:mm:ss'),
      };
    }
    return null;
  };

  const getUdoseRecordSummaryBySiteId = () => {
    const filterParams: UdoseSummaryFilterParams | null = prepareFilterParams();
    return udoseSummary.getUdoseRecordSummary(id, filterParams);
  };

  const { data, isFetching, isFetched } = useQuery({
    queryKey: ['udose-redcord-summary-by-site-id', id, selectedDate],
    queryFn: getUdoseRecordSummaryBySiteId,
    refetchOnWindowFocus: false,
    enabled: !!id,
  });

  useEffect(() => {
    setIsConductivityProbeInstalled(
      siteDetail?.latest_setting?.conductivity_probe_mode ===
        CONDUCTIVITY_PROBE_MODE_ENABLED ||
        siteDetail?.latest_setting?.conductivity_probe_mode ===
          CONDUCTIVITY_PROBE_MODE_REPORTING
    );
  }, []);

  return {
    data,
    isFetching,
    isFetched,
    isConductivityProbeInstalled,
    siteDetail,
    selectedDate,
    setSelectedDate,
  };
}
