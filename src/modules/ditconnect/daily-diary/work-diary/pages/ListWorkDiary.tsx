import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import { CustomDropdownMenuItem, DropdownFilterItem } from '@uhub/types/common';
import useUserDropDownByPlatform from '@uhub/hooks/dropdown/useUserDropDownByPlatform';
import ErrorMessage from '@uhub/components/ErrorMessage';
import Loader from '@uhub/components/Loader';

import useFetchList from '../../../hooks/useFetchList';
import { WorkDiaryListResponse, WorkDiaryParams } from '../types/WorkDiary';
import {
  WORK_DIARY,
  WORK_DIARY_GROUP_OPTIONS,
  EXPORT_WORK_DIARY,
  WORK_DIARY_EXPORT_ENDPOINT,
} from '../constants/constant';
import WorkDiaryTable from './WorkDiaryTable';
import { FilterConfigItem } from '../../../types/ditConnect';
import FilterSection from '../../../components/FilterSection';
import useFileExport from '../../../hooks/useFileExport';
import { DIT_CONNECT_PLATFORM } from '../../../constants/authKey';

const ListWorkDiary: React.FC = () => {
  const title: string = 'Work Diary';
  const [filters, setFilters] = useState<Record<string, any>>({});

  const {
    data,
    isFetching: isFEtchingWorkDiaries,
    isError: isErrorWorkDiaries,
  } = useFetchList<WorkDiaryListResponse>(WORK_DIARY, filters);

  const {
    data: userOptions,
    isFetching: isFetchingUserOptions,
    isError: isErrorUserOptions,
  } = useUserDropDownByPlatform({
    platform: DIT_CONNECT_PLATFORM,
  });

  const { handleExport, isExporting } = useFileExport({
    filters,
    endpoint: WORK_DIARY_EXPORT_ENDPOINT,
    downloadFileName: title,
  }); // downloadFileExtension is xlsx by default

  const filterConfig: FilterConfigItem<WorkDiaryParams>[] = [
    {
      filterType: 'User',
      key: 'user_id',
      isMulti: false,
      dataOptions: userOptions ?? [],
    },
    {
      filterType: 'Group',
      key: 'group',
      isMulti: false,
      dataOptions: WORK_DIARY_GROUP_OPTIONS,
    },
    {
      filterType: 'Start Date',
      key: 'start_date',
      isDateField: true,
    },
    {
      filterType: 'End Date',
      key: 'end_date',
      isDateField: true,
    },
  ];

  const actionDropdownItems: CustomDropdownMenuItem[] = [
    {
      label: 'Export Work Diary',
      icon: 'bx bx-export',
      actionMethod: handleExport,
      permission: EXPORT_WORK_DIARY,
    },
  ];

  const filterFields: DropdownFilterItem[] = filterConfig.map((f) => ({
    filterType: f.filterType,
    dataOptions: f?.dataOptions ?? [],
    isMulti: !!f?.isMulti,
    isDateField: !!f?.isDateField,
    data: filters[f.key],
    setFilterData: (val: any) =>
      setFilters({
        ...filters,
        [f.key]: val,
      }),
  }));

  const isFetching = isFEtchingWorkDiaries || isFetchingUserOptions;

  if (isErrorWorkDiaries || isErrorUserOptions) return <ErrorMessage />;

  return (
    <>
      {isExporting && <Loader />}

      <Card>
        <Card.Body>
          <FilterSection
            filterFields={filterFields}
            filters={filters}
            setFilters={setFilters}
            canCreate={false}
            createPath={undefined}
            title={title}
            actionDropdownItems={actionDropdownItems}
          />
          <WorkDiaryTable
            isFetching={isFetching}
            data={data}
            filters={filters}
            setFilters={setFilters}
          />
        </Card.Body>
      </Card>
    </>
  );
};

export default ListWorkDiary;
