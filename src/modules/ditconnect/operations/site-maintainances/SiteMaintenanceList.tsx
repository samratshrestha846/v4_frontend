import React from 'react';
import { Card } from 'react-bootstrap';
import PageTitle from '@uhub/components/PageTitle';
import { DropdownFilterItem, UserQueryParam } from '@uhub/types/common';
import useUserDropDownByPlatform from '@uhub/hooks/dropdown/useUserDropDownByPlatform';

import { can } from '@uhub/helpers/checkPermission';
import FilterSection from '../../components/FilterSection';
import ListTable from './ListTable';
import useFetchList from '../../hooks/useFetchList';
import { SiteMaintenanceListResponse } from './types/siteMaintenance';
import useUrlFilters from '../../hooks/useUrlFilters';
import { FilterConfigItem } from '../../types/ditConnect';
import {
  CREATE_SITE_MAINTENANCE,
  SITE_MAINTENANCE_ADD,
  SITE_MAINTENANCE_LIST,
  SITE_MAINTENANCES,
} from './constants/constant';
import { DIT_CONNECT_PLATFORM } from '../../constants/authKey';

const SiteMaintenanceList: React.FC = () => {
  const title: string = 'Site Maintenance';
  const canCreate = can(CREATE_SITE_MAINTENANCE);
  const {
    data: userOptions,
    isFetching: isFetchingUserOptions,
    isError: isErrorUserOptions,
  } = useUserDropDownByPlatform({
    platform: DIT_CONNECT_PLATFORM,
  });
  const [filters, setFilters] = useUrlFilters<UserQueryParam>();

  const filterConfig: FilterConfigItem<UserQueryParam>[] = [
    {
      filterType: 'Users',
      key: 'user_id',
      isMulti: false,
      dataOptions: userOptions,
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

  const { data, isFetching, isError } =
    useFetchList<SiteMaintenanceListResponse>(SITE_MAINTENANCES, filters);
  return (
    <>
      <PageTitle
        breadCrumbItems={[
          {
            label: `${title} List`,
            path: SITE_MAINTENANCE_LIST,
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
            title={title}
            canCreate={canCreate}
            createPath={SITE_MAINTENANCE_ADD}
          />
          <ListTable
            isFetching={isFetching || isFetchingUserOptions}
            isError={isError || isErrorUserOptions}
            data={data}
            filters={filters}
            setFilters={setFilters}
          />
        </Card.Body>
      </Card>
    </>
  );
};

export default SiteMaintenanceList;
