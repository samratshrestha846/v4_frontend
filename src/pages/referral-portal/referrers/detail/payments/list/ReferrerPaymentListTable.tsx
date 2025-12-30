/* eslint-disable no-unused-vars */
import React from 'react';
import CustomLoader from '../../../../../../components/CustomLoader';
import CustomDataTable from '../../../../../../components/CustomDataTable';
import Pagination from '../../../../../../components/Pagination';
import { shortDateFormat } from '../../../../../../helpers';
import { PaymentListResponse } from '../../../../../../types/payment/paymentList';

type Props = {
  pageNumber: number;
  isFetching: boolean;
  data?: PaymentListResponse;
  handlePageChange: (e: any) => void;
};

const ReferrerPaymentListTable: React.FC<Props> = ({
  pageNumber,
  isFetching,
  data,
  handlePageChange,
}) => {
  const columns = [
    {
      dataField: 'payment_date',
      text: 'Date',
      formatter: (row: any) => {
        return shortDateFormat(row.payment_date);
      },
    },
    {
      dataField: 'amount',
      text: 'Amount',
      formatter: (row: any) => {
        return `$${row.amount.toFixed(4)}`;
      },
    },
    {
      dataField: 'note',
      text: 'Note',
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

export default ReferrerPaymentListTable;
