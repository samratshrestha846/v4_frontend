import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import {
  CustomDropdownMenuItem,
  DropdownFilterItem,
  LabelValue,
} from '@uhub/types/common';
import CustomLoader from '@uhub/components/CustomLoader';
import useFetchList from '../../../hooks/useFetchList';
import {
  SupplementInventoryListResponse,
  SupplementInventoryParams,
} from '../types/SupplementInventory';
import {
  EXPORT_SUPPLEMENT_INVENTORY,
  SUPPLEMENT_INVENTORY,
} from '../constants/constant';
import SupplementInventoryTable from './SupplementInventoryTable';
import { FilterConfigItem } from '../../../types/ditConnect';
import FilterSection from '../../../components/FilterSection';
import useDropDown from '../../../hooks/useDropDown';
import {
  DROPDOWN_LOCATION,
  DROPDOWN_SUPPLEMENT,
} from '../../../constants/apiUrls';
import useExportSupplementInventory from '../hooks/useExportSupplementInventory';

const ListSupplementInventory: React.FC = () => {
  const title: string = 'Supplement Inventory';
  const {
    data: supplementOptions,
    isFetching: isFetchingSupplementOptions,
    isError: isErrorSupplementOptions,
  } = useDropDown<LabelValue[]>(DROPDOWN_SUPPLEMENT);
  const {
    data: locationOptions,
    isFetching: isFetchingLocationOptions,
    isError: isErrorLocationOptions,
  } = useDropDown<LabelValue[]>(DROPDOWN_LOCATION);

  // use state variable for the page with tabs and no params set on url
  const [filters, setFilters] = useState<Record<string, any>>({});

  const { data, isFetching, isError } =
    useFetchList<SupplementInventoryListResponse>(
      SUPPLEMENT_INVENTORY,
      filters
    );

  const { isExporting, handleExportSupplementInventory } =
    useExportSupplementInventory(filters);

  const filterConfig: FilterConfigItem<SupplementInventoryParams>[] = [
    {
      filterType: 'Supplements',
      key: 'supplement_id',
      isMulti: false,
      dataOptions: supplementOptions,
    },
    {
      filterType: 'Locations',
      key: 'location_id',
      isMulti: false,
      dataOptions: locationOptions,
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

  const actionDropdownItems: CustomDropdownMenuItem[] = [
    {
      label: 'Export Inventory',
      icon: 'bx bx-export',
      actionMethod: handleExportSupplementInventory,
      permission: EXPORT_SUPPLEMENT_INVENTORY,
    },
  ];

  if (isExporting) {
    return <CustomLoader />;
  }

  return (
    <Card>
      <Card.Body>
        <FilterSection
          filterFields={filterFields}
          filters={filters}
          setFilters={setFilters}
          canCreate={false}
          title={title}
          actionDropdownItems={actionDropdownItems}
        />
        <SupplementInventoryTable
          isFetching={
            isFetching ||
            isFetchingSupplementOptions ||
            isFetchingLocationOptions
          }
          isError={
            isError || isErrorSupplementOptions || isErrorLocationOptions
          }
          data={data}
          filters={filters}
          setFilters={setFilters}
        />
      </Card.Body>
    </Card>
  );
};

export default ListSupplementInventory;
