import React from 'react';
import { Row, Col } from 'react-bootstrap';
import logo from '../assets/images/logo.png';

const LetterHead: React.FC = () => {
  return (
    <Row className="bg-light mb-3 align-items-center">
      <Col xs={12} md={4} className="text-center">
        <img
          src={logo}
          height="70"
          className="d-inline-block align-top"
          alt="DIT AgTech Logo"
        />
      </Col>
      <Col xs={12} md={8} className="text-md-end text-center mt-2 mt-md-0">
        <div>
          <h4 className="mb-1">DIT AgTech Limited</h4>
          <p className="mb-0">ABN: 64 623 091 743</p>
          <p className="mb-0">PO Box 2822, Toowoomba QLD 4350</p>
          <p className="mb-0">
            T:&nbsp;1300 123 348 | W:&nbsp;
            <a href="http://ditagtech.com.au">ditagtech.com.au</a>
          </p>
        </div>
      </Col>
    </Row>
  );
};

export default LetterHead;
