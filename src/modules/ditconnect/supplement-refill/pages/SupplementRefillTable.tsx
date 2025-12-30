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
import { Site } from '@uhub/types/site';
import { can } from '@uhub/helpers/checkPermission';
import {
  SupplementRefillListResponse,
  SupplementRefillResponse,
} from '../types/SupplementRefill';
import {
  MODIFY_SUPPLEMENT_REFILL,
  READ_SUPPLEMENT_REFILL,
  SUPPLEMENT_REFILL,
  SUPPLEMENT_REFILL_VIEW,
} from '../constants/constant';

import UpdateSupplementStatus from '../../components/UpdateSupplementStatus';

const SupplementRefillTable: React.FC<
  ListTableProps<SupplementRefillListResponse>
> = ({ isFetching, data, filters, setFilters }) => {
  const canUpdate = can(MODIFY_SUPPLEMENT_REFILL);
  const actionColumnFormatter = (row: any) => {
    const menuItems: CustomDropdownMenuItem[] = [
      {
        label: 'View',
        icon: 'bx bx-show',
        url: prepareDynamicUrl(SUPPLEMENT_REFILL_VIEW, row.id),
        permission: READ_SUPPLEMENT_REFILL,
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

  const toLocationcolumnFormatter = (row: SupplementRefillResponse) => {
    if (row.to_location) return row.to_location;
    return row.site_snapshot
      ? (JSON.parse(row?.site_snapshot) as Site)?.name
      : '-';
  };

  const statusColumnFormatter = (row: SupplementRefillResponse) => {
    return (
      <UpdateSupplementStatus
        status={row.status}
        id={row.id}
        canUpdate={canUpdate}
        baseEndpoint={SUPPLEMENT_REFILL}
      />
    );
  };

  const columns: TableColumn[] = [
    {
      dataField: 'batch_no',
      text: 'Batch Number',
      formatter: (row: SupplementRefillResponse) =>
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
      text: 'Stock Location',
      formatter: (row: SupplementRefillResponse) =>
        row.stock_location
          ? `${row.stock_location.name}, ${row.stock_location.state}`
          : '-',
    },
    {
      dataField: 'to_location',
      text: 'Delivered Location',
      formatter: toLocationcolumnFormatter,
    },
    {
      dataField: 'date',
      text: 'Date',
      formatter: (row: SupplementRefillResponse) =>
        row.date ? formattedShortDate(row.date) : '-',
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

export default SupplementRefillTable;
