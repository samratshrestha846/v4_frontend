import React from 'react';
import { Card } from 'react-bootstrap';
import PageTitle from '@uhub/components/PageTitle';
import { DropdownFilterItem } from '@uhub/types/common';
import ErrorMessage from '@uhub/components/ErrorMessage';

import useFetchList from '../../hooks/useFetchList';
import {
  FleetMaintenanceListResponse,
  FleetMaintenanceParams,
} from '../types/FleetMaintenance';
import {
  FLEET_MAINTENANCE,
  FLEET_MAINTENANCE_LIST,
  FLEET_MAINTENANCE_STATUS_OPTIONS,
} from '../constants/constant';
import useUrlFilters from '../../hooks/useUrlFilters';
import FleetMaintenanceTable from './FleetMaintenanceTable';
import { FilterConfigItem } from '../../types/ditConnect';
import FilterSection from '../../components/FilterSection';

const ListFleetMaintenance: React.FC = () => {
  const title: string = 'Fleet Maintenance';
  const [filters, setFilters] = useUrlFilters<FleetMaintenanceParams>();

  const { data, isFetching, isError } =
    useFetchList<FleetMaintenanceListResponse>(FLEET_MAINTENANCE, filters);

  const filterConfig: FilterConfigItem<FleetMaintenanceParams>[] = [
    {
      filterType: 'Status',
      key: 'status',
      isMulti: false,
      dataOptions: FLEET_MAINTENANCE_STATUS_OPTIONS,
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

  if (isError) return <ErrorMessage />;

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          {
            label: `${title} List`,
            path: FLEET_MAINTENANCE_LIST,
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
            createPath={undefined}
            title={title}
          />
          <FleetMaintenanceTable
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

export default ListFleetMaintenance;
