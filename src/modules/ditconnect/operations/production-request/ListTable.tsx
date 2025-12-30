/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { prepareDynamicUrl } from '@uhub/helpers';
import CustomLoader from '@uhub/components/CustomLoader';
import CustomDataTable from '@uhub/components/CustomDataTable';
import Pagination from '@uhub/components/Pagination';
import { ListTableProps, TableColumn } from '@uhub/types/common';
import ErrorMessage from '@uhub/components/ErrorMessage';
import { can } from '@uhub/helpers/checkPermission';
import {
  ProductionRequestListResponse,
  ProductionRequestResponse,
} from './types/productionRequest';
import UpdateStatus from './UpdateStatus';

import {
  READ_SALES_ORDER,
  SALES_ORDER_SHOW,
} from '../../sales-order/constants/constant';

const ListTable: React.FC<ListTableProps<ProductionRequestListResponse>> = ({
  isFetching,
  isError,
  data,
  filters,
  setFilters,
}) => {
  const canViewSalesOrder = can(READ_SALES_ORDER);

  const saleOrderIdColumnFormatter = (row: ProductionRequestResponse) => {
    if (canViewSalesOrder) {
      return (
        <Link
          to={prepareDynamicUrl(
            SALES_ORDER_SHOW,
            row.sales_order_confirmation?.id
          )}>
          {row.sales_order_confirmation?.name}
        </Link>
      );
    }
    return row.sales_order_confirmation?.name ?? '-';
  };

  const columns: TableColumn[] = [
    {
      dataField: 'sales_order_confirmation.name',
      text: 'Sales Order ID',
      formatter: saleOrderIdColumnFormatter,
    },
    {
      dataField: 'location.name',
      text: 'Location',
    },
    {
      dataField: 'supplement.name',
      text: 'Supplement',
    },

    {
      dataField: 'qty',
      text: 'Qty',
    },
    {
      dataField: 'status',
      text: 'Status',
      // eslint-disable-next-line react/no-unstable-nested-components
      formatter: (row: ProductionRequestResponse) => (
        <UpdateStatus status={row.status} id={row.id} />
      ),
    },
  ];
  const handlePageChange = (selectedItem: any) => {
    setFilters((prev: any) => ({
      ...prev,
      page: selectedItem.selected + 1,
    }));
  };
  if (isFetching) return <CustomLoader />;
  if (isError) return <ErrorMessage />;

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
