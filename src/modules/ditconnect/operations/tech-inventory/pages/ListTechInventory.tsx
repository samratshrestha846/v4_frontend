import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import PageTitle from '@uhub/components/PageTitle';
import { can } from '@uhub/helpers/checkPermission';
import { CustomDropdownMenuItem, DropdownFilterItem } from '@uhub/types/common';
import { customFileDownloader } from '@uhub/helpers';
import {
  inventoryItemTypeOptions,
  TechInventoryListResponse,
  TechInventoryQueryParam,
} from '../types/TechInventory';
import {
  CREATE_TECH_INVENTORY,
  TECH_INVENTORY_LIST,
  TECH_INVENTORY_ADD,
  TECH_INVENTORY_UI,
  EXPORT_INVENTORY,
  TECH_INVENTORY_ITEM_EXPORT,
} from '../constants/constant';
import TechInventoryTable from './TechInventoryTable';
import useFetchList from '../../../hooks/useFetchList';
import useUrlFilters from '../../../hooks/useUrlFilters';
import { FilterConfigItem } from '../../../types/ditConnect';
import FilterSection from '../../../components/FilterSection';
import HttpApi from '../../../Http/http';
import useDitConnectLocationDropDown from '../../../hooks/useDitConnectLocationDropDown';

const ListTechInventory: React.FC = () => {
  const title: string = 'Tech Inventory';
  const [filters, setFilters] = useUrlFilters<TechInventoryQueryParam>();
  const [isExporting, setExport] = useState<boolean>(false);
  const canCreate = can(CREATE_TECH_INVENTORY);

  const { data, isFetching, isError } = useFetchList<TechInventoryListResponse>(
    `${TECH_INVENTORY_UI}`,
    filters
  );

  const { locationOptions, isFetchingLocationOptions, isErrorLocationOptions } =
    useDitConnectLocationDropDown();

  const filterConfig: FilterConfigItem<TechInventoryQueryParam>[] = [
    {
      filterType: 'Type',
      key: 'type',
      isMulti: false,
      dataOptions: inventoryItemTypeOptions,
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
  const handleExportList = async () => {
    setExport(true);
    const apiCore = new HttpApi();
    const response = await apiCore.downloadFile(
      TECH_INVENTORY_ITEM_EXPORT,
      filters
    );
    customFileDownloader({
      fileData: response.data,
      fileName: `${title} ${new Date()}`,
      fileExtension: 'xlsx',
    });
    setExport(false);
  };
  const actionDropdownItems: CustomDropdownMenuItem[] = [
    {
      label: 'Export Inventory',
      icon: 'bx bx-export',
      actionMethod: handleExportList,
      permission: EXPORT_INVENTORY,
    },
  ];

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          {
            label: `${title} List`,
            path: TECH_INVENTORY_LIST,
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
            createPath={TECH_INVENTORY_ADD}
            title={title}
            actionDropdownItems={actionDropdownItems}
          />
          <TechInventoryTable
            isError={isError || isErrorLocationOptions}
            isFetching={isFetching || isFetchingLocationOptions || isExporting}
            data={data}
            filters={filters}
            setFilters={setFilters}
          />
        </Card.Body>
      </Card>
    </>
  );
};

export default ListTechInventory;
