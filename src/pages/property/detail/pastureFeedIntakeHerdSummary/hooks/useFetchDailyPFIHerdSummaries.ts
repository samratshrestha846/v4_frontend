import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import ceresTagAPI from '../../../../../helpers/api/ceresTagAPI';
import { CeresTagPFIQueryParams } from '../../../../../types/ceresTag/ceresTag';
import { DURATION_LAST_24_HOURS } from '../../../../../constants/durationOptions';
import filterByFromToDateQueryParams from '../../../../../helpers/filterHelper';

export default function useFetchDailyPFIHerdSummaries() {
  const { id } = useParams();

  const [duration, setDuration] = useState(DURATION_LAST_24_HOURS);

  const fetchDailyPFIHerdSummary = () => {
    const params: CeresTagPFIQueryParams =
      filterByFromToDateQueryParams(duration);
    return ceresTagAPI.fetchDailyPFIHerdSummary(params, id);
  };

  const { data, isFetching, isError } = useQuery(
    ['list-ceres-tags', duration],
    fetchDailyPFIHerdSummary,
    { refetchOnWindowFocus: false }
  );

  const handleChangeDuration = (selected: any) => {
    setDuration(selected.value);
  };

  return {
    data,
    isFetching,
    isError,
    duration,
    handleChangeDuration,
  };
}
