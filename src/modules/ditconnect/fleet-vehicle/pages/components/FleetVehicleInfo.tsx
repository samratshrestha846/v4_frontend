import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';

import { formattedShortDate } from '@uhub/helpers';
import IconLabelStatus from '@uhub/components/IconLabelStatus';
import {
  FLEET_VEHICLE_STATUS_ACTIVE,
  FLEET_VEHICLE_STATUS_INACTIVE,
} from '../../constants/constant';

import { FleetVehicleResponse } from '../../types/FleetVehicle';

type Props = {
  vehicle: FleetVehicleResponse;
};

const FleetVehicleInfo: React.FC<Props> = ({ vehicle }) => {
  return (
    <Card className="tilebox-one">
      <Card.Body>
        <Row>
          <Col sm={6} md={4}>
            <h6 className="font-14">Registration Number</h6>
            <p>{vehicle?.reg_number ?? '-'}</p>
          </Col>
          <Col sm={6} md={4}>
            <h6 className="font-14">Type</h6>
            <p>{vehicle?.type ?? '-'}</p>
          </Col>
          <Col sm={6} md={4}>
            <h6 className="font-14">Purchased Date</h6>
            <p>
              {vehicle?.purchased_date
                ? formattedShortDate(vehicle.purchased_date)
                : '-'}
            </p>
          </Col>
          <Col sm={6} md={4}>
            <h6 className="font-14">Rego Until</h6>
            <p>
              {vehicle?.rego_until
                ? formattedShortDate(vehicle.rego_until)
                : '-'}
            </p>
          </Col>
          <Col sm={6} md={4}>
            <h6 className="font-14">Next Service Due</h6>
            <p>
              {vehicle?.next_service_due
                ? formattedShortDate(vehicle.next_service_due)
                : '-'}
            </p>
          </Col>
          <Col sm={6} md={4}>
            <h6 className="font-14">Status</h6>
            <IconLabelStatus
              label={
                vehicle?.status === FLEET_VEHICLE_STATUS_ACTIVE
                  ? FLEET_VEHICLE_STATUS_ACTIVE
                  : FLEET_VEHICLE_STATUS_INACTIVE
              }
              iconTextClass={
                vehicle?.status === FLEET_VEHICLE_STATUS_ACTIVE
                  ? 'text-success'
                  : 'text-light-gray'
              }
            />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default FleetVehicleInfo;
