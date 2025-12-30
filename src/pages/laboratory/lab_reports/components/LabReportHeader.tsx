import React from 'react';
import { Col, Image, Row } from 'react-bootstrap';
import { DITLogo } from '../../../../assets/images';

const LabReportHeader: React.FC = () => {
  return (
    <>
      <Row>
        <Col className="d-flex flex-column justify-content-center">
          <Image src={DITLogo} width={300} />
        </Col>
        <Col>
          <div className="d-flex flex-column justify-content-end align-items-end text-primary">
            <h3>DIT Ag Tech Limited</h3>
            <p className="m-0">ABN: 64 623 091 743</p>
            <p className="m-0">PO Box 2822, Towoomba QLD 4350</p>
            <p className="m-0">Tel: 1300 123 348 | Web: ditagtech.com.cu</p>
          </div>
        </Col>
      </Row>
      <div style={{ borderBottom: '2px solid #04723b', margin: '8px 0px' }} />
    </>
  );
};

export default LabReportHeader;
