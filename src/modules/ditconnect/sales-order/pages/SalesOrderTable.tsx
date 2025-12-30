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
import { SalesOrderListResponse } from '../types/SalesOrder';
import {
  MODIFY_SALES_ORDER_CONFIRMATION,
  READ_SALES_ORDER,
  SALES_ORDER_EDIT,
  SALES_ORDER_SHOW,
  UPDATE_SALES_ORDER,
} from '../constants/constant';
import SendMessageModal from '../components/SendMessageModal';

const SalesOrderTable: React.FC<ListTableProps<SalesOrderListResponse>> = ({
  isFetching,
  data,
  filters,
  setFilters,
}) => {
  const customerColumnFormatter = (row: any) => {
    const customer = JSON.parse(row.customer);
    return customer.name;
  };
  const propertyColumnFormatter = (row: any) => {
    const customer = JSON.parse(row.customer);
    return (
      customer.property_name +
      (customer.identifier ? ` (${customer.identifier})` : '')
    );
  };
  const phoneColumnFormatter = (row: any) => {
    const customer = JSON.parse(row.customer);
    return customer.phone ?? '-';
  };
  const actionColumnFormatter = (row: any) => {
    const menuItems: CustomDropdownMenuItem[] = [
      {
        label: 'View',
        icon: 'bx bx-show',
        url: prepareDynamicUrl(SALES_ORDER_SHOW, row.id),
        permission: READ_SALES_ORDER,
      },
      {
        label: 'Edit',
        icon: 'bx bx-edit',
        url: prepareDynamicUrl(SALES_ORDER_EDIT, row.id),
        permission: UPDATE_SALES_ORDER,
      },
      {
        label: 'Send Message',
        icon: 'bx bx-message',
        modalContent: <SendMessageModal id={row.id} />,
        actionKey: MODIFY_SALES_ORDER_CONFIRMATION,

        permission: MODIFY_SALES_ORDER_CONFIRMATION,
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
      dataField: 'sales_order_confirmation_id',
      text: 'Sales Order ID',
    },
    {
      dataField: 'customer.name',
      text: 'Customer',
      formatter: customerColumnFormatter,
    },
    {
      dataField: 'customer.identifier',
      text: 'Property',
      formatter: propertyColumnFormatter,
    },
    {
      dataField: 'customer.phone',
      text: 'Phone',
      formatter: phoneColumnFormatter,
    },
    {
      dataField: 'status',
      text: 'Status',
    },
    {
      dataField: 'created_by.name',
      text: 'Created By',
    },
    {
      dataField: 'total',
      text: 'Total',
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

export default SalesOrderTable;
