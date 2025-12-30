import React from 'react';
import { Card } from 'react-bootstrap';
import PageTitle from '@uhub/components/PageTitle';
import { can } from '@uhub/helpers/checkPermission';
import { DropdownFilterItem } from '@uhub/types/common';
import { WORK_DIARY_GROUP_OPTIONS } from '../../daily-diary/work-diary/constants/constant';
import useFetchList from '../../hooks/useFetchList';
import {
  RndActivityListResponse,
  RndActivityParams,
} from '../types/RndActivity';
import {
  RND_ACTIVITY,
  CREATE_RND_ACTIVITY,
  RND_ACTIVITY_ADD,
  RND_ACTIVITY_LIST,
  RND_ACTIVITY_STATUS_OPTIONS,
} from '../constants/constant';
import useUrlFilters from '../../hooks/useUrlFilters';
import RndActivityTable from './RndActivityTable';
import { FilterConfigItem } from '../../types/ditConnect';
import FilterSection from '../../components/FilterSection';

const ListRndActivity: React.FC = () => {
  const title: string = 'RndActivity';
  const canCreate = can(CREATE_RND_ACTIVITY);
  const [filters, setFilters] = useUrlFilters<RndActivityParams>();

  const { data, isFetching, isError } = useFetchList<RndActivityListResponse>(
    RND_ACTIVITY,
    filters
  );

  // const filterConfig: FilterConfigItem<RndActivityParams>[] = [];
  const filterConfig: FilterConfigItem<RndActivityParams>[] = [
    {
      filterType: 'Group',
      key: 'group',
      isMulti: false,
      dataOptions: WORK_DIARY_GROUP_OPTIONS,
    },
    {
      filterType: 'Status',
      key: 'status',
      isMulti: false,
      dataOptions: RND_ACTIVITY_STATUS_OPTIONS,
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

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          {
            label: `${title} List`,
            path: RND_ACTIVITY_LIST,
            active: true,
          },
        ]}
        title={title}
      />

      <Card>
        <Card.Body>
          <FilterSection
            filterFields={filterFields}
            filters={filters}
            setFilters={setFilters}
            canCreate={canCreate}
            createPath={RND_ACTIVITY_ADD}
            title={title}
          />
          <RndActivityTable
            isFetching={isFetching}
            isError={isError}
            data={data}
            filters={filters}
            setFilters={setFilters}
          />
        </Card.Body>
      </Card>
    </>
  );
};

export default ListRndActivity;
