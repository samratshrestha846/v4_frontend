import React from 'react';
import { Card } from 'react-bootstrap';
import PageTitle from '@uhub/components/PageTitle';
import { can } from '@uhub/helpers/checkPermission';
import { DropdownFilterItem } from '@uhub/types/common';
import useCustomersDropdown from '@uhub/hooks/dropdown/useCustomersDropdown';
import usePropertiesDropdown from '@uhub/hooks/dropdown/usePropertiesDropdown';
import useFetchList from '../../hooks/useFetchList';
import {
  salesOrderConfirmationStatusOptions,
  SalesOrderListResponse,
  SalesOrderParams,
} from '../types/SalesOrder';
import {
  SALES_ORDER,
  CREATE_SALES_ORDER,
  SALES_ORDER_ADD,
  SALES_ORDER_LIST,
} from '../constants/constant';
import useUrlFilters from '../../hooks/useUrlFilters';
import SalesOrderTable from './SalesOrderTable';
import { FilterConfigItem } from '../../types/ditConnect';
import FilterSection from '../../components/FilterSection';

const ListSalesOrder: React.FC = () => {
  const title: string = 'Sales Order';
  const canCreate = can(CREATE_SALES_ORDER);
  const [filters, setFilters] = useUrlFilters<SalesOrderParams>();
  const {
    customersDropdown,
    isFetchingCustomersDropdown,
    isErrorCustomersDropdown,
  } = useCustomersDropdown();
  const {
    data: propertyOptions,
    isFetching: isFetchingPropertyOption,
    isError: isPropertyOptionsError,
  } = usePropertiesDropdown();
  const { data, isFetching } = useFetchList<SalesOrderListResponse>(
    SALES_ORDER,
    filters
  );

  const filterConfig: FilterConfigItem<SalesOrderParams>[] = [
    {
      filterType: 'Customer',
      key: 'customer_id',
      isMulti: false,
      dataOptions: customersDropdown,
    },
    {
      filterType: 'Property',
      key: 'customer_property_id',
      isMulti: false,
      dataOptions: propertyOptions,
    },
    {
      filterType: 'Status',
      key: 'status',
      isMulti: false,
      dataOptions: salesOrderConfirmationStatusOptions,
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
            path: SALES_ORDER_LIST,
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
            createPath={SALES_ORDER_ADD}
            title={title}
          />
          <SalesOrderTable
            isError={isErrorCustomersDropdown || isPropertyOptionsError}
            isFetching={
              isFetching ||
              isFetchingCustomersDropdown ||
              isFetchingPropertyOption
            }
            data={data}
            filters={filters}
            setFilters={setFilters}
          />
        </Card.Body>
      </Card>
    </>
  );
};

export default ListSalesOrder;
