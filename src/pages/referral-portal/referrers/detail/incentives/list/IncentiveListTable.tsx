/* eslint-disable no-unused-vars */
import React from 'react';
import CustomLoader from '../../../../../../components/CustomLoader';
import CustomDataTable from '../../../../../../components/CustomDataTable';
import Pagination from '../../../../../../components/Pagination';
import { SaleListResponse } from '../../../../../../types/sale/saleList';
import { shortDateFormat } from '../../../../../../helpers';

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
  const commissionColumnFormatter = (cell: any, row: any) => {
    return row.total_billed_amount === row.total_received_amount
      ? `$${parseFloat(row.commission_amount).toFixed(4)}`
      : null;
  };

  const columns = [
    {
      dataField: 'product_detail',
      text: 'Product',
    },
    {
      dataField: 'purchase_date',
      text: 'Purchase Date',
      formatter: (cell: any, row: any) => {
        return shortDateFormat(row.purchase_date);
      },
    },
    {
      dataField: 'total_billed_amount',
      text: 'Billed Amount',
      formatter: (cell: any, row: any) => {
        return `$${parseFloat(row.total_billed_amount).toFixed(4)}`;
      },
    },
    {
      dataField: 'Received Amount',
      text: 'Received Amount',
      formatter: (cell: any, row: any) => {
        return `$${parseFloat(row.total_received_amount).toFixed(4)}`;
      },
    },
    {
      dataField: 'commission_amount',
      text: 'Incentive Amount',
      formatter: commissionColumnFormatter,
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
