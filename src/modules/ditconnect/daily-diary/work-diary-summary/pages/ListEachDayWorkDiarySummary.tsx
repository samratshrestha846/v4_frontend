import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import ErrorMessage from '@uhub/components/ErrorMessage';
import { DropdownFilterItem, LabelNumericValue } from '@uhub/types/common';

import useFetchList from '../../../hooks/useFetchList';
import { WORK_DIARY } from '../../work-diary/constants/constant';
import { WorkDiaryListResponse } from '../../work-diary/types/WorkDiary';
import ListEachDayWorkDiaryTable from './ListEachDayWorkDiaryTable';
import {
  WorkDiarySummaryListResponse,
  WorkDiarySummaryParams,
} from '../types/WorkDiarySummary';
import WorkDiaryFilledInfo from './components/WorkDiaryFilledInfo';
import UserYetToFillWorkDiary from './components/UserYetToFillWorkDiary';
import { WORK_DIARY_SUMMARY } from '../constants/constant';

import FilterSection from '../../../components/FilterSection';
import { FilterConfigItem } from '../../../types/ditConnect';

type Props = {
  userOptions: LabelNumericValue[];
  date?: string;
};

const ListEachDayWorkDiarySummary: React.FC<Props> = ({
  userOptions,
  date,
}) => {
  const [filters, setFilters] = useState<Record<string, any>>({});

  const {
    data,
    isFetching: isFetchingWorkDiary,
    isError: isErrorWorkDiary,
  } = useFetchList<WorkDiaryListResponse>(WORK_DIARY, { ...filters, date });

  const {
    data: summary,
    isFetching: isFetchingSummary,
    isError: isErrorSummary,
  } = useFetchList<WorkDiarySummaryListResponse>(WORK_DIARY_SUMMARY, {
    ...filters,
    date,
  });

  const filterConfig: FilterConfigItem<WorkDiarySummaryParams>[] = [
    {
      filterType: 'User',
      key: 'user_id',
      isMulti: false,
      dataOptions: userOptions ?? [],
    },
  ];

  const filterFields: DropdownFilterItem[] = filterConfig.map((f) => ({
    filterType: f.filterType,
    dataOptions: f.dataOptions,
    isMulti: f.isMulti,
    data: filters[f.key],
    setFilterData: (val: any) =>
      setFilters({
        ...filters,
        [f.key]: val,
      }),
  }));

  useEffect(() => {
    setFilters({ ...filters, date });
  }, [date]);

  const isFetching = isFetchingSummary || isFetchingWorkDiary;

  const isError = isErrorSummary || isErrorWorkDiary;

  if (isError) return <ErrorMessage />;

  return (
    <Card>
      <Card.Body>
        <FilterSection
          filterFields={filterFields}
          filters={filters}
          setFilters={setFilters}
          canCreate={false}
          createPath={undefined}
        />

        {summary?.data && (
          <WorkDiaryFilledInfo
            totalFilledUsers={
              summary.data.totActiveStaff -
              summary.data.workDiaryYetToCreateUsers.length
            }
            totalUsers={summary.data.totActiveStaff}
          />
        )}
        <ListEachDayWorkDiaryTable
          isFetching={isFetching}
          data={data}
          filters={filters}
          setFilters={setFilters}
        />
        <hr />
        <UserYetToFillWorkDiary
          users={summary?.data?.workDiaryYetToCreateUsers ?? []}
        />
      </Card.Body>
    </Card>
  );
};

export default ListEachDayWorkDiarySummary;
