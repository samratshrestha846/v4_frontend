import React from 'react';
import { Card } from 'react-bootstrap';
import PageTitle from '@uhub/components/PageTitle';
import { DropdownFilterItem } from '@uhub/types/common';
import useFetchList from '../../hooks/useFetchList';
import {
  ActivityLogListResponse,
  ActivityLogParams,
} from '../types/ActivityLog';
import { ACTIVITY_LOG, ACTIVITY_LOG_LIST } from '../constants/constant';
import useUrlFilters from '../../hooks/useUrlFilters';
import ActivityLogTable from './ActivityLogTable';
import { FilterConfigItem } from '../../types/ditConnect';
import FilterSection from '../../components/FilterSection';

const ListActivityLog: React.FC = () => {
  const title: string = 'Activity Log';
  const [filters, setFilters] = useUrlFilters<ActivityLogParams>();

  const { data, isFetching } = useFetchList<ActivityLogListResponse>(
    ACTIVITY_LOG,
    filters
  );

  const filterConfig: FilterConfigItem<ActivityLogParams>[] = [];

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

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          {
            label: `${title} List`,
            path: ACTIVITY_LOG_LIST,
            active: true,
          },
        ]}
        title={`${title}s`}
      />

      <Card>
        <Card.Body>
          <FilterSection
            filterFields={filterFields}
            filters={filters}
            setFilters={setFilters}
            canCreate={false}
            title={title}
          />
          <ActivityLogTable
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

export default ListActivityLog;
