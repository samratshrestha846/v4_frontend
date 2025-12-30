import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';

import CustomDataTable from '@uhub/components/CustomDataTable';
import { TableColumn } from '@uhub/types/common';
import FormattedDateTime from '@uhub/components/FormattedDateTime';
import CustomTooltip from '@uhub/components/CustomTooltip';

import { FleetMaintenanceResponse } from '../../../fleet-maintenance/types/FleetMaintenance';
import FleetMaintenanceStatus from '../../../fleet-maintenance/pages/components/FleetMaintenanceStatus';

type Props = {
  maintenances: FleetMaintenanceResponse[];
};

const ListVehicleMaintenances: React.FC<Props> = ({ maintenances }) => {
  const submittedOnColumnFormatter = (row: FleetMaintenanceResponse) => {
    return row?.created_at ? (
      <FormattedDateTime dataTime={row.created_at} />
    ) : (
      '-'
    );
  };

  const statusColumnFormatter = (row: FleetMaintenanceResponse) => {
    return <FleetMaintenanceStatus status={row.maintenance_status} />;
  };

  const detailColumnFormatter = (row: FleetMaintenanceResponse) => {
    const truncateLength = 25;
    return row?.maintenance_detail?.length > truncateLength ? (
      <div className="d-block-flex-basis">
        <CustomTooltip
          tooltipText={row.maintenance_detail}
          wrapperClass="bg-white"
          anglePeakClass="bg-white"
          innerWrapperClass="bg-white">
          <span className="text-truncate-short">
            {row.maintenance_detail.substring(0, truncateLength)}...
          </span>
        </CustomTooltip>
      </div>
    ) : (
      (row?.maintenance_detail ?? '-')
    );
  };

  const columns: TableColumn[] = [
    {
      text: 'Reported By',
      dataField: 'reported_by_user.name',
      formatter: (row: FleetMaintenanceResponse) =>
        row.reported_by_user
          ? `${row.reported_by_user?.first_name} ${row.reported_by_user?.last_name}`
          : '-',
    },
    {
      text: 'Reported On',
      dataField: 'created_at',
      formatter: submittedOnColumnFormatter,
    },
    {
      text: 'Type',
      dataField: 'maintenance_type',
    },
    {
      text: 'Details',
      dataField: 'maintenance_detail',
      formatter: detailColumnFormatter,
    },
    {
      text: 'Status',
      dataField: 'status',
      formatter: statusColumnFormatter,
    },
  ];

  return (
    <>
      <Row>
        <Col>
          <h4 className="mt-0 text-primary-color fw-semibold">Maintenances</h4>
        </Col>
      </Row>
      <Card className="tilebox-one">
        <Card.Body>
          <CustomDataTable columns={columns} data={maintenances} />
        </Card.Body>
      </Card>
    </>
  );
};

export default ListVehicleMaintenances;
