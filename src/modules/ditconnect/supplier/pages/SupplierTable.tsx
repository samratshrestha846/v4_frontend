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
import { SupplierListResponse } from '../types/Supplier';
import {
  DELETE_SUPPLIER,
  SUPPLIER_EDIT,
  UPDATE_SUPPLIER,
} from '../constants/constant';
import DeleteSupplier from './DeleteSupplier';

const SupplierTable: React.FC<ListTableProps<SupplierListResponse>> = ({
  isFetching,
  data,
  filters,
  setFilters,
}) => {
  const actionColumnFormatter = (row: any) => {
    const menuItems: CustomDropdownMenuItem[] = [
      {
        label: 'Edit',
        icon: 'bx bx-edit',
        url: prepareDynamicUrl(SUPPLIER_EDIT, row.id),
        permission: UPDATE_SUPPLIER,
      },
      {
        label: 'Delete',
        icon: 'bx bx-trash',
        modalContent: <DeleteSupplier supplier={row} />,
        permission: DELETE_SUPPLIER,
        actionKey: DELETE_SUPPLIER,
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
      dataField: 'location',
      text: 'Location',
    },
    {
      dataField: 'email',
      text: 'Email',
    },
    {
      dataField: 'phone',
      text: 'Phone',
    },
    {
      dataField: 'website',
      text: 'Website',
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

export default SupplierTable;
