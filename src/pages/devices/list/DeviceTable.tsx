/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import { can } from '../../../helpers/checkPermission';
import { UPDATE_DEVICE, READ_DEVICE } from '../../../constants/permissions';
import CustomDataTable from '../../../components/CustomDataTable';
import Pagination from '../../../components/Pagination';
import StockTypeModule from '../components/DeviceStockType';
import {
  DEVICE_EDIT,
  DEVICE_EDIT_STOCK_TYPE,
  DEVICE_SITE_LOGS_LIST,
  DEVICE_VIEW,
} from '../../../constants/path';
import { formattedShortDate, prepareDynamicUrl } from '../../../helpers';
import { Device } from '../../../types/device/device';
import { DEVICE_STOCK_TYPE_INSTALLED } from '../../../constants/stockTypes';
import ActionDropdown from '../../../components/ActionDropdown';

type DeviceTableProps = {
  data: any;
  pageNumber: number;
  handlePageChange: (e: any) => void;
};

const DeviceTable: React.FC<DeviceTableProps> = ({
  data,
  pageNumber,
  handlePageChange,
}) => {
  const canReadDevice = can(READ_DEVICE);

  const formatSerialNumber = (row: Device) => {
    return canReadDevice ? (
      <Link
        to={prepareDynamicUrl(DEVICE_VIEW, row.id)}
        className="text-primary fw-medium">
        {row.serial_number.toUpperCase()}
      </Link>
    ) : null;
  };

  const formatStockType = (row: Device) => {
    return <StockTypeModule stockTypeName={row.stock_type_name} />;
  };

  const actionColumnFormatter = (row: Device) => {
    const menuItems = [
      {
        label: 'View',
        icon: 'bx bx-show',
        url: prepareDynamicUrl(DEVICE_VIEW, row.id),
        permission: READ_DEVICE,
      },
      {
        label: 'Edit',
        icon: 'bx bx-edit',
        url: prepareDynamicUrl(DEVICE_EDIT, row.id),
        permission: UPDATE_DEVICE,
      },
      {
        label: 'Update Stock Stype',
        icon: 'bx bx-message-edit',
        url: prepareDynamicUrl(DEVICE_EDIT_STOCK_TYPE, row?.id),
        permission: UPDATE_DEVICE,
      },
    ];

    if (row.stock_type_name === DEVICE_STOCK_TYPE_INSTALLED) {
      menuItems.push({
        label: 'Site Logs',
        icon: 'bx bx-notepad',
        url: `${prepareDynamicUrl(DEVICE_SITE_LOGS_LIST, row?.id)}?dsn=${row.serial_number}`,
        permission: READ_DEVICE,
      });
    }

    return (
      <ActionDropdown
        icon="bx bx-dots-vertical-rounded"
        iconColorClass="text-muted"
        containerClass="custom-dropdown d-flex align-items-center justify-content-between text-white"
        menuItems={menuItems}
      />
    );
  };

  const columns = [
    {
      text: 'Site Name',
      dataField: 'site.name',
    },
    {
      text: 'Serial Number',
      dataField: 'serial_number',
      sortable: false,
      formatter: formatSerialNumber,
      format: true,
    },
    {
      text: 'Configuration',
      dataField: 'device_configuration.name',
      sortable: false,
    },
    {
      text: 'Gateway Modem',
      dataField: 'gateway_modem_number',
      sortable: false,
      format: false,
    },
    {
      text: 'Telemetry',
      dataField: 'telemetry',
      sortable: false,
      format: false,
    },
    {
      text: 'Stock Type',
      dataField: 'stock_type.name',
      sortable: false,
      formatter: formatStockType,
      format: true,
    },
    {
      text: 'Created At',
      dataField: 'created_at',
      sortable: false,
      formatter: (row: Device) =>
        row.created_at ? formattedShortDate(row.created_at) : '-',
      format: true,
    },
    {
      text: '',
      dataField: 'df1',
      sortable: false,
      formatter: actionColumnFormatter,
      format: true,
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

export default DeviceTable;
