import React from 'react';
import { Card } from 'react-bootstrap';
import PageTitle from '@uhub/components/PageTitle';
import { can } from '@uhub/helpers/checkPermission';
import { DropdownFilterItem } from '@uhub/types/common';
import useFetchList from '../../hooks/useFetchList';
import {
  InventoryLocationListResponse,
  InventoryLocationParams,
} from '../types/InventoryLocation';
import {
  INVENTORY_LOCATION,
  CREATE_INVENTORY_LOCATION,
  INVENTORY_LOCATION_ADD,
  INVENTORY_LOCATION_LIST,
} from '../constants/constant';
import useUrlFilters from '../../hooks/useUrlFilters';
import InventoryLocationTable from './InventoryLocationTable';
import { FilterConfigItem } from '../../types/ditConnect';
import FilterSection from '../../components/FilterSection';

const ListInventoryLocation: React.FC = () => {
  const title: string = 'Inventory Location';
  const canCreate = can(CREATE_INVENTORY_LOCATION);
  const [filters, setFilters] = useUrlFilters<InventoryLocationParams>();

  const { data, isFetching } = useFetchList<InventoryLocationListResponse>(
    INVENTORY_LOCATION,
    filters
  );

  const filterConfig: FilterConfigItem<InventoryLocationParams>[] = [];

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
            path: INVENTORY_LOCATION_LIST,
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
            createPath={INVENTORY_LOCATION_ADD}
            title={title}
          />
          <InventoryLocationTable
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

export default ListInventoryLocation;
