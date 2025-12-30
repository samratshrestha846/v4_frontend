import React from 'react';
import { Card } from 'react-bootstrap';
import PageTitle from '@uhub/components/PageTitle';
import { can } from '@uhub/helpers/checkPermission';
import { DropdownFilterItem } from '@uhub/types/common';
import useFetchList from '../../hooks/useFetchList';
import {
  FleetVehicleListResponse,
  FleetVehicleParams,
} from '../types/FleetVehicle';
import {
  FLEET_VEHICLE,
  CREATE_FLEET_VEHICLE,
  FLEET_VEHICLE_ADD,
  FLEET_VEHICLE_LIST,
} from '../constants/constant';
import useUrlFilters from '../../hooks/useUrlFilters';
import FleetVehicleTable from './FleetVehicleTable';
import { FilterConfigItem } from '../../types/ditConnect';
import FilterSection from '../../components/FilterSection';

const ListFleetVehicle: React.FC = () => {
  const title: string = 'Vehicle';
  const canCreate = can(CREATE_FLEET_VEHICLE);
  const [filters, setFilters] = useUrlFilters<FleetVehicleParams>();

  const { data, isFetching } = useFetchList<FleetVehicleListResponse>(
    FLEET_VEHICLE,
    filters
  );

  const filterConfig: FilterConfigItem<FleetVehicleParams>[] = [];

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
            label: `${title}s List`,
            path: FLEET_VEHICLE_LIST,
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
            canCreate={canCreate}
            createPath={FLEET_VEHICLE_ADD}
            title={title}
          />
          <FleetVehicleTable
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

export default ListFleetVehicle;
