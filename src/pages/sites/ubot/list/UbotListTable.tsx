/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import CustomLoader from '../../../../components/CustomLoader';
import CustomDataTable from '../../../../components/CustomDataTable';
import Pagination from '../../../../components/Pagination';
import { prepareDynamicUrl, tabularDate } from '../../../../helpers';
import {
  READ_DEVICE,
  READ_UBOT,
  UPDATE_UBOT,
} from '../../../../constants/permissions';
import { can } from '../../../../helpers/checkPermission';
import { UbotSite, UbotSiteList } from '../../../../types/ubot';
import { UBOT_EDIT, UBOT_VIEW } from '../../../../constants/path';
import ActionDropdown from '../../../../components/ActionDropdown';
import { CustomDropdownMenuItem, TableColumn } from '../../../../types/common';

type Props = {
  pageNumber: number;
  isFetching: boolean;
  data: UbotSiteList | undefined;
  handlePageChange: (e: any) => void;
  sort?: string;
  direction?: string;
  handleTabeDataSorting: (column: string) => void;
};

const UbotListTable: React.FC<Props> = ({
  pageNumber,
  isFetching,
  data,
  handlePageChange,
  sort,
  direction,
  handleTabeDataSorting,
}) => {
  const canReadDevice = can(READ_DEVICE);

  const actionColumnFormatter = (row: UbotSite) => {
    const menuItems: CustomDropdownMenuItem[] = [
      {
        label: 'View',
        icon: 'bx bx-show',
        url: prepareDynamicUrl(UBOT_VIEW, row.id),
        permission: READ_UBOT,
      },
      {
        label: 'Edit',
        icon: 'bx bx-edit',
        url: prepareDynamicUrl(UBOT_EDIT, row.id),
        permission: UPDATE_UBOT,
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

  const deviceFormatter = (row: UbotSite) => {
    if (!row.device) return '-';

    if (!canReadDevice) {
      return row.device?.serial_number;
    }

    return (
      <Link to="/" target="_blank" className="text-primary">
        {row.device?.serial_number} <i className="bx bx-link-external" />
      </Link>
    );
  };

  const siteNameFormatter = (row: UbotSite) => {
    return (
      <Link to="/" target="_blank" className="text-primary">
        {row.name.slice(0, 30) + ((row.name.length > 30 && '...') || '')}
        <i className="bx bx-link-external" />
      </Link>
    );
  };

  const lastCommunicatedFormatter = (row: UbotSite) => {
    if (!row.communicated_at) return '-';

    let communicatedDate: any = tabularDate(row.communicated_at);

    if (moment().diff(moment.utc(row.communicated_at).local(), 'hours') > 40) {
      communicatedDate = (
        <span className="text-danger font-weight-bold">{communicatedDate}</span>
      );
    } else {
      communicatedDate = <span>{communicatedDate}</span>;
    }
    return communicatedDate;
  };

  const columns: TableColumn[] = [
    {
      dataField: 'name',
      text: 'Name',
      sortable: true,
      formatter: siteNameFormatter,
    },
    {
      dataField: 'device.serial_number',
      text: 'Device',
      sortable: true,
      formatter: deviceFormatter,
    },
    {
      dataField: 'communicated_at',
      text: 'Last Seen',
      formatter: lastCommunicatedFormatter,
    },
    {
      dataField: 'action',
      text: '',
      formatter: actionColumnFormatter,
    },
  ];

  if (isFetching) return <CustomLoader />;

  return (
    <>
      <CustomDataTable
        columns={columns}
        data={data!.body}
        sort={sort}
        direction={direction}
        handleTabeDataSorting={handleTabeDataSorting}
      />
      <Pagination
        data={data!.meta_data!.pagination}
        pageNumber={pageNumber}
        handlePageChange={handlePageChange}
      />
    </>
  );
};

export default UbotListTable;
