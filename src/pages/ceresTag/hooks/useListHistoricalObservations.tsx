import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import ceresTagAPI from '../../../helpers/api/ceresTagAPI';
import {
  CeresTagObservation,
  CeresTagObservationNewData,
  CeresTagObservationQueryParams,
  CeresWildObservationNewData,
} from '../../../types/ceresTag/ceresTag';
import { formattedYmdDate } from '../../../helpers';
import { LabelValueDropdown } from '../../../types/common';
import {
  CERES_TAG_HISTORICAL_DATA_FROM_BEGINNING,
  CERES_TAG_HISTORICAL_DATA_TO_TODAY,
} from '../../../constants/ceresTagConstants';

export default function useListHistoricalObservations(ceresTagId?: number) {
  const [pageNumber, setPageNumber] = useState(0);
  const [loading, setLoading] = useState(false);

  const [duration, setDuration] = useState<string>();

  const handleChangeDuration = (selected?: LabelValueDropdown) => {
    setDuration(selected ? selected.value : undefined);
  };

  const [observations, setObservations] = useState<
    {
      date: string;
      observations:
        | CeresTagObservation[]
        | CeresTagObservationNewData[]
        | CeresWildObservationNewData[];
    }[]
  >([]);

  const fetchHistoricalObservations = () => {
    const params: CeresTagObservationQueryParams = {
      page: pageNumber + 1,
      page_size: 20,
    };

    const fromToDate = duration ? duration.split('-') : [undefined, undefined];

    if (
      fromToDate[0] &&
      fromToDate[0] !== CERES_TAG_HISTORICAL_DATA_FROM_BEGINNING
    ) {
      params.as_of_date_from = moment(fromToDate[0])
        .utc()
        .format('YYYY-MM-DD hh:mm:ss');
    }

    if (fromToDate[1] && fromToDate[1] !== CERES_TAG_HISTORICAL_DATA_TO_TODAY) {
      params.as_of_date_to = moment(fromToDate[1])
        .utc()
        .format('YYYY-MM-DD hh:mm:ss');
    }

    return ceresTagAPI.fetchHistoricalObservations(params, String(ceresTagId));
  };

  const { data, isFetching, isFetched, isError } = useQuery({
    queryKey: ['historical-observations', ceresTagId, pageNumber, duration],
    queryFn: fetchHistoricalObservations,
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
    setDuration,
    handleChangeDuration,
  };
}
