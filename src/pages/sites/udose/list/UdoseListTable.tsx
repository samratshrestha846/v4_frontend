/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import CustomLoader from '../../../../components/CustomLoader';
import CustomDataTable from '../../../../components/CustomDataTable';
import Pagination from '../../../../components/Pagination';
import {
  formattedShortDate,
  formattedTime,
  prepareDynamicUrl,
} from '../../../../helpers';
import {
  READ_DEVICE,
  READ_UDOSE,
  UPDATE_UDOSE,
} from '../../../../constants/permissions';
import { can } from '../../../../helpers/checkPermission';
import { Udose } from '../../../../types/udose/udoseList';

import {
  DEVICE_LOGS_LIST,
  DEVICE_VIEW,
  UDOSE_EDIT,
  UDOSE_VIEW,
} from '../../../../constants/path';
import { Supplement } from '../../../../types/supplements/supplement';
import IconLabelStatus from '../../../../components/IconLabelStatus';
import {
  ALARM_SEVERITY_LEVEL_ALARM,
  ALARM_SEVERITY_LEVELS,
  DOSER_COMMUNICATION_MESSAGES,
  DOSER_STATUS_ALARMED,
  DOSER_STATUS_RUNNING,
  DOSER_STATUS_STOPPED,
  TANK_RUNOUT_LEVEL_DANGER,
  TANK_RUNOUT_LEVEL_WARNING,
  WATER_FLOW_STATUS_OK,
  WATER_FLOW_STATUS_WARNING,
} from '../../../../constants/constants';
import TruncateTextWithOverlayTooltip from '../../../../components/TruncateTextWithOverlayTooltip';
import CustomTooltip from '../../../../components/CustomTooltip';
import SiteSupplements from '../../components/SiteSupplements';
import { CustomDropdownMenuItem, TableColumn } from '../../../../types/common';
import ActionDropdown from '../../../../components/ActionDropdown';

type Props = {
  pageNumber: number;
  isFetching: boolean;
  data?: any;
  handlePageChange: (e: any) => void;
  sort: any;
  direction: any;
  handleTabeDataSorting: (column: string) => void;
  isTestSiteList?: boolean;
};

