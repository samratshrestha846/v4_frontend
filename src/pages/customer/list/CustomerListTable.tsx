import React from 'react';
import { UPDATE_CUSTOMER } from '../../../constants/permissions';
import CustomDataTable from '../../../components/CustomDataTable';
import Pagination from '../../../components/Pagination';
import CustomLoader from '../../../components/CustomLoader';
import {
  Customer,
  CustomerListResponse,
} from '../../../types/customer/customerList';
import { CustomDropdownMenuItem } from '../../../types/common';
import ActionDropdown from '../../../components/ActionDropdown';
import { prepareDynamicUrl } from '../../../helpers';
import { CUSTOMER_EDIT } from '../../../constants/path';
import IconLabelStatus from '../../../components/IconLabelStatus';
import {
  DISABLED_LABEL,
  ENABLED_LABEL,
  STATUS_LABEL_ACTIVE,
  STATUS_LABEL_INACTIVE,
} from '../../../constants/constants';

type Props = {
  isFetching: boolean;
  data?: CustomerListResponse;
  // eslint-disable-next-line no-unused-vars
  handlePageChange: (e: any) => void;
  pageNumber: number;
  refetch: () => void;
};

const CustomerListTable: React.FC<Props> = ({
  isFetching,
  data,
  handlePageChange,
  pageNumber,
  refetch,
}) => {
  const actionColumnFormatter = (customer: Customer) => {
    const menuItems: CustomDropdownMenuItem[] = [
      {
        label: 'Edit',
        icon: 'bx bx-edit',
        url: prepareDynamicUrl(CUSTOMER_EDIT, customer.id),
        permission: UPDATE_CUSTOMER,
      },
    ];

    return (
      <ActionDropdown
        icon="bx bx-dots-vertical-rounded"
        iconColorClass="font-14 text-gray"
        containerClass="custom-dropdown d-flex align-items-center justify-content-between text-white"
        menuItems={menuItems}
        refetch={refetch}
      />
    );
  };

  const showDashboardFormatter = (row: Customer) => {
    return (
      <IconLabelStatus
        label={row?.settings?.show_dashboard ? ENABLED_LABEL : DISABLED_LABEL}
        iconClass="bx bxs-circle"
        iconTextClass={
          row?.settings?.show_dashboard ? 'text-success' : 'text-light-gray'
        }
      />
    );
  };

  const statusColumnFormatter = (row: Customer) => {
    return (
      <IconLabelStatus
        label={row?.is_active ? STATUS_LABEL_ACTIVE : STATUS_LABEL_INACTIVE}
        iconClass="bx bxs-circle"
        iconTextClass={row?.is_active ? 'text-success' : 'text-light-gray'}
      />
    );
  };

  const referredByColumnFormatter = (row: Customer) => {
    return row.referrer
      ? `${row.referrer?.first_name} ${row.referrer?.last_name}`
      : null;
  };

  const columns = [
    {
      dataField: 'business_name',
      text: 'Customer',
      sort: true,
    },
    {
      dataField: 'email',
      text: 'Email',
      sort: true,
    },
    {
      dataField: 'phone',
      text: 'Phone Number',
      sort: true,
    },
    {
      dataField: 'settings?.show_dashboard',
      text: 'Dashboard',
      formatter: showDashboardFormatter,
    },
    {
      dataField: 'referrer',
      text: 'Referred By',
      formatter: referredByColumnFormatter,
    },
    {
      dataField: 'is_active',
      text: 'Status',
      formatter: statusColumnFormatter,
    },
    {
      dataField: 'df1',
      text: '',
      formatter: actionColumnFormatter,
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
