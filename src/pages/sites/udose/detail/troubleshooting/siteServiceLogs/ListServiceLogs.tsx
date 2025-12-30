import React from 'react';
import { Badge, Col, Row } from 'react-bootstrap';

import CustomDataTable from '../../../../../../components/CustomDataTable';
import CustomLoader from '../../../../../../components/CustomLoader';
import ErrorMessage from '../../../../../../components/ErrorMessage';
import {
  formattedHmsTime,
  formattedShortDate,
} from '../../../../../../helpers';
import Pagination from '../../../../../../components/Pagination';
import useServiceLogList from './hooks/useServiceLogList';
import { ServiceLog } from '../../../../../../types/udose/serviceLog';
import AddServiceLogModal from './modal/AddServiceLogModal';
import useModalFeature from '../../../../../../hooks/common/useModalFeature';
import { can } from '../../../../../../helpers/checkPermission';
import {
  CREATE_SITE_SERVICE_LOG,
  UPDATE_SITE_SERVICE_LOG,
} from '../../../../../../constants/permissions';
import EditServiceLogButton from './EditServiceLogButton';
import useAuth from '../../../../../../hooks/useAuth';
import AddNewRecordUsingModal from '../../../../../../components/AddNewRecordUsingModal';

const ListServiceLogs: React.FC = () => {
  const { isCustomer } = useAuth();
  const canCreateSiteServiceLog = can(CREATE_SITE_SERVICE_LOG);
  const canUpdateSiteServiceLog = can(UPDATE_SITE_SERVICE_LOG);

  const {
    data,
    isFetching,
    isError,
    refetch: refetchServiceLogs,
    pageNumber,
    handlePageChange,
  } = useServiceLogList();

  const { showModal, toggleModal } = useModalFeature();

  const formatStatus = (row: ServiceLog) => {
    if (!row.status) {
      return null;
    }

    return (
      <Badge
        className={`badge-outline-${row.status === 'completed' ? 'success' : 'gray'}`}>
        {row.status === 'completed' ? 'Completed' : 'To Do'}
      </Badge>
    );
  };

  const actionColumnFormatter = (row: ServiceLog) => {
    return (
      <div className="button-list action-icon">
        {canUpdateSiteServiceLog && (
          <EditServiceLogButton
            serviceLogDetail={row}
            refetchServiceLogs={refetchServiceLogs}
          />
        )}
      </div>
    );
  };

  const customerColumns = [
    {
      text: 'Date',
      dataField: 'date',
      formatter: (row: ServiceLog) =>
        row.date ? formattedShortDate(row.date) : '-',
    },
    {
      text: 'Maintainer',
      dataField: 'maintainer',
      formatter: (row: ServiceLog) =>
        `${row.maintainer.first_name} ${row.maintainer.last_name}`,
    },

    {
      text: 'Status',
      dataField: 'status',
      formatter: formatStatus,
    },
  ];

  const columns = [
    {
      text: 'Date',
      dataField: 'date',
      formatter: (row: ServiceLog) =>
        row.date ? formattedShortDate(row.date) : '-',
    },
    {
      text: 'Serviced By',
      dataField: 'maintainer',
      formatter: (row: ServiceLog) =>
        row.maintainer
          ? `${row.maintainer.first_name} ${row.maintainer.last_name}`
          : '-',
    },
    {
      text: 'Arrival Time',
      dataField: 'arrival_time',
      formatter: (row: ServiceLog) =>
        row.arrival_time ? formattedHmsTime(row.arrival_time) : '-',
    },
    {
      text: 'Departure Time',
      dataField: 'departure_time',
      formatter: (row: ServiceLog) =>
        row.departure_time ? formattedHmsTime(row.departure_time) : '-',
    },
    {
      text: 'Notes',
      dataField: 'notes',
    },
    {
      text: 'Status',
      dataField: 'status',
      formatter: formatStatus,
    },
    {
      text: 'Action',
      dataField: '',
      formatter: actionColumnFormatter,
    },
  ];

  if (isError) {
    return <ErrorMessage />;
  }

  return (
    <>
      <Row>
        <Col md={6} sm={6}>
          <h5 className="text-primary-color">Site Service Logs</h5>
        </Col>
        {canCreateSiteServiceLog && (
          <Col md={6} sm={6} className="mb-2">
            <AddNewRecordUsingModal
              toggleModal={toggleModal}
              title="Add Service Log"
            />
          </Col>
        )}
      </Row>

      {isFetching ? (
        <CustomLoader />
      ) : (
        <>
          <CustomDataTable
            columns={isCustomer ? customerColumns : columns}
            data={data!.body}
          />
          <Pagination
            data={data?.meta_data?.pagination}
            pageNumber={pageNumber}
            handlePageChange={handlePageChange}
          />
        </>
      )}

      <AddServiceLogModal
        showModal={showModal}
        toggleModal={toggleModal}
        refetchServiceLogs={refetchServiceLogs}
      />
    </>
  );
};

export default ListServiceLogs;
