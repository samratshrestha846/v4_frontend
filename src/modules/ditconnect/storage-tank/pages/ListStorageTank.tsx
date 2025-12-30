import React from 'react';
import { Card } from 'react-bootstrap';
import PageTitle from '@uhub/components/PageTitle';
import { can } from '@uhub/helpers/checkPermission';
import { DropdownFilterItem } from '@uhub/types/common';
import ErrorMessage from '@uhub/components/ErrorMessage';

import useFetchList from '../../hooks/useFetchList';
import {
  StorageTankListResponse,
  StorageTankParams,
} from '../types/StorageTank';
import {
  STORAGE_TANK,
  CREATE_STORAGE_TANK,
  STORAGE_TANK_ADD,
  STORAGE_TANK_LIST,
} from '../constants/constant';
import useUrlFilters from '../../hooks/useUrlFilters';
import StorageTankTable from './StorageTankTable';
import { FilterConfigItem } from '../../types/ditConnect';
import FilterSection from '../../components/FilterSection';

const ListStorageTank: React.FC = () => {
  const title: string = 'Storage Tank';
  const canCreate = can(CREATE_STORAGE_TANK);
  const [filters, setFilters] = useUrlFilters<StorageTankParams>();

  const { data, isFetching, isError } = useFetchList<StorageTankListResponse>(
    STORAGE_TANK,
    filters
  );

  const filterConfig: FilterConfigItem<StorageTankParams>[] = [];

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
            path: STORAGE_TANK_LIST,
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
            createPath={STORAGE_TANK_ADD}
            title={title}
          />
          <StorageTankTable
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

export default ListStorageTank;
