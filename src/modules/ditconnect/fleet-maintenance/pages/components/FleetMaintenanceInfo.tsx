import React from 'react';
import { Row, Col } from 'react-bootstrap';

import { formattedDatetime } from '@uhub/helpers';

import { FleetMaintenanceResponse } from '../../types/FleetMaintenance';
import FleetMaintenanceStatus from './FleetMaintenanceStatus';

type Props = {
  maintenance: FleetMaintenanceResponse;
};

const FleetMaintenanceInfo: React.FC<Props> = ({ maintenance }) => {
  return (
    <Row>
      <Col sm={6} md={3}>
        <h6 className="font-14">Vehicle</h6>
        <p>
          {maintenance?.vehicle
            ? `${maintenance?.vehicle?.reg_number ?? ''} ${maintenance?.vehicle?.type ?? ''} `
            : '-'}
        </p>
      </Col>
      <Col sm={6} md={3}>
        <h6 className="font-14">Type</h6>
        <div className="d-flex justify-content-start align-items-center gap-2 mb-2">
          <p className="m-0">{maintenance?.maintenance_type ?? '-'}</p>
          <FleetMaintenanceStatus status={maintenance?.maintenance_status} />
        </div>
      </Col>
      <Col sm={6} md={3}>
        <h6 className="font-14">Location</h6>
        <p>{maintenance?.location ?? '-'}</p>
      </Col>
      <Col sm={6} md={3}>
        <h6 className="font-14">Driven</h6>
        <p>{maintenance?.no_of_kms ?? '-'} Km</p>
      </Col>

      <Col sm={6} md={3}>
        <h6 className="font-14">Reported By</h6>
        <p>
          {maintenance?.reported_by_user
            ? `${maintenance?.reported_by_user?.first_name} ${maintenance?.reported_by_user?.last_name}`
            : '-'}
        </p>
      </Col>
      <Col sm={6} md={3}>
        <h6 className="font-14">Reported On</h6>
        <p>
          {maintenance?.created_at
            ? formattedDatetime(maintenance.created_at)
            : '-'}
        </p>
      </Col>
      <Col sm={6} md={3}>
        <h6 className="font-14">Tyre Condition</h6>
        <p>{maintenance?.tyre_condition ?? '-'}</p>
      </Col>
      <Col sm={6} md={3}>
        <h6 className="font-14">Windscreen</h6>
        <p>{maintenance?.windscreen ?? '-'}</p>
      </Col>
      <Col sm={6} md={3}>
        <h6 className="font-14">IOR Tag Number</h6>
        <p>{maintenance?.fleet_card_number ?? '-'}</p>
      </Col>
      <Col sm={6} md={6}>
        <h6 className="font-14">Details</h6>
        <p>{maintenance?.maintenance_detail ?? '-'}</p>
      </Col>
    </Row>
  );
};

export default FleetMaintenanceInfo;
