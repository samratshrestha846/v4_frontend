import React from 'react';
import ActionDropdown from '@uhub/components/ActionDropdown';
import CustomDataTable from '@uhub/components/CustomDataTable';
import CustomLoader from '@uhub/components/CustomLoader';
import Pagination from '@uhub/components/Pagination';
import { prepareDynamicUrl } from '@uhub/helpers';
import { CustomDropdownMenuItem, TableColumn } from '@uhub/types/common';
import { CustomerContactResponse } from './types/customerContact';
import {
  CUSTOMER_CONTACT_EDIT,
  UPDATE_CUSTOMER_CONTACT,
} from './constants/constant';

const ListTable = ({ isFetching, data, filters, setFilters }: any) => {
  const actionColumnFormatter = (row: any) => {
    // @TODO: use proper type for row
    const menuItems: CustomDropdownMenuItem[] = [
      {
        label: 'Edit',
        icon: 'bx bx-edit',
        url: prepareDynamicUrl(CUSTOMER_CONTACT_EDIT, row.id),
        permission: UPDATE_CUSTOMER_CONTACT,
      },
    ];

    return (
      <ActionDropdown
        icon="bx bx-dots-vertical-rounded"
        iconColorClass="font-14 text-gray"
        containerClass="custom-dropdown d-flex align-items-center justify-content-between text-white"
        menuItems={menuItems}
      />
    );
  };

  const columns: TableColumn[] = [
    {
      dataField: 'customer',
      text: 'Customer',
    },
    {
      dataField: 'phone_number',
      text: 'Phone Number',
    },
    {
      dataField: 'address',
      text: 'Address',
    },
    {
      dataField: 'details',
      text: 'Details',

      formatter: (row: CustomerContactResponse) => {
        return row.details; // @TODO: display only limited characters
      },
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

export default ListTable;
