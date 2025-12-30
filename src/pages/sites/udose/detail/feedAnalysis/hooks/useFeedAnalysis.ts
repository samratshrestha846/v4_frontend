import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  BREAKDOWN_TYPE_ANIMAL,
  BREAKDOWN_TYPE_WATER,
} from '../constants/FilterConstant';
import { SupplementFeedAnalysisFilterParams } from '../../../../../../types/udose/supplementFeedAnalysis';

import feedAnalysis from '../../../../../../helpers/api/udose/feedAnalysis';
import { DURATION_LAST_7_DAYS } from '../../../../../../constants/durationOptions';

export default function useFeedAnalysis() {
  const { id } = useParams();
  const headCount = 'Head Count';
  const waterIntake = 'Water Intake Per Head Per Day(Litres)';

  const [filterParams, setFilterParams] = useState<{
    breakdown_number: number | undefined;
    duration: string | undefined;
  }>();
  const [breakdownAs, setBreakdownAs] = useState<string>(BREAKDOWN_TYPE_WATER);
  const [breakdownNumberLabel, setBreakdownNumberLabel] = useState(waterIntake);
  const [duration, setDuration] = useState<string | undefined>(
    DURATION_LAST_7_DAYS
  );
  const [breakdownNumber, setBreakdownNumber] = useState<number>();

  const getSupplementFeedAnalysis = () => {
    const params: SupplementFeedAnalysisFilterParams = {
      site_id: id,
      breakdown_as: breakdownAs,
    };

    if (filterParams?.breakdown_number) {
      params.breakdown_number = filterParams.breakdown_number;
    }

    if (filterParams?.duration) {
      params.duration = filterParams.duration;
    }

    return feedAnalysis.getSupplementFeedAnalysis(params);
  };

  const { data, isFetching, isFetched, isError, error } = useQuery({
    queryKey: ['supplement-feed-analysis', filterParams],
    queryFn: getSupplementFeedAnalysis,
    refetchOnWindowFocus: false,
    enabled: !!id,
  });

  const calculate = () => {
    const params: any = {};
    if (breakdownNumber) {
      params.breakdown_number = breakdownNumber;
    }

    if (duration) {
      params.duration = duration;
    }

    setFilterParams({ breakdown_number: breakdownNumber, duration });
  };

  const getAeToDseEquivalentMessage = () => {
    const aeToDseEquivalent = data?.site?.site_settings.find(
      (item) => item.key === 'ae-to-dse-equivalent'
    );
    const livestockTypeItem = data?.site?.site_settings.find(
      (item) => item.key === 'livestock-type'
    );

    if (aeToDseEquivalent && livestockTypeItem) {
      return `AE to DSE Equivalent for ${livestockTypeItem.value} is ${aeToDseEquivalent.value}.`;
    }
    return null;
  };

  useEffect(() => {
    if (data) {
      setBreakdownAs(data.filters?.breakdown_as);
      setBreakdownNumber(Number(data.filters?.breakdown_number));
      setDuration(data.filters?.duration);
    }
  }, [data]);

  useEffect(() => {
    if (breakdownAs === BREAKDOWN_TYPE_ANIMAL) {
      setBreakdownNumberLabel(headCount);
    } else {
      setBreakdownNumberLabel(waterIntake);
    }
  }, [breakdownAs]);

  return {
    data,
    isFetching,
    isFetched,
    isError,
    error,
    breakdownAs,
    setBreakdownAs,
    getAeToDseEquivalentMessage,
    headCount,
    calculate,
    breakdownNumberLabel,
    setBreakdownNumberLabel,
    breakdownNumber,
    setBreakdownNumber,
    duration,
    setDuration,
  };
}
