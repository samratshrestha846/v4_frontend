import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import CustomLoader from '../../../components/CustomLoader';
import ErrorMessage from '../../../components/ErrorMessage';
import { formattedDatetime } from '../../../helpers';
import { UdoseAgSessionStartMessage } from '../../../types/udoseAgs/udoseAgs';

type Props = {
  startMessage?: UdoseAgSessionStartMessage;
  isFetchingStartMessage?: boolean;
  isErrorStartMessage?: boolean;
};

const UdoseAgSessionStartInfo: React.FC<Props> = ({
  startMessage,
  isFetchingStartMessage,
  isErrorStartMessage,
}) => {
  if (isFetchingStartMessage) return <CustomLoader />;

  if (isErrorStartMessage) return <ErrorMessage />;

  return (
    <Card>
      <Card.Header as="h5" className="text-primary">
        Session Start Info
      </Card.Header>
      <Card.Body className="pt-1">
        <Row>
          <Col xs={6} sm={6}>
            <h5>Session Started At</h5>
            <p className="text-sm lh-150">
              {startMessage?.message_date
                ? formattedDatetime(startMessage?.message_date)
                : '-'}
            </p>
          </Col>
          <Col xs={6} sm={6}>
            <h5>Tank Pressure</h5>
            <p className="text-sm lh-150">
              {startMessage?.current_tank_pressure
                ? `${startMessage?.current_tank_pressure} mmH2O`
                : '-'}
            </p>
          </Col>
          <Col xs={6} sm={6}>
            <h5>Battery Voltage</h5>
            <p className="text-sm lh-150">
              {startMessage?.current_battery_voltage
                ? `${startMessage?.current_battery_voltage} V`
                : '-'}
            </p>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default UdoseAgSessionStartInfo;
