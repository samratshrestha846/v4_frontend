import React from 'react';
import { Accordion, Badge } from 'react-bootstrap';
import { CeresTagAlert } from '@uhub/types/ceresTag/ceresTag';
import CustomLoader from '../../../../components/CustomLoader';
import ErrorMessage from '../../../../components/ErrorMessage';
import { formattedShortDate, formattedTime } from '../../../../helpers';
import {
  ALERT_ACTIVITY_THRESHOLD_HIGH,
  ALERT_ACTIVITY_THRESHOLD_LOW,
  ALERT_ACTIVITY_THRESHOLD_NONE,
  ALERT_TYPES,
} from '../../../../constants/ceresTagConstants';
import useListAlerts from '../../hooks/useListAlerts';
import Pagination from '../../../../components/Pagination';
import FilterAlerts from './FilterAlerts';
import CustomDataTable from '../../../../components/CustomDataTable';

type Props = {
  ceresTagId: string | undefined;
};

const ListAlerts: React.FC<Props> = ({ ceresTagId }) => {
  const {
    data,
    isFetching,
    isError,
    pageNumber,
    handlePageChange,
    alerts,
    loading,
    duration,
    handleChangeDuration,
  } = useListAlerts(ceresTagId);

  if (isError) return <ErrorMessage />;

  const getAlertByType = (row: CeresTagAlert) => {
    switch (row.alert_type) {
      case ALERT_ACTIVITY_THRESHOLD_NONE:
        return (
          <Badge className="badge-dark-lighten">
            {ALERT_TYPES[row.alert_type]}
          </Badge>
        );

      case ALERT_ACTIVITY_THRESHOLD_LOW:
        return (
          <Badge className="badge-warning-lighten">
            {ALERT_TYPES[row.alert_type]}
          </Badge>
        );
      case ALERT_ACTIVITY_THRESHOLD_HIGH:
        return (
          <Badge className="badge-danger-lighten">
            {ALERT_TYPES[row.alert_type]}
          </Badge>
        );
      default:
        return '';
    }
  };

  const coordinateFormatter = (row: CeresTagAlert) => {
    if (row.latitude !== undefined && row.longitude !== undefined) {
      return `${Number(row.latitude).toFixed(6)}, ${Number(row.longitude).toFixed(6)}`;
    }
    return '-';
  };

  const columns = [
    {
      dataField: 'alert_timestamp',
      text: 'Time',
      formatter: (row: CeresTagAlert) =>
        row.alert_timestamp ? formattedTime(row.alert_timestamp) : '-',
    },
    {
      dataField: 'latitude',
      text: 'Coordinate',
      formatter: coordinateFormatter,
    },

    {
      dataField: 'alert_type',
      text: 'Alert Type',
      formatter: getAlertByType,
    },
  ];

  return (
    <>
      <FilterAlerts
        duration={duration}
        handleChangeDuration={handleChangeDuration}
      />
      {isFetching || loading ? (
        <CustomLoader />
      ) : (
        <>
          <div className="mb-3">
            <Accordion defaultActiveKey="0" className="mt-1">
              {alerts?.map((item, itemKey) => (
                <Accordion.Item
                  key={item.date}
                  eventKey={itemKey.toString()}
                  className="mt-2">
                  <Accordion.Header className="mt-0">
                    <h5 className="txt-primary-color m-0">
                      <i className="bx bx-calendar me-1" />
                      {formattedShortDate(item.date)}
                    </h5>
                  </Accordion.Header>
                  <Accordion.Body>
                    <div className="table-responsive">
                      <CustomDataTable columns={columns} data={data!.body} />
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              )) ?? 'No Alerts Found'}
            </Accordion>
          </div>
          <Pagination
            data={data!.meta_data!.pagination}
            pageNumber={pageNumber}
            handlePageChange={handlePageChange}
          />
        </>
      )}
    </>
  );
};

export default ListAlerts;
