import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import useFetchUdoseAgArmedMessages from '../hooks/useFetchUdoseAgArmedMessages';
import CustomLoader from '../../../components/CustomLoader';
import ErrorMessage from '../../../components/ErrorMessage';
import { formattedShortDate } from '../../../helpers';

type Props = {
  udoseAgId?: number;
  sessionId?: number;
};

const UdoseAgArmedSettings: React.FC<Props> = ({ udoseAgId, sessionId }) => {
  const {
    data: armedMessage,
    isFetching,
    isError,
  } = useFetchUdoseAgArmedMessages(udoseAgId, sessionId);

  if (isFetching) return <CustomLoader />;

  if (isError) return <ErrorMessage />;

  return (
    <Card className="armed-seetings-card">
      <Card.Header className="text-primary">
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="m-0">Armed Command</h5>
          <span>
            {armedMessage?.message_date
              ? formattedShortDate(armedMessage?.message_date)
              : '-'}
          </span>
        </div>
      </Card.Header>
      <Card.Body>
        <Row>
          <Col xs={6} sm={6}>
            <h6 className="font-14">Minimum Flow Rate (lpm)</h6>
            <p className="text-sm lh-150">
              {armedMessage?.minimum_flowrate ?? '-'}
            </p>
          </Col>
          <Col xs={6} sm={6}>
            <h6 className="font-14">Prefertigation Minutes</h6>
            <p className="text-sm lh-150">
              {armedMessage?.prefert_minutes ?? '-'}
            </p>
          </Col>
          <Col xs={6} sm={6}>
            <h6 className="font-14">Prefertigation Volume</h6>
            <p className="text-sm lh-150">
              {armedMessage?.prefert_volume
                ? `${armedMessage?.prefert_volume} L`
                : '-'}
            </p>
          </Col>
          <Col xs={6} sm={6}>
            <h6 className="font-14">Fertigation Minutes</h6>
            <p className="text-sm lh-150">
              {armedMessage?.fertigation_duration_minutes ?? '-'}
            </p>
          </Col>
          <Col xs={6} sm={6}>
            <h6 className="font-14">Fertigation Volume</h6>
            <p className="text-sm lh-150">
              {armedMessage?.fertigation_volume_litres
                ? `${armedMessage?.fertigation_volume_litres} L`
                : '-'}
            </p>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default UdoseAgArmedSettings;
