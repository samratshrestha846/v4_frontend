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
import { SupplementInventoryListResponse } from '../types/SupplementInventory';
import {
  READ_SUPPLEMENT_INVENTORY,
  SUPPLEMENT_INVENTORY_EDIT,
  SUPPLEMENT_INVENTORY_VIEW,
  UPDATE_SUPPLEMENT_INVENTORY,
} from '../constants/constant';

const SupplementInventoryTable: React.FC<
  ListTableProps<SupplementInventoryListResponse>
> = ({ isFetching, data, filters, setFilters }) => {
  const actionColumnFormatter = (row: any) => {
    const menuItems: CustomDropdownMenuItem[] = [
      {
        label: 'View',
        icon: 'bx bx-show',
        url: prepareDynamicUrl(SUPPLEMENT_INVENTORY_VIEW, row.id),
        permission: READ_SUPPLEMENT_INVENTORY,
      },
      {
        label: 'Adjust Inventory',
        icon: 'bx bx-edit',
        url: prepareDynamicUrl(SUPPLEMENT_INVENTORY_EDIT, row.id),
        permission: UPDATE_SUPPLEMENT_INVENTORY,
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

  const columns: TableColumn[] = [
    {
      dataField: 'supplement_name',
      text: 'Name',
    },
    {
      dataField: 'current_qty',
      text: 'Current Quantity',
    },
    {
      dataField: 'location_name',
      text: 'Location',
    },
    {
      dataField: 'batch_number',
      text: 'Batch No.',
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

export default SupplementInventoryTable;
