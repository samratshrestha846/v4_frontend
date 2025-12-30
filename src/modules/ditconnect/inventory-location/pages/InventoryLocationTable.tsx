/* eslint-disable no-unused-vars */
import React from 'react';
import CustomLoader from '@uhub/components/CustomLoader';
import CustomDataTable from '@uhub/components/CustomDataTable';
import Pagination from '@uhub/components/Pagination';
import { prepareDynamicUrl } from '@uhub/helpers';
import {
  CustomDropdownMenuItem,
  ListTableProps,
  TableColumn,
} from '@uhub/types/common';
import ActionDropdown from '@uhub/components/ActionDropdown';
import IconLabelStatus from '@uhub/components/IconLabelStatus';

import {
  InventoryLocationListResponse,
  InventoryLocationResponse,
} from '../types/InventoryLocation';
import {
  INVENTORY_LOCATION_EDIT,
  UPDATE_INVENTORY_LOCATION,
} from '../constants/constant';

import {
  STATUS_LABEL_NO,
  STATUS_LABEL_YES,
} from '../../../../constants/constants';

const InventoryLocationTable: React.FC<
  ListTableProps<InventoryLocationListResponse>
> = ({ isFetching, data, filters, setFilters }) => {
  const actionColumnFormatter = (row: any) => {
    const menuItems: CustomDropdownMenuItem[] = [
      {
        label: 'Edit',
        icon: 'bx bx-edit',
        url: prepareDynamicUrl(INVENTORY_LOCATION_EDIT, row.id),
        permission: UPDATE_INVENTORY_LOCATION,
      },
    ];

    return (
      <ActionDropdown
        icon="bx bx-dots-vertical-rounded"
        containerClass="custom-dropdown"
        menuItems={menuItems}
      />
    );
  };

  const isProducitionFacilityColumnFormatter = (
    row: InventoryLocationResponse
  ) => {
    return (
      <IconLabelStatus
        iconTextClass={
          row.is_production_facility ? 'text-success' : 'text-light-gray'
        }
        label={row.is_production_facility ? STATUS_LABEL_YES : STATUS_LABEL_NO}
      />
    );
  };

  const columns: TableColumn[] = [
    {
      dataField: 'name',
      text: 'Name',
    },
    {
      dataField: 'state',
      text: 'State',
    },
    {
      dataField: 'is_production_facility',
      text: 'Is Production Facility',
      formatter: isProducitionFacilityColumnFormatter,
    },
    {
      dataField: 'action',
      text: '',
      formatter: actionColumnFormatter,
    },
  ];

  const handlePageChange = (selectedItem: any) => {
    setFilters((prev: any) => ({
      ...prev,
      page: selectedItem.selected + 1,
    }));
  };

  if (isFetching) return <CustomLoader />;

  return (
    <>
      <CustomDataTable columns={columns} data={data!.data} />
      <Pagination
        data={data!.meta_data!.pagination}
        pageNumber={Number(filters.page ?? 1) - 1}
        handlePageChange={handlePageChange}
      />
    </>
  );
};

export default InventoryLocationTable;
