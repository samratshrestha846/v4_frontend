/* eslint-disable react/no-danger */
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { LabReport } from '../../../../types/lab/labReport';

type Props = {
  labReport?: LabReport;
};

const SummaryRecommendationsInfo: React.FC<Props> = ({ labReport }) => {
  return (
    <>
      {labReport?.summary && (
        <Row>
          <Col>
            <div className="mt-3">
              <h5 className="text-primary">Comments</h5>
              <p className="m-0">{labReport?.summary ?? '-'}</p>
            </div>
          </Col>
        </Row>
      )}
      {labReport?.recommendation && (
        <Row>
          <Col>
            <div className="mt-3">
              <h5 className="text-primary">Recommendations</h5>
              <p className="m-0">{labReport?.recommendation ?? '-'}</p>
            </div>
          </Col>
        </Row>
      )}
    </>
  );
};

export default SummaryRecommendationsInfo;
