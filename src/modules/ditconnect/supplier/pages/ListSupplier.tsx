import React from 'react';
import { Card } from 'react-bootstrap';
import PageTitle from '@uhub/components/PageTitle';
import { can } from '@uhub/helpers/checkPermission';
import { DropdownFilterItem } from '@uhub/types/common';
import useFetchList from '../../hooks/useFetchList';
import { SupplierListResponse, SupplierParams } from '../types/Supplier';
import {
  SUPPLIER,
  CREATE_SUPPLIER,
  SUPPLIER_ADD,
  SUPPLIER_LIST,
} from '../constants/constant';
import useUrlFilters from '../../hooks/useUrlFilters';
import SupplierTable from './SupplierTable';
import { FilterConfigItem } from '../../types/ditConnect';
import FilterSection from '../../components/FilterSection';

const ListSupplier: React.FC = () => {
  const title: string = 'Supplier';
  const canCreate = can(CREATE_SUPPLIER);
  const [filters, setFilters] = useUrlFilters<SupplierParams>();

  const { data, isFetching } = useFetchList<SupplierListResponse>(
    SUPPLIER,
    filters
  );

  const filterConfig: FilterConfigItem<SupplierParams>[] = [];

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
            path: SUPPLIER_LIST,
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
            createPath={SUPPLIER_ADD}
            title={title}
          />
          <SupplierTable
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

export default ListSupplier;
