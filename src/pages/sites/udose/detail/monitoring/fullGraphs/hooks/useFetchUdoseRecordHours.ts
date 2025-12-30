import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import udoseSummary from '../../../../../../../helpers/api/udose/udoseSummary';
import { DurationQueryFilterParams } from '../../../../../../../types/common';

export default function useFetchUdoseRecordHours(id?: number) {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);
  const [params, setParams] = useState<{
    date_from: string;
    date_to: string;
  } | null>(null);
  const [startDate, endDate] = dateRange;

  const prepareFilterParams = () => {
    if (startDate) {
      const dateTo = endDate ? moment(endDate) : moment.now();
      return {
        date_from: moment(startDate).format('YYYY-MM-DD'),
        date_to: moment(dateTo).format('YYYY-MM-DD'),
      };
    }
    return null;
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setParams(prepareFilterParams());
  };
  const getUdoseRecordHoursBySiteId = () => {
    const filterParams: DurationQueryFilterParams | null =
      prepareFilterParams();
    return udoseSummary.getUdoseRecordHoursById(Number(id), filterParams);
  };

  const { data, isFetching, isFetched, isError } = useQuery({
    queryKey: ['udose-record-hours-by-site-id', id, params],
    queryFn: getUdoseRecordHoursBySiteId,
    refetchOnWindowFocus: false,
    enabled: !!id,
  });

  return {
    data,
    isFetching,
    isFetched,
    isError,
    startDate,
    endDate,
    setDateRange,
    handleSubmit,
  };
}
