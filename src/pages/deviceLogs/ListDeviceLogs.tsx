import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import classNames from 'classnames';
import { useParams, useSearchParams } from 'react-router-dom';
import ErrorMessage from '../../components/ErrorMessage';
import PageTitle from '../../components/PageTitle';
import useListDeviceLogs from './hooks/useListDeviceLogs';
import CustomDataTable from '../../components/CustomDataTable';
import Pagination from '../../components/Pagination';
import { DEVICE_LOGS_LIST, UDOSE_LIST } from '../../constants/path';
import CustomLoader from '../../components/CustomLoader';
import { DeviceLog } from '../../types/device/deviceLogs';
import { formattedDatetime } from '../../helpers';
import { TableColumn } from '../../types/common';
import SearchBox from '../../components/SearchBox';
import FilterDeviceLogs from './FilterDeviceLogs';
import { DEVICE_LOG_ACTION_INSTALLED } from '../../constants/constants';
import CircleNameInitials from '../../components/CircleNameInitials';

const ListDeviceLogs: React.FC = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  const siteSerialNo = searchParams.get('ssn');

  const {
    data,
    isFetching,
    isError,
    pageNumber,
    search,
    handlePageChange,
    handleSearchOnChange,
    sort,
    direction,
    handleTabeDataSorting,
    duration,
    setDuration,
    action,
    setAction,
  } = useListDeviceLogs({ siteId: Number(id) });

  if (isError) {
    return <ErrorMessage />;
  }

  const actionColumnFormatter = (row: DeviceLog) => {
    return (
      <div className="d-flex justify-content-start align-items-center">
        <i
          className={classNames(
            'bx bxs-circle me-1',
            row.action === DEVICE_LOG_ACTION_INSTALLED
              ? 'text-royal-blue'
              : 'text-dark'
          )}
        />
        <span>
          {row.action === DEVICE_LOG_ACTION_INSTALLED
            ? 'Installed'
            : 'Uninstalled'}
        </span>
      </div>
    );
  };

  const performerColumnformatter = (row: DeviceLog) => {
    return row?.performer ? (
      <CircleNameInitials
        fullName={`${row?.performer?.first_name} ${row?.performer?.last_name}`}
        index={row.site_id}
      />
    ) : (
      '-'
    );
  };

  const columns: TableColumn[] = [
    {
      dataField: 'device_serial_number',
      text: 'Device Serial No.',
      sortable: true,
      formatter: (row: DeviceLog) => row?.device?.serial_number ?? '-',
    },
    {
      dataField: 'updated_at',
      text: 'Date',
      formatter: (row: DeviceLog) =>
        row?.updated_at ? formattedDatetime(row.updated_at) : row?.updated_at,
      sortable: true,
    },
    {
      dataField: 'action',
      text: 'Action',
      formatter: actionColumnFormatter,
      sortable: true,
    },
    {
      dataField: 'performer.first_name',
      text: 'Performer',
      formatter: performerColumnformatter,
    },
  ];

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: 'uDose Sites', path: UDOSE_LIST },
          { label: 'Device Logs', path: DEVICE_LOGS_LIST, active: true },
        ]}
        title={siteSerialNo || 'Device Logs'}
      />

      <FilterDeviceLogs
        duration={duration}
        setDuration={setDuration}
        action={action}
        setAction={setAction}
      />

      <Card>
        <Card.Body>
          <Row>
            <Col md={4}>
              <SearchBox
                handleSearchOnChange={handleSearchOnChange}
                search={search}
              />
            </Col>
          </Row>

          {isFetching ? (
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
                data={data!.meta_data!.pagination}
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

export default ListDeviceLogs;
