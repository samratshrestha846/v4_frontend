/* eslint-disable no-unused-vars */
import React from 'react';
import CustomLoader from '@uhub/components/CustomLoader';
import CustomDataTable from '@uhub/components/CustomDataTable';
import Pagination from '@uhub/components/Pagination';
import { formattedShortDate, prepareDynamicUrl } from '@uhub/helpers';
import { can } from '@uhub/helpers/checkPermission';
import {
  CustomDropdownMenuItem,
  ListTableProps,
  TableColumn,
} from '@uhub/types/common';
import ActionDropdown from '@uhub/components/ActionDropdown';
import {
  SupplementTransferListResponse,
  SupplementTransferResponse,
} from '../types/SupplementTransfer';
import {
  MODIFY_SUPPLEMENT_TRANSFER,
  READ_SUPPLEMENT_TRANSFER,
  SUPPLEMENT_TRANSFER,
  SUPPLEMENT_TRANSFER_VIEW,
} from '../constants/constant';
import UpdateSupplementStatus from '../../components/UpdateSupplementStatus';

const SupplementTransferTable: React.FC<
  ListTableProps<SupplementTransferListResponse>
> = ({ isFetching, data, filters, setFilters }) => {
  const canUpdate = can(MODIFY_SUPPLEMENT_TRANSFER);
  const actionColumnFormatter = (row: any) => {
    const menuItems: CustomDropdownMenuItem[] = [
      {
        label: 'View',
        icon: 'bx bx-show',
        url: prepareDynamicUrl(SUPPLEMENT_TRANSFER_VIEW, row.id),
        permission: READ_SUPPLEMENT_TRANSFER,
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

  const statusColumnFormatter = (row: SupplementTransferResponse) => {
    return (
      <UpdateSupplementStatus
        status={row.status}
        id={row.id}
        canUpdate={canUpdate}
        baseEndpoint={SUPPLEMENT_TRANSFER}
      />
    );
  };

  const columns: TableColumn[] = [
    {
      dataField: 'supplement_manufacture.batch_number',
      text: 'Batch Number',
      formatter: (row: SupplementTransferResponse) =>
        row?.batch_no ?? row?.supplement_manufacture?.batch_number ?? '-',
    },
    {
      dataField: 'supplement.name',
      text: 'Supplement',
    },
    {
      dataField: 'qty',
      text: 'Quantity',
    },
    {
      dataField: 'stock_location.name',
      text: 'From Location',
      formatter: (row: SupplementTransferResponse) =>
        row.stock_location
          ? `${row.stock_location.name}, ${row.stock_location.state}`
          : '-',
    },
    {
      dataField: 'to_location.name',
      text: 'To Location',
      formatter: (row: SupplementTransferResponse) =>
        row.to_location
          ? `${row.to_location.name}, ${row.to_location.state}`
          : '-',
    },
    {
      dataField: 'date',
      text: 'Date',
      formatter: (row: SupplementTransferResponse) =>
        row.date ? formattedShortDate(row.date) : '-',
    },
    {
      dataField: 'storage_tank.name',
      text: 'Tank',
    },
    {
      dataField: 'created_by.name',
      text: 'Created By',
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

export default SupplementTransferTable;
