import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { formattedDatetime } from '../../../helpers';
import { UdoseAgSessionSummary } from '../../../types/udoseAgs/udoseAgs';

type Props = {
  sessionSummary?: UdoseAgSessionSummary;
};

const CoverageAreaAndFertilizerInfo: React.FC<Props> = ({ sessionSummary }) => {
  return (
    <Card>
      <Card.Header as="h5" className="text-primary">
        Coverage Area
      </Card.Header>
      <Card.Body className="pt-1">
        <Row>
          <Col xs={6} sm={6} md={6}>
            <h5>Property</h5>
            <p className="text-sm lh-150">
              {sessionSummary?.customer_property?.name ?? '-'}
            </p>
          </Col>
          <Col xs={6} sm={6} md={6}>
            <h5>Paddock</h5>
            <p className="text-sm lh-150">
              {sessionSummary?.paddock?.name ?? '-'}
            </p>
          </Col>
          <Col xs={6} sm={6} md={6}>
            <h5>Block</h5>
            <p className="text-sm lh-150">
              {sessionSummary?.block?.name ?? '-'}
            </p>
          </Col>
          <Col xs={6} sm={6} md={6}>
            <h5>Sub Block</h5>
            <p className="text-sm lh-150">
              {sessionSummary?.sub_block?.name ?? '-'}
            </p>
          </Col>
          <Col xs={6} sm={6} md={6}>
            <h5>Crop</h5>
            <p className="text-sm lh-150">
              {sessionSummary?.sub_block?.cropable?.crop?.name ||
                sessionSummary?.block?.cropable?.crop?.name ||
                '-'}
            </p>
          </Col>
          <Col xs={6} sm={6} md={6}>
            <h5>Crop Stage</h5>
            <p className="text-sm lh-150">
              {sessionSummary?.sub_block?.crop_life_cycle_stage
                ?.crop_stage_name ||
                sessionSummary?.block?.crop_life_cycle_stage?.crop_stage_name ||
                '-'}
            </p>
          </Col>
          <Col xs={6} sm={6} md={6}>
            <h5>Started On</h5>
            <p className="text-sm lh-150">
              {sessionSummary?.started_at
                ? formattedDatetime(sessionSummary?.started_at)
                : '-'}
            </p>
          </Col>

          <Col xs={6} sm={6} md={6}>
            <h5>Ended On</h5>
            <p className="text-sm lh-150">
              {sessionSummary?.ended_at
                ? formattedDatetime(sessionSummary?.ended_at)
                : '-'}
            </p>
          </Col>

          <Col xs={6} sm={6} md={6}>
            <h5>No. of Plants</h5>
            <p className="text-sm lh-150">
              {sessionSummary?.sub_block?.cropable?.number_of_plants ||
                sessionSummary?.block?.cropable?.number_of_plants ||
                '-'}
            </p>
          </Col>
          <Col xs={6} sm={6} md={6}>
            <h5>Fertilizer</h5>
            <p className="text-sm lh-150">
              {sessionSummary?.fertilizer?.name ?? '-'}
            </p>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default CoverageAreaAndFertilizerInfo;
