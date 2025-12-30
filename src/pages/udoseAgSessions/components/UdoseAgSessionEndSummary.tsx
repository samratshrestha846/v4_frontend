import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import useFetchUdoseAgEndOfRunMessage from '../hooks/useFetchUdoseAgEndOfRunMessage';
import CustomLoader from '../../../components/CustomLoader';
import ErrorMessage from '../../../components/ErrorMessage';
import { capitalizeFirstLetter, formattedDatetime } from '../../../helpers';

type Props = {
  udoseAgId?: number;
  sessionId?: number;
};

const UdoseAgSessionEndSummary: React.FC<Props> = ({
  udoseAgId,
  sessionId,
}) => {
  const {
    data: endMessage,
    isFetching,
    isError,
  } = useFetchUdoseAgEndOfRunMessage(udoseAgId, sessionId);

  if (isFetching) return <CustomLoader />;

  if (isError) return <ErrorMessage />;

  return (
    <Card>
      <Card.Header as="h5" className="text-primary">
        Session End Summary
      </Card.Header>
      <Card.Body className="pt-1">
        <Row>
          <Col xs={6} sm={6} md={3}>
            <h5>Session Ended At</h5>
            <p className="text-sm lh-150">
              {endMessage?.message_date
                ? formattedDatetime(endMessage?.message_date)
                : '-'}
            </p>
          </Col>
          <Col xs={6} sm={6} md={3}>
            <h5>Prefertigation Water</h5>
            <p className="text-sm lh-150">
              {endMessage?.prefertigation_litres_water
                ? `${endMessage?.prefertigation_litres_water} L`
                : '-'}
            </p>
          </Col>

          <Col xs={6} sm={6} md={3}>
            <h5>Fertigation Water</h5>
            <p className="text-sm lh-150">
              {endMessage?.fertigation_litres_water
                ? `${endMessage?.fertigation_litres_water} L`
                : '-'}
            </p>
          </Col>
          <Col xs={6} sm={6} md={3}>
            <h5>Fertigation Fertilizer</h5>
            <p className="text-sm lh-150">
              {endMessage?.fertigation_litres_fertiliser
                ? `${endMessage?.fertigation_litres_fertiliser} L`
                : '-'}
            </p>
          </Col>
          <Col xs={6} sm={6} md={3}>
            <h5>Postfertigation Water</h5>
            <p className="text-sm lh-150">
              {endMessage?.post_fertigation_litres_water
                ? `${endMessage?.post_fertigation_litres_water} L`
                : '-'}
            </p>
          </Col>
          <Col xs={6} sm={6} md={3}>
            <h5>Tank Pressure</h5>
            <p className="text-sm lh-150">
              {endMessage?.final_tank_pressure
                ? `${endMessage?.final_tank_pressure} mmH2O.`
                : '-'}
            </p>
          </Col>
          <Col xs={6} sm={6} md={3}>
            <h5>Battery Voltage</h5>
            <p className="text-sm lh-150">
              {endMessage?.final_battery_voltage
                ? `${endMessage?.final_battery_voltage} V`
                : '-'}
            </p>
          </Col>
          {/* For now not showing */}
          {/* <Col xs={6} sm={6} md={3}>
            <h5>Total Battery Run</h5>
            <p className="text-sm lh-150">
              {endMessage?.total_run_battery_amp_hours
                ? `${endMessage?.total_run_battery_amp_hours} Amp. Hr.`
                : '-'}
            </p>
          </Col> */}
          <Col md={12}>
            <h5>Session Stop Reason</h5>
            <p className="text-sm lh-150">
              {endMessage?.stop_reason
                ? capitalizeFirstLetter(endMessage?.stop_reason)
                : '-'}
            </p>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default UdoseAgSessionEndSummary;
