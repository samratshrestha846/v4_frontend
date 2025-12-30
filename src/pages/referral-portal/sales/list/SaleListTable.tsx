/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import CustomLoader from '../../../../components/CustomLoader';
import CustomDataTable from '../../../../components/CustomDataTable';
import Pagination from '../../../../components/Pagination';
import { Sale, SaleListResponse } from '../../../../types/sale/saleList';
import { can } from '../../../../helpers/checkPermission';
import { UPDATE_SALE } from '../../../../constants/permissions';
import { prepareDynamicUrl, shortDateFormat } from '../../../../helpers';
import { SALE_EDIT } from '../../../../constants/path';
import { CustomDropdownMenuItem, TableColumn } from '../../../../types/common';
import ActionDropdown from '../../../../components/ActionDropdown';

type Props = {
  pageNumber: number;
  isFetching: boolean;
  data?: SaleListResponse;
  handlePageChange: (e: any) => void;
};

const SaleListTable: React.FC<Props> = ({
  pageNumber,
  isFetching,
  data,
  handlePageChange,
}) => {
  const canUpdateSale = can(UPDATE_SALE);

  const actionColumnFormatter = (row: Sale) => {
    const menuItems: CustomDropdownMenuItem[] = [
      {
        label: 'Edit',
        icon: 'bx bx-edit',
        url: prepareDynamicUrl(SALE_EDIT, row.id),
        permission: UPDATE_SALE,
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
  const commissionColumnFormatter = (row: Sale) => {
    return row.total_billed_amount === row.total_received_amount
      ? `$${row.commission_amount.toFixed(4)}`
      : '-';
  };

  const columns: TableColumn[] = [
    {
      dataField: 'product_detail',
      text: 'Product',
    },
    {
      dataField: 'purchase_date',
      text: 'Purchase Date',
      formatter: (row: Sale) => {
        return shortDateFormat(row.purchase_date);
      },
    },
    {
      dataField: 'total_billed_amount',
      text: 'Billed Amount',
      formatter: (row: Sale) => {
        return `$${row.total_billed_amount.toFixed(4)}`;
      },
    },
    {
      dataField: 'Received Amount',
      text: 'Received Amount',
      formatter: (row: Sale) => {
        return `$${row.total_received_amount.toFixed(4)}`;
      },
    },
    {
      dataField: 'commission_amount',
      text: 'Commission Amount',
      formatter: commissionColumnFormatter,
    },
    {
      dataField: 'action',
      text: '',
      formatter: actionColumnFormatter,
    },
  ];

  if (isFetching) return <CustomLoader />;

  return (
    <>
      <CustomDataTable columns={columns} data={data!.body} />
      <Pagination
        data={data!.meta_data!.pagination}
        pageNumber={pageNumber}
        handlePageChange={handlePageChange}
      />
    </>
  );
};

export default SaleListTable;
