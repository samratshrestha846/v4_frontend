/* eslint-disable no-unused-vars */
import React from 'react';

import {
  Referrer,
  ReferrerListResponse,
} from '../../../../types/referrer/referrerList';
import CustomLoader from '../../../../components/CustomLoader';
import CustomDataTable from '../../../../components/CustomDataTable';
import Pagination from '../../../../components/Pagination';
import { prepareDynamicUrl, shortDateFormat } from '../../../../helpers';

import {
  READ_REFERRER,
  UPDATE_REFERRER,
} from '../../../../constants/permissions';
import ActionDropdown from '../../../../components/ActionDropdown';
import { CustomDropdownMenuItem } from '../../../../types/common';
import { REFERRER_EDIT, REFERRER_VIEW } from '../../../../constants/path';
import ReferrerStatus from '../components/ReferrerStatus';

type Props = {
  pageNumber: number;
  isFetching: boolean;
  data?: ReferrerListResponse;
  handlePageChange: (e: any) => void;
};

const RefferrerListTable: React.FC<Props> = ({
  pageNumber,
  isFetching,
  data,
  handlePageChange,
}) => {
  const statusColumnFormatter = (row: Referrer) => {
    return <ReferrerStatus referrer={row} />;
  };

  const actionColumnFormatter = (row: Referrer) => {
    const menuItems: CustomDropdownMenuItem[] = [
      {
        label: 'View',
        icon: 'bx bx-show',
        url: prepareDynamicUrl(REFERRER_VIEW, row.id),
        permission: READ_REFERRER,
      },
      {
        label: 'Edit',
        icon: 'bx bx-edit',
        url: prepareDynamicUrl(REFERRER_EDIT, row.id),
        permission: UPDATE_REFERRER,
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

  const columns = [
    {
      dataField: 'name',
      text: 'Name',
      formatter: (cell: any, row: any) => {
        return `${row.first_name} ${row.last_name}`;
      },
    },
    {
      dataField: 'email',
      text: 'Email',
    },
    {
      dataField: 'phone_number',
      text: 'Phone No.',
    },
    {
      dataField: 'address',
      text: 'Address',
    },
    {
      dataField: 'status',
      text: 'Status',
      formatter: statusColumnFormatter,
    },
    {
      dataField: 'contract_expiry_date',
      text: 'Contract Expiry Date',
      formatter: (cell: any, row: any) => {
        return shortDateFormat(row.contract_expiry_date);
      },
    },
    {
      dataField: 'action',
      text: 'Action',
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

export default RefferrerListTable;
