import React, { useEffect, useMemo, useState } from 'react';
import { Card } from 'react-bootstrap';
import { TabOption } from '@uhub/types/common';
import useUserDropDownByPlatform from '@uhub/hooks/dropdown/useUserDropDownByPlatform';
import ErrorMessage from '@uhub/components/ErrorMessage';
import { dayAndMonthFromDate, dayNameFromDate } from '@uhub/helpers';
import CustomLoader from '@uhub/components/CustomLoader';
import CustomTabs from '@uhub/components/CustomTabs';

import useFetchList from '../../../hooks/useFetchList';
import { WorkDiarySummaryListResponse } from '../types/WorkDiarySummary';
import { WORK_DIARY_SUMMARY } from '../constants/constant';
import ListEachDayWorkDiarySummary from './ListEachDayWorkDiarySummary';
import { DIT_CONNECT_PLATFORM } from '../../../constants/authKey';

const ListWorkDiarySummary: React.FC = () => {
  const [date, setDate] = useState<string>();

  const {
    data: summary,
    isFetching: isFetchingSummary,
    isError: isErrorSummary,
  } = useFetchList<WorkDiarySummaryListResponse>(WORK_DIARY_SUMMARY, {});

  const {
    data: userOptions,
    isFetching: isFetchingUserOptions,
    isError: isErrorUserOptions,
  } = useUserDropDownByPlatform({
    platform: DIT_CONNECT_PLATFORM,
  });
  // Extract latest dates from summary data
  const latestDates = summary?.data?.latestSevenDates ?? [];

  // Set initial date when summary is fetched
  useEffect(() => {
    if (latestDates.length > 0) {
      setDate(latestDates[0].replace(/\//g, '-'));
    }
  }, [latestDates]);

  // Prepare tab options using useMemo to avoid unnecessary re-renders
  const tabOptions = useMemo<TabOption[]>(() => {
    return latestDates.map((item) => {
      const formattedDate = item.replace(/\//g, '-');
      return {
        eventKey: `work-dairy-summary_${formattedDate}`,
        title: `${dayAndMonthFromDate(item)} - ${dayNameFromDate(item)}`,
        tabContent: (
          <ListEachDayWorkDiarySummary userOptions={userOptions} date={date} />
        ),
        iconClassName: 'bx bx-calendar',
      };
    });
  }, [latestDates, userOptions, date]);

  // Handle change change on tab change
  const handleDateChange = (currentTabDate: string) => {
    setDate(currentTabDate.split('_').pop());
  };

  const isFetching = isFetchingSummary || isFetchingUserOptions;

  const isError = isErrorSummary || isErrorUserOptions;

  if (isError) return <ErrorMessage />;

  return (
    <Card>
      <Card.Body>
        {isFetching ? (
          <CustomLoader />
        ) : (
          <CustomTabs tabs={tabOptions} extraFunction={handleDateChange} />
        )}
      </Card.Body>
    </Card>
  );
};

export default ListWorkDiarySummary;
