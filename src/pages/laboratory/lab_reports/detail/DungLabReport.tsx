import React from 'react';
import { Row, Col } from 'react-bootstrap';

import LabReportHeader from '../components/LabReportHeader';

const DungLabReport: React.FC = () => {
  return (
    <Row>
      <Col>
        <div style={{ backgroundColor: '#E3E8EF' }} className="p-3 gap-3">
          <LabReportHeader />
        </div>
      </Col>
    </Row>
  );
};

export default DungLabReport;
