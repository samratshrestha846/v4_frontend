import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import apiAlarm from '../../../helpers/api/alarm';

import { alarmQueryParams } from '../../../types/alarm/alarm';

export default function useAlarmList() {
  const [pageNumber, setPageNumber] = useState(0);
  const [severityLevel, setSeveritylevel] = useState<string>();
  const [status, setStatus] = useState<number | null>(null);
  const [visibility, setVisibility] = useState<number | null>(null);

  const listAlarm = () => {
    const params: alarmQueryParams = { page: pageNumber + 1 };

    if (severityLevel) {
      params.severity_level = severityLevel;
    }
    if (status !== null) {
      params.status = status;
    }

    if (visibility !== null) {
      params.visible_to_customers = visibility;
    }

    return apiAlarm.getAlarmList(params);
  };

  const { data, isFetching, isError } = useQuery({
    refetchOnWindowFocus: false,
    queryFn: listAlarm,
    queryKey: ['list-alarm', pageNumber, severityLevel, status, visibility],
  });

  const handlePageChange = (e: any): void => {
    setPageNumber(e.selected);
  };

  return {
    pageNumber,
    data,
    isFetching,
    isError,
    handlePageChange,
    severityLevel,
    setSeveritylevel,
    status,
    setStatus,
    visibility,
    setVisibility,
  };
}
