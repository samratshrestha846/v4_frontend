import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import ceresTagAPI from '../../../helpers/api/ceresTagAPI';

import {
  CeresTagObservation,
  CeresTagObservationNewData,
  CeresTagObservationQueryParams,
  CeresWildObservationNewData,
} from '../../../types/ceresTag/ceresTag';
import { DURATION_LAST_24_HOURS } from '../../../constants/durationOptions';
import { LabelValueDropdown } from '../../../types/common';
import filterByFromToDateQueryParams from '../../../helpers/filterHelper';
import { formattedYmdDate } from '../../../helpers';

export default function useListObservations(ceresTagId?: number) {
  const [pageNumber, setPageNumber] = useState(0);
  const [loading, setLoading] = useState(false);
  const [observations, setObservations] = useState<
    {
      date: string;
      observations:
        | CeresTagObservation[]
        | CeresTagObservationNewData[]
        | CeresWildObservationNewData[];
    }[]
  >([]);

  const [duration, setDuration] = useState(DURATION_LAST_24_HOURS);

  const handleChangeDuration = (selected: LabelValueDropdown) => {
    setDuration(selected.value);
  };

  const fetchObservations = () => {
    let params: CeresTagObservationQueryParams = {
      page: pageNumber + 1,
      page_size: 20,
    };

    if (duration) {
      params = { ...params, ...filterByFromToDateQueryParams(duration) };
    }

    return ceresTagAPI.fetchObservations(params, String(ceresTagId));
  };

  const { data, isFetching, isFetched, isError } = useQuery({
    queryKey: ['observations-by-ceres-tag', ceresTagId, pageNumber, duration],
    queryFn: fetchObservations,
    refetchOnWindowFocus: false,
    enabled: !!ceresTagId,
  });

  const handlePageChange = (e: any): void => {
    setPageNumber(e.selected);
  };

  useEffect(() => {
    if (data) {
      setLoading(true);
      prepareObservations(data.body);
    }
  }, [data]);

  const prepareObservations = (
    rawData:
      | CeresTagObservation[]
      | CeresTagObservationNewData[]
      | CeresWildObservationNewData[]
  ) => {
    const listDate: string[] = [];
    const preparedData: any[] = [];

    rawData?.forEach((item) => {
      const date = formattedYmdDate(item.observation_date);

      if (!listDate.includes(date)) {
        listDate.push(date);
      }
    });

    listDate?.forEach((element) => {
      const groupedData: (
        | CeresTagObservation
        | CeresTagObservationNewData
        | CeresWildObservationNewData
      )[] = [];
      rawData?.forEach((item) => {
        if (element === formattedYmdDate(item.observation_date)) {
          groupedData.push(item);
        }
      });
      preparedData.push({ date: element, observations: groupedData });
    });
    setLoading(false);
    setObservations(preparedData);
  };

  return {
    data,
    isFetching,
    isFetched,
    isError,
    observations,
    loading,
    pageNumber,
    handlePageChange,
    duration,
    handleChangeDuration,
  };
}
