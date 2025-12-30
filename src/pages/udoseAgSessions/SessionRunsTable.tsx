import React from 'react';
import { Card } from 'react-bootstrap';
import moment from 'moment';
import CustomLoader from '../../components/CustomLoader';
import useSessionSummaries from './hooks/useSessionSummaries';
import Pagination from '../../components/Pagination';
import ErrorMessage from '../../components/ErrorMessage';
import { formattedDatetime, prepareDynamicUrl } from '../../helpers';
import {
  ASSIGN_AREA_AND_FERTILIZER_TO_SESSION_SUMMARY,
  READ_UDOSE_AG_SESSION,
} from '../../constants/permissions';
import DURATION_OPTIONS from '../../constants/durationOptions';
import DurationFilter from '../../components/Form/DurationFilter';
import { CustomDropdownMenuItem, TableColumn } from '../../types/common';
import CustomDataTable from '../../components/CustomDataTable';
import { UdoseAgSessionSummary } from '../../types/udoseAgs/udoseAgs';
import { UDOSE_AG_SESSION_SUMMARY_VIEW } from '../../constants/path';
import {
  ACTION_ADD_COVERAGE_AREA_AND_FERTILIZER,
  ACTION_EDIT_COVERAGE_AREA_AND_FERTILIZER,
} from './constants/actionConstants';
import ActionDropdown from '../../components/ActionDropdown';
import AssignAreaAndFertilizer from './AssignAreaAndFertilizer';
import WaterFertilizerFlowInfo from '../udoseAgSessions/components/WaterFertilizerFlowInfo';
import EditAreaAndFertilizer from './EditAreaAndFertilizer';
import UdoseAgSessionSummaryStatus from '../udoseAgs/components/UdoseAgSessionSummaryStatus';

const SessionRunsTable: React.FC = () => {
  const {
    data,
    isFetching,
    isError,
    pageNumber,
    handlePageChange,
    duration,
    handleChangeDuration,
    refetch: refetchSessionSummaries,
    noDateMessageInSelectedDateRage,
  } = useSessionSummaries();

  const statusFormatter = (row: UdoseAgSessionSummary) => {
    return <UdoseAgSessionSummaryStatus status={row.status} />;
  };

  const coverageFieldFormatter = (row: UdoseAgSessionSummary) => {
    const fieldName: string[] = [];
    if (row.sub_block) {
      fieldName.push(row.sub_block.name);
    }
    if (row.block) {
      fieldName.push(row.block.name);
    }
    if (row.paddock) {
      fieldName.push(row.paddock.name);
    }

    if (row.customer_property) {
      fieldName.push(row.customer_property.name);
    }

    if (fieldName.length === 0) {
      return '-';
    }
    return fieldName.join(', ');
  };

  const waterFlowFormatter = (row: UdoseAgSessionSummary) => {
    return (
      <WaterFertilizerFlowInfo
        flowValue={row.water_flow}
        flowValueUnit="L"
        containerClass="session-summary bg-water-flow text-center"
      />
    );
  };

  const fertilizerFlowFormatter = (row: UdoseAgSessionSummary) => {
    return (
      <WaterFertilizerFlowInfo
        flowValue={row.fertiliser_flow}
        flowValueUnit="L"
        containerClass="session-summary bg-fertilizer-flow text-center"
      />
    );
  };

  const actionFormatter = (row: UdoseAgSessionSummary) => {
    const menuItems: CustomDropdownMenuItem[] = [
      {
        label: 'View Session Summary',
        icon: 'bx bx-show',
        url: prepareDynamicUrl(UDOSE_AG_SESSION_SUMMARY_VIEW, row.id),
        permission: READ_UDOSE_AG_SESSION,
      },
    ];

    if (row.customer_property && row.paddock && row.block && row.fertilizer) {
      menuItems.push({
        label: 'Edit Area/Fertilizer',
        icon: 'bx bx-edit',
        actionKey: ACTION_EDIT_COVERAGE_AREA_AND_FERTILIZER,
        modalContent: <EditAreaAndFertilizer sessionSummaryId={row.id} />,
        permission: ASSIGN_AREA_AND_FERTILIZER_TO_SESSION_SUMMARY,
        isDependedAction: true,
      });
    } else {
      menuItems.push({
        label: 'Add Area/Fertilizer',
        icon: 'bx bx-plus',
        actionKey: ACTION_ADD_COVERAGE_AREA_AND_FERTILIZER,
        modalContent: <AssignAreaAndFertilizer sessionSummaryId={row.id} />,
        permission: ASSIGN_AREA_AND_FERTILIZER_TO_SESSION_SUMMARY,
      });
    }
    return (
      <ActionDropdown
        icon="bx bx-dots-vertical-rounded"
        iconColorClass="text-gray"
        containerClass="d-flex align-items-center justify-content-between custom-dropdown text-white"
        menuItems={menuItems}
        refetch={refetchSessionSummaries}
      />
    );
  };

  const tableColumn: TableColumn[] = [
    {
      text: 'Schedule Date Time',
      dataField: 'started_at',
      formatter: (row: UdoseAgSessionSummary) =>
        row.started_at ? formattedDatetime(row?.started_at) : '-',
    },
    {
      text: 'Status',
      dataField: 'status',
      formatter: statusFormatter,
    },
    {
      text: 'Ran Hours',
      dataField: 'ran_hours',
      formatter: (row: UdoseAgSessionSummary) =>
        row?.ended_at && row?.started_at
          ? `${moment(row?.ended_at).diff(row?.started_at, 'hours')}`
          : '-',
    },
    {
      text: 'Coverage Area',
      dataField: 'coverage_area',
      formatter: coverageFieldFormatter,
    },
    {
      text: 'Fertilizer',
      dataField: 'fertilizer.name',
    },
    {
      text: 'Water Flow',
      dataField: 'water_flow',
      formatter: waterFlowFormatter,
    },
    {
      text: 'Fertilizer Flow',
      dataField: 'fertiliser_flow',
      formatter: fertilizerFlowFormatter,
    },
    {
      text: '',
      dataField: 'action',
      formatter: actionFormatter,
    },
  ];

  if (isError) {
    return (
      <ErrorMessage message="Unable to load fertigation sessions. Please try again in a few minutes." />
    );
  }

  return (
    <Card className="udsoeag-summary-card">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-2 gap-2">
          <h5 className="m-0 text-primary-color">uDOSE Ag Session</h5>
          <DurationFilter
            duration={duration}
            handleChangeDuration={handleChangeDuration}
            options={DURATION_OPTIONS}
            className="mb-0"
          />
        </div>

        {isFetching ? (
          <CustomLoader />
        ) : (
          <>
            <CustomDataTable
              columns={tableColumn}
              data={data!.body}
              tableClassName="session-runs-table"
              noDataMessage={duration ? noDateMessageInSelectedDateRage : null}
            />
            <Pagination
              data={data?.meta_data?.pagination}
              pageNumber={pageNumber}
              handlePageChange={handlePageChange}
            />
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default SessionRunsTable;