const UdoseListTable: React.FC<Props> = ({
  pageNumber,
  isFetching,
  data,
  handlePageChange,
  sort,
  direction,
  handleTabeDataSorting,
  isTestSiteList,
}) => {
  const canReadDevice = can(READ_DEVICE);

  const statusFormatter = (row: Udose) => {
    if (row.is_running) {
      return (
        <IconLabelStatus
          label={DOSER_STATUS_RUNNING}
          iconTextClass="text-success"
        />
      );
    }

    if (row.is_alarmed) {
      const communicationMessage =
        DOSER_COMMUNICATION_MESSAGES[DOSER_STATUS_ALARMED];

      const severityLevel: any = row.alarm_type
        ? ALARM_SEVERITY_LEVELS[row.alarm_type.severity_level]
        : null;

      const doserStatusMessage =
        row.alarm_type?.severity_level === ALARM_SEVERITY_LEVEL_ALARM
          ? `${communicationMessage.message} ${row.alarm_type?.description}`
          : row.alarm_type?.description;

      return (
        <CustomTooltip
          tooltipText={doserStatusMessage}
          showIcon
          iconClass={communicationMessage.icon ?? 'bx bx-alarm'}
          iconTextClass={classNames(
            'font-16',
            severityLevel?.iconColor ?? 'text-warning'
          )}
          wrapperClass="bg-white"
          anglePeakClass="bg-white"
          innerWrapperClass={severityLevel?.bgColorClass}>
          <IconLabelStatus
            label={DOSER_STATUS_ALARMED}
            iconTextClass={severityLevel?.iconColor ?? 'text-warning'}
          />
        </CustomTooltip>
      );
    }

    return (
      <IconLabelStatus
        label={DOSER_STATUS_STOPPED}
        iconTextClass="text-light-gray"
      />
    );
  };

  const actionColumnFormatter = (row: Udose) => {
    const menuItems: CustomDropdownMenuItem[] = [
      {
        label: 'View',
        icon: 'bx bx-show',
        url: prepareDynamicUrl(UDOSE_VIEW, row.id),
        permission: READ_UDOSE,
      },
      {
        label: 'Edit',
        icon: 'bx bx-edit',
        url: prepareDynamicUrl(UDOSE_EDIT, row.id),
        permission: UPDATE_UDOSE,
      },

      {
        label: 'Device Logs',
        icon: 'bx bx-notepad',
        url: `${prepareDynamicUrl(DEVICE_LOGS_LIST, row?.id)}?ssn=${row.name}`,
        permission: READ_DEVICE,
      },
    ];

    if (isTestSiteList) {
      menuItems.pop(); // remove last item of menuItems for udose test sites
    }

    return (
      <ActionDropdown
        icon="bx bx-dots-vertical-rounded"
        iconColorClass="font-14 text-muted"
        containerClass="custom-dropdown d-flex align-items-center justify-content-between text-white"
        menuItems={menuItems}
      />
    );
  };

  const deviceFormatter = (row: Udose) => {
    if (!row.device) return '-';

    if (!canReadDevice) {
      return row.device?.serial_number;
    }
    return (
      <Link
        to={prepareDynamicUrl(DEVICE_VIEW, row.device?.id)}
        target="_blank"
        className="text-nowrap">
        {row.device?.serial_number}
      </Link>
    );
  };

  const siteNameFormatter = (row: Udose) => {
    return (
      <Link to={prepareDynamicUrl(UDOSE_VIEW, row.id)} className="text-nowrap">
        <TruncateTextWithOverlayTooltip text={row.name} endIndex={15} />
      </Link>
    );
  };

  const doseTriggerFormatter = (row: Udose) => {
    return (
      <span className="text-nowrap">
        {row.latest_setting?.target_dose && row.latest_setting?.trigger_point
          ? `${row.latest_setting.target_dose ?? ''}mL/${row.latest_setting.trigger_point ?? ''}L`
          : '-'}
      </span>
    );
  };

  const lowWaterFlowFormatter = (row: Udose) => {
    return (
      <span className={row.low_water_flow ? 'text-warning' : 'text-success'}>
        {row.low_water_flow ? WATER_FLOW_STATUS_WARNING : WATER_FLOW_STATUS_OK}
      </span>
    );
  };

  const supplementColumnFormatter = (row: Udose) => {
    return row?.site_supplement ? (
      <SiteSupplements
        supplement={row.site_supplement.supplement}
        traceSupplements={
          [
            ...(row?.site_supplement?.nutrients?.map(
              (element) => element.supplement
            ) ?? []),
          ] as Supplement[]
        }
      />
    ) : (
      '-'
    );
  };

  const lastSeenColumnFormatter = (row: Udose) => {
    return (
      <>
        <p className="m-0 text-nowrap">
          {row.communicated_at ? formattedShortDate(row.communicated_at) : '-'}
        </p>
        <small className="text-slate-gray">
          {row.communicated_at ? formattedTime(row.communicated_at) : '-'}
        </small>
      </>
    );
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
      dataField: 'latest_setting.supplement_name',
      text: 'Supplement',
      formatter: supplementColumnFormatter,
    },
    {
      dataField: 'nutrient_level',
      text: 'Nutrient Level(%)',
    },
    {
      dataField: 'latest_setting.target_dose',
      text: 'Dose/Trigger',
      formatter: doseTriggerFormatter,
    },
    {
      dataField: 'communication_message',
      text: 'Status',
      formatter: statusFormatter,
    },
    {
      dataField: 'low_water_flow',
      text: 'W.F in 10 hours',
      formatter: lowWaterFlowFormatter,
    },

    {
      dataField: 'communicated_at',
      text: 'Last Seen',
      formatter: lastSeenColumnFormatter,
      sortable: true,
    },
    {
      dataField: '',
      text: '',
      formatter: actionColumnFormatter,
    },
  ];

  return isFetching ? (
    <CustomLoader />
  ) : (
    <>
      <CustomDataTable
        columns={columns}
        data={data!.body}
        sort={sort}
        direction={direction}
        handleTabeDataSorting={handleTabeDataSorting}
      />
      <Pagination
        data={data?.meta_data?.pagination}
        pageNumber={pageNumber}
        handlePageChange={handlePageChange}
      />
    </>
  );
};

export default UdoseListTable;
