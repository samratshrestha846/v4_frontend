/* eslint-disable no-unused-vars */
import React from 'react';
import CustomDataTable from '@uhub/components/CustomDataTable';
import { ListTableProps, TableColumn } from '@uhub/types/common';
import {
  SupplementInventoryTransactionListResponse,
  SupplementInventoryTransactionResponse,
} from '../types/SupplementInventory';

const SupplementInventoryTransactionTable: React.FC<
  ListTableProps<SupplementInventoryTransactionResponse[]>
> = ({ isFetching, data, filters, setFilters }) => {
  const operationColumnFormatter = (
    cell: SupplementInventoryTransactionResponse
  ) => {
    return typeof cell.action_type === 'string'
      ? cell.action_type.split('\\').pop()
      : '-';
  };
  const columns: TableColumn[] = [
    {
      dataField: 'qty',
      text: 'Quantity',
    },
    {
      dataField: 'action_type',
      text: 'Operations',
      formatter: operationColumnFormatter,
    },
    {
      dataField: 'stock_location',
      text: 'Stock Location',
    },
    {
      dataField: 'to_location',
      text: 'To Location',
    },
    {
      dataField: 'date',
      text: 'Date',
    },
    {
      dataField: 'notes',
      text: 'Notes',
    },
  ];
  return <CustomDataTable columns={columns} data={data ?? []} />;
};

export default SupplementInventoryTransactionTable;
