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
import { can } from '@uhub/helpers/checkPermission';
import { StocktakeListResponse, StocktakeResponse } from '../types/Stocktake';
import {
  APPROVE_STOCKTAKE,
  READ_STOCKTAKE,
  STOCKTAKE,
  STOCKTAKE_EDIT,
  STOCKTAKE_STATUS_PENDING,
  STOCKTAKE_VIEW,
  UPDATE_STOCKTAKE,
} from '../constants/constant';
import UpdateStocktakeStatus from './UpdateStocktakeStatus';

const StocktakeTable: React.FC<ListTableProps<StocktakeListResponse>> = ({
  isFetching,
  data,
  filters,
  setFilters,
}) => {
  const canApprove = can(APPROVE_STOCKTAKE);
  const actionColumnFormatter = (row: StocktakeResponse) => {
    const menuItems: CustomDropdownMenuItem[] = [
      {
        label: 'View',
        icon: 'bx bx-show',
        url: prepareDynamicUrl(STOCKTAKE_VIEW, row.id),
        permission: READ_STOCKTAKE,
      },
    ];

    if (row.status === STOCKTAKE_STATUS_PENDING) {
      menuItems.push({
        label: 'Edit',
        icon: 'bx bx-edit',
        url: prepareDynamicUrl(STOCKTAKE_EDIT, row.id),
        permission: UPDATE_STOCKTAKE,
      });
    }

    return (
      <ActionDropdown
        icon="bx bx-dots-vertical-rounded"
        containerClass="custom-dropdown"
        menuItems={menuItems}
      />
    );
  };

  const statusColumnFormatter = (row: StocktakeResponse) => {
    return (
      <UpdateStocktakeStatus
        status={row.status}
        id={row.id}
        canUpdate={canApprove}
        baseEndpoint={STOCKTAKE}
      />
    );
  };

  const columns: TableColumn[] = [
    {
      dataField: 'location.name',
      text: 'Location',
    },
    {
      dataField: 'date',
      text: 'Date',
      formatter: (row: StocktakeResponse) =>
        row?.date ? formattedShortDate(row.date) : '-',
    },
    {
      dataField: 'created_by.name',
      text: 'Created By',
    },

    {
      dataField: 'approved_by.name',
      text: 'Approved By',
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

export default StocktakeTable;
