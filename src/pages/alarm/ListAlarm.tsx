import React from 'react';
import { Card } from 'react-bootstrap';
import useAlarmList from './hooks/useAlarmsList';
import PageTitle from '../../components/PageTitle';
import CustomDataTable from '../../components/CustomDataTable';
import Pagination from '../../components/Pagination';
import CustomLoader from '../../components/CustomLoader';
import ErrorMessage from '../../components/ErrorMessage';
import ActiveInactiveStatus from '../../components/ActiveInactiveStatus';
import FilterAlarm from './FilterAlarm';
import TruncateTextWithOverlayTooltip from '../../components/TruncateTextWithOverlayTooltip';
import { CustomDropdownMenuItem, TableColumn } from '../../types/common';
import {
  EXTERNAL_VISIBILITY_NO,
  EXTERNAL_VISIBILITY_YES,
  STATUS_ACTIVE,
} from '../../constants/constants';
import { Alarm } from '../../types/alarm/alarm';
import { READ_ALARM, UPDATE_ALARM } from '../../constants/permissions';
import { ALARM_EDIT, ALARM_VIEW } from '../../constants/path';
import { prepareDynamicUrl } from '../../helpers';
import ActionDropdown from '../../components/ActionDropdown';

const ListAlarm = () => {
  const {
    pageNumber,
    data,
    isFetching,
    isError,
    handlePageChange,
    severityLevel,
    setSeveritylevel,
    status,
    setStatus,
    visibility,
    setVisibility,
  } = useAlarmList();

  const formatStatus = (row: Alarm) => {
    return row?.status != null ? (
      <ActiveInactiveStatus isActive={row?.status === STATUS_ACTIVE} />
    ) : (
      '-'
    );
  };

  const formatExternalVisibility = (row: Alarm) => {
    const externalVisibility = row?.visible_to_customers;
    if (externalVisibility === EXTERNAL_VISIBILITY_YES) return 'Yes';
    if (externalVisibility === EXTERNAL_VISIBILITY_NO) return 'No';
    return '-';
  };

  const descriptionFormatter = (row: Alarm) => {
    return row.description ? (
      <TruncateTextWithOverlayTooltip text={row.description} endIndex={30} />
    ) : (
      '-'
    );
  };

  const actionColumnFormatter = (row: Alarm) => {
    const menuItems: CustomDropdownMenuItem[] = [
      {
        label: 'View',
        icon: 'bx bx-show',
        url: prepareDynamicUrl(ALARM_VIEW, row.id),
        permission: READ_ALARM,
      },
      {
        label: 'Edit',
        icon: 'bx bx-edit',
        url: prepareDynamicUrl(ALARM_EDIT, row.id),
        permission: UPDATE_ALARM,
      },
    ];

    return (
      <ActionDropdown
        icon="bx bx-dots-vertical-rounded"
        iconColorClass="text-muted"
        containerClass="custom-dropdown d-flex align-items-center justify-content-between text-white"
        menuItems={menuItems}
      />
    );
  };

  const columns: TableColumn[] = [
    {
      dataField: 'severity_level',
      text: 'Severity Level',
    },
    { dataField: 'alarm_code', text: 'Alarm Code' },
    { dataField: 'status', text: 'Status', formatter: formatStatus },
    {
      dataField: 'visible_to_customers',
      text: 'External Visibility',
      formatter: formatExternalVisibility,
    },
    {
      dataField: 'description',
      text: 'Description',
      formatter: descriptionFormatter,
    },
    { dataField: 'action', text: '', formatter: actionColumnFormatter },
  ];

  if (isError) {
    return <ErrorMessage />;
  }

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          {
            label: 'All Alarms',
            path: '/alarm',
            active: true,
          },
        ]}
        title="Alarm"
      />

      <Card>
        <Card.Body>
          <FilterAlarm
            severityLevel={severityLevel}
            setSeveritylevel={setSeveritylevel}
            status={status}
            setStatus={setStatus}
            visibility={visibility}
            setVisibility={setVisibility}
          />

          {isFetching ? (
            <CustomLoader />
          ) : (
            <>
              <CustomDataTable columns={columns} data={data!.body} />

              <Pagination
                data={data?.meta_data?.pagination}
                pageNumber={pageNumber}
                handlePageChange={handlePageChange}
              />
            </>
          )}
        </Card.Body>
      </Card>
    </>
  );
};

export default ListAlarm;
