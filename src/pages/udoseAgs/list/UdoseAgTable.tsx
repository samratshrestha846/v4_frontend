/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
import React from 'react';
import { Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CustomDataTable from '../../../components/CustomDataTable';
import Pagination from '../../../components/Pagination';
import {
  formattedDatetime,
  formattedShortDate,
  prepareDynamicUrl,
} from '../../../helpers';
import { UdoseAgs } from '../../../types/udoseAgs/udoseAgs';
import { STATUS_ACTIVE, STATUS_INACTIVE } from '../../../constants/constants';
import {
  DEVICE_VIEW,
  UDOSE_AG_EDIT,
  UDOSE_AG_VIEW,
} from '../../../constants/path';
import {
  READ_DEVICE,
  READ_UDOSE_AG,
  UPDATE_UDOSE_AG,
} from '../../../constants/permissions';
import { can } from '../../../helpers/checkPermission';
import ActionDropdown from '../../../components/ActionDropdown';
import { CustomDropdownMenuItem } from '../../../types/common';
import ActiveInactiveStatus from '../../../components/ActiveInactiveStatus';

type Props = {
  data: any;
  pageNumber: number;
  handlePageChange: (e: any) => void;
  refetch: any;
};

const UdoseAgTable: React.FC<Props> = ({
  data,
  pageNumber,
  handlePageChange,
  refetch,
}) => {
  const canReadUdoseAg = can(READ_UDOSE_AG);
  const canReadDevice = can(READ_DEVICE);

  const actionColumnFormatter = (row: UdoseAgs) => {
    const menuItems: CustomDropdownMenuItem[] = [
      {
        label: 'View',
        icon: 'bx bx-show',
        url: prepareDynamicUrl(UDOSE_AG_VIEW, row.id),
        permission: READ_UDOSE_AG,
      },
      {
        label: 'Edit',
        icon: 'bx bx-edit',
        url: prepareDynamicUrl(UDOSE_AG_EDIT, row.id),
        permission: UPDATE_UDOSE_AG,
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

  const formatStatus = (row: UdoseAgs) => {
    return <ActiveInactiveStatus isActive={row.status === STATUS_ACTIVE} />;
  };

  const formatDeviceColumn = (row: UdoseAgs) => {
    return row?.device?.serial_number ? (
      canReadDevice ? (
        <Link
          to={prepareDynamicUrl(DEVICE_VIEW, row.device_id)}
          target="_blank">
          {row?.device?.serial_number}
        </Link>
      ) : (
        row?.device?.serial_number
      )
    ) : (
      '-'
    );
  };

  const formatNameColumn = (row: UdoseAgs) => {
    return row?.name ? (
      canReadUdoseAg ? (
        <Link to={prepareDynamicUrl(UDOSE_AG_VIEW, row.id)} target="_blank">
          {row?.name}
        </Link>
      ) : (
        row?.name
      )
    ) : (
      '-'
    );
  };

  const columns = [
    {
      text: 'Name',
      dataField: 'name',
      formatter: formatNameColumn,
    },
    {
      text: 'Customer',
      dataField: 'customer.business_name',
    },
    {
      text: 'Device',
      dataField: 'device.serial_number',
      formatter: formatDeviceColumn,
    },
    {
      text: 'Installed At',
      dataField: 'installed_at',
      formatter: (row: UdoseAgs) =>
        row.installed_at ? formattedShortDate(row.installed_at) : '-',
    },
    {
      text: 'Status',
      dataField: 'status',
      formatter: formatStatus,
    },
    {
      text: 'Communicated At',
      dataField: 'communicated_at',
      formatter: (row: UdoseAgs) =>
        row.communicated_at ? formattedDatetime(row.communicated_at) : '-',
    },

    {
      text: 'Action',
      dataField: '',
      formatter: actionColumnFormatter,
    },
  ];

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

export default UdoseAgTable;
