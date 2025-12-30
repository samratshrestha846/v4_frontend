import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import { CustomDropdownMenuItem, DropdownFilterItem } from '@uhub/types/common';
import useUserDropDownByPlatform from '@uhub/hooks/dropdown/useUserDropDownByPlatform';
import ErrorMessage from '@uhub/components/ErrorMessage';
import Loader from '@uhub/components/Loader';
import useFetchList from '../../../hooks/useFetchList';
import {
  TravelDiaryListResponse,
  TravelDiaryParams,
} from '../types/TravelDiary';
import {
  EXPORT_TRAVEL_DIARY,
  TRAVEL_DIARY,
  TRAVEL_DIARY_EXPORT_ENDPOINT,
} from '../constants/constant';
import TravelDiaryTable from './TravelDiaryTable';
import { FilterConfigItem } from '../../../types/ditConnect';
import FilterSection from '../../../components/FilterSection';
import useFileExport from '../../../hooks/useFileExport';
import { DIT_CONNECT_PLATFORM } from '../../../constants/authKey';

const ListTravelDiary: React.FC = () => {
  const title: string = 'Travel Diary';
  const [filters, setFilters] = useState<Record<string, any>>({});

  const {
    data,
    isFetching: isFetchingTravelDiaries,
    isError: isErrorTravelDiaries,
  } = useFetchList<TravelDiaryListResponse>(TRAVEL_DIARY, filters);

  const {
    data: userOptions,
    isFetching: isFetchingUserOptions,
    isError: isErrorUserOptions,
  } = useUserDropDownByPlatform({
    platform: DIT_CONNECT_PLATFORM,
  });

  const { handleExport, isExporting } = useFileExport({
    filters,
    endpoint: TRAVEL_DIARY_EXPORT_ENDPOINT,
    downloadFileName: title,
  }); // downloadFileExtension is xlsx by default

  const filterConfig: FilterConfigItem<TravelDiaryParams>[] = [
    {
      filterType: 'User',
      key: 'user_id',
      isMulti: false,
      dataOptions: userOptions ?? [],
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
      label: 'Export Travel Diary',
      icon: 'bx bx-export',
      actionMethod: handleExport,
      permission: EXPORT_TRAVEL_DIARY,
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

  const isFetching = isFetchingTravelDiaries || isFetchingUserOptions;

  if (isErrorTravelDiaries || isErrorUserOptions) return <ErrorMessage />;

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
          <TravelDiaryTable
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

export default ListTravelDiary;
