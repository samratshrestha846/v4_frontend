/* eslint-disable no-unused-vars */
import React from 'react';
import CustomDataTable from '../../../../../../components/CustomDataTable';
import Pagination from '../../../../../../components/Pagination';
import CustomLoader from '../../../../../../components/CustomLoader';

import {
  Customer,
  CustomerListResponse,
} from '../../../../../../types/customer/customerList';
import IconLabelStatus from '../../../../../../components/IconLabelStatus';

type Props = {
  isFetching: boolean;
  data?: CustomerListResponse;
  handlePageChange: (e: any) => void;
  pageNumber: number;
};

const CustomerListTable: React.FC<Props> = ({
  isFetching,
  data,
  handlePageChange,
  pageNumber,
}) => {
  const statusColumnFormatter = (row: Customer) => {
    return (
      <IconLabelStatus
        label={row.settings && row.is_active ? 'Active' : 'Inactive'}
        iconTextClass={
          row.settings && row.is_active ? 'text-success' : 'text-light-gray'
        }
      />
    );
  };

  const columns = [
    {
      dataField: 'business_name',
      text: 'Customer',
    },
    {
      dataField: 'email',
      text: 'Email',
    },
    {
      dataField: 'phone',
      text: 'Phone Number',
    },
    {
      dataField: 'status',
      text: 'Status',
      formatter: statusColumnFormatter,
    },
  ];

  if (isFetching) return <CustomLoader />;

  return (
    <>
      <CustomDataTable columns={columns} data={data!.body} />
      <Pagination
        data={data?.meta_data?.pagination}
        pageNumber={pageNumber}
        handlePageChange={handlePageChange}
      />
    </>
  );
};

export default CustomerListTable;
