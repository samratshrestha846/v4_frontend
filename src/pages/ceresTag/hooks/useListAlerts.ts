import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import ceresTagAPI from '../../../helpers/api/ceresTagAPI';
import {
  CeresTagAlert,
  CeresTagQueryParams,
} from '../../../types/ceresTag/ceresTag';
import { formattedYmdDate } from '../../../helpers';
import { DURATION_LAST_24_HOURS } from '../../../constants/durationOptions';
import { LabelValueDropdown } from '../../../types/common';
import filterByFromToDateQueryParams from '../../../helpers/filterHelper';

export default function useListAlerts(ceresTagId?: string | undefined) {
  const [pageNumber, setPageNumber] = useState(0);

  const [loading, setLoading] = useState(false);
  const [alerts, setAlerts] = useState<
    { date: string; alerts: CeresTagAlert[] }[]
  >([]);

  const [duration, setDuration] = useState(DURATION_LAST_24_HOURS);

  const handleChangeDuration = (selected: LabelValueDropdown) => {
    setDuration(selected.value);
  };

  const fetchAlerts = () => {
    let params: CeresTagQueryParams = { page: pageNumber + 1 };

    if (duration) {
      params = { ...params, ...filterByFromToDateQueryParams(duration) };
    }

    return ceresTagAPI.fetchAlerts(params, ceresTagId);
  };

  const { data, isFetching, isError } = useQuery(
    ['list-alerts', pageNumber, duration],
    fetchAlerts,
    { refetchOnWindowFocus: false, enabled: !!ceresTagId }
  );

  const handlePageChange = (e: any): void => {
    setPageNumber(e.selected);
  };

  useEffect(() => {
    if (data) {
      setLoading(true);
      prepareObservations(data!.body);
    }
  }, [data]);

  const prepareObservations = (rawData: CeresTagAlert[]) => {
    const listDate: string[] = [];
    const preparedData: any[] = [];
    rawData?.forEach((item) => {
      const date = formattedYmdDate(item.alert_timestamp);

      if (!listDate.includes(date)) {
        listDate.push(date);
      }
    });

    listDate?.forEach((element) => {
      const groupedData: any[] = [];
      rawData?.forEach((item) => {
        if (element === formattedYmdDate(item.alert_timestamp)) {
          groupedData.push(item);
        }
      });
      preparedData.push({ date: element, alerts: groupedData });
    });
    setLoading(false);
    setAlerts(preparedData);
  };

  return {
    alerts,
    loading,
    data,
    isFetching,
    isError,
    pageNumber,
    handlePageChange,
    duration,
    handleChangeDuration,
  };
}
