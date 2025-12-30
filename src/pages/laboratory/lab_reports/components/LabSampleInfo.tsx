import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { LabSample } from '../../../../types/lab/labSampleList';

type Props = {
  labSample?: LabSample;
};

const LabSampleInfo: React.FC<Props> = ({ labSample }) => {
  return (
    <Row>
      <Col>
        <h5 className="text-primary text-center text-decoration-underline text-uppercase">
          Lab Report
        </h5>
        <p className="mb-0">
          Sample Name:&nbsp;
          <span className="fw-bold">
            {labSample?.lab_sample_type?.name ?? '-'}
          </span>
        </p>
        <p className="mb-0">
          Paddock:&nbsp;
          <span className="fw-bold"> {labSample?.paddock ?? '-'}</span>
        </p>
      </Col>
    </Row>
  );
};

export default LabSampleInfo;
