/* eslint-disable no-unused-vars */
import React from 'react';
import CustomLoader from '../../../../components/CustomLoader';
import CustomDataTable from '../../../../components/CustomDataTable';
import Pagination from '../../../../components/Pagination';
import { formattedShortDate } from '../../../../helpers';
import {
  Payment,
  PaymentListResponse,
} from '../../../../types/payment/paymentList';
import { TableColumn } from '../../../../types/common';

type Props = {
  pageNumber: number;
  isFetching: boolean;
  data?: PaymentListResponse;
  handlePageChange: (e: any) => void;
  refetch: () => any;
};

const PaymentListTable: React.FC<Props> = ({
  pageNumber,
  isFetching,
  data,
  handlePageChange,
  refetch,
}) => {
  // const actionColumnFormatter = (row: Payment) => {
  //   const menuItems: CustomDropdownMenuItem[] = [
  //     {
  //       label: 'Edit',
  //       icon: 'bx bx-edit',
  //       url: prepareDynamicUrl(PAYMENT_EDIT, row.id),
  //       permission: UPDATE_PAYMENT,
  //     },

  //     {
  //       label: 'Delete',
  //       icon: 'bx bx-trash',
  //       actionKey: ACTION_DELETE_PAYMENT,
  //       permission: DELETE_PAYMENT,
  //       modalContent: <DeletePaymentModal refetch={refetch} payment={row} />,
  //     },
  //   ];

  //   return (
  //     <ActionDropdown
  //       icon="bx bx-dots-vertical-rounded"
  //       iconColorClass="font-14 text-gray"
  //       containerClass="custom-dropdown d-flex align-items-center justify-content-between text-white"
  //       menuItems={menuItems}
  //       refetch={refetch}
  //     />
  //   );
  // };

  const columns: TableColumn[] = [
    {
      dataField: 'payment_date',
      text: 'Date',
      formatter: (row: Payment) => {
        return row.payment_date ? formattedShortDate(row.payment_date) : '-';
      },
    },
    {
      dataField: 'name',
      text: 'Referrer',
      formatter: (row: Payment) => {
        return row.referrer
          ? `${row.referrer.first_name} ${row.referrer.last_name}`
          : '-';
      },
    },
    {
      dataField: 'amount',
      text: 'Amount',
      formatter: (row: Payment) => {
        return row.amount ? `$${row.amount.toFixed(4)}` : '-';
      },
    },
    {
      dataField: 'note',
      text: 'Note',
    },
    // {
    //   dataField: 'action',
    //   text: '',
    //   formatter: actionColumnFormatter,
    // },
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

export default PaymentListTable;
