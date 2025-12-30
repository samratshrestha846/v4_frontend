/* eslint-disable no-unused-vars */
import React from 'react';
import CustomLoader from '@uhub/components/CustomLoader';
import CustomDataTable from '@uhub/components/CustomDataTable';
import Pagination from '@uhub/components/Pagination';
import { formattedShortDate, prepareDynamicUrl } from '@uhub/helpers';
import {
  CustomDropdownMenuItem,
  ListTableProps,
  TableColumn,
} from '@uhub/types/common';
import ActionDropdown from '@uhub/components/ActionDropdown';
import {
  PurchaseRequestListResponse,
  PurchaseRequestResponse,
} from '../types/PurchaseRequest';
import {
  PURCHASE_REQUEST_EDIT,
  PURCHASE_REQUEST_VIEW,
  READ_PURCHASE_REQUEST,
  UPDATE_PURCHASE_REQUEST,
} from '../constants/constant';
import UpdatePurchaseRequestStatus from './UpdatePurchaseRequestStatus';

const PurchaseRequestTable: React.FC<
  ListTableProps<PurchaseRequestListResponse>
> = ({ isFetching, data, filters, setFilters }) => {
  const actionColumnFormatter = (row: any) => {
    const menuItems: CustomDropdownMenuItem[] = [
      {
        label: 'View',
        icon: 'bx bx-show',
        url: prepareDynamicUrl(PURCHASE_REQUEST_VIEW, row.id),
        permission: READ_PURCHASE_REQUEST,
      },
      {
        label: 'Edit',
        icon: 'bx bx-edit',
        url: prepareDynamicUrl(PURCHASE_REQUEST_EDIT, row.id),
        permission: UPDATE_PURCHASE_REQUEST,
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

  const statusColumnFormatter = (row: PurchaseRequestResponse) => {
    return <UpdatePurchaseRequestStatus purchaseRequest={row} />;
  };

  const columns: TableColumn[] = [
    {
      dataField: 'pr_no',
      text: 'PR No.',
    },
    {
      dataField: 'title',
      text: 'Title',
    },
    {
      dataField: 'requested_by_user.name',
      text: 'Requested By',
    },
    {
      dataField: 'requested_to_user.name',
      text: 'Requested To',
    },

    {
      dataField: 'created_at',
      text: 'Requested Date',
      formatter: (row: PurchaseRequestResponse) =>
        row.created_at ? formattedShortDate(row.created_at) : '-',
    },
    {
      dataField: 'required_by_date',
      text: 'Required By',
      formatter: (row: PurchaseRequestResponse) =>
        row.required_by_date ? formattedShortDate(row.required_by_date) : '-',
    },
    {
      dataField: 'total_price',
      text: 'Grand Total',
      formatter: (row: PurchaseRequestResponse) =>
        row.total_price ? `$${row.total_price}` : '-',
    },
    {
      dataField: 'status',
      text: 'Status',
      formatter: statusColumnFormatter,
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

export default PurchaseRequestTable;
