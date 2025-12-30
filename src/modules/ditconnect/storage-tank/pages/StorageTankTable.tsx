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
import {
  StorageTankListResponse,
  StorageTankResponse,
} from '../types/StorageTank';
import {
  DELETE_STORAGE_TANK,
  READ_STORAGE_TANK,
  STORAGE_TANK_EDIT,
  STORAGE_TANK_VIEW,
  UPDATE_STORAGE_TANK,
} from '../constants/constant';
import DeleteStorageTank from './DeleteStorageTank';

const StorageTankTable: React.FC<ListTableProps<StorageTankListResponse>> = ({
  isFetching,
  data,
  filters,
  setFilters,
}) => {
  const actionColumnFormatter = (row: StorageTankResponse) => {
    const menuItems: CustomDropdownMenuItem[] = [
      {
        label: 'View',
        icon: 'bx bx-show',
        url: prepareDynamicUrl(STORAGE_TANK_VIEW, row.id),
        permission: READ_STORAGE_TANK,
      },
      {
        label: 'Edit',
        icon: 'bx bx-edit',
        url: prepareDynamicUrl(STORAGE_TANK_EDIT, row.id),
        permission: UPDATE_STORAGE_TANK,
      },
      {
        label: 'Delete',
        icon: 'bx bx-trash',
        actionKey: 'Delete Storage Tank',
        modalContent: <DeleteStorageTank storageTank={row} />,
        permission: DELETE_STORAGE_TANK,
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
      dataField: 'name',
      text: 'Name',
    },
    {
      dataField: 'location.name',
      text: 'Location',
    },
    {
      dataField: 'capacity',
      text: 'Capacity (L)',
    },
    {
      dataField: 'current_qty',
      text: 'Current Quantity',
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

export default StorageTankTable;
