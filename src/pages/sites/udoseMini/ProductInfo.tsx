/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import Udose from '../../../assets/images/udose/udose.png';

const ProductInfo = () => {
  return (
    <div className="p-2">
      <Row>
        <Col md={12}>
          <h1 className="fw-bold text-secondary-color"> uDose Mini</h1>
          <p className="text-secondary-color">
            Efficient supplementing via remote telemetry
          </p>
        </Col>
      </Row>

      <Row>
        <Col md={8}>
          <h3>Why uDose Mini?</h3>
          <p>
            The uDOSE Mini is designed exclusively for use with the DIT AgTech
            supplement range. Put an end to expensive lick runs and ensure that
            all your herd are receiving the correct dose of supplements while
            enjoying the peace of mind that our safety features offer. Check on
            the efficiency and control the uDOSE from the palm of your hand with
            the uHUB app.
          </p>
          <h3 className="text-secondary-color">Key features </h3>
          <ul>
            <li>
              Designed for exclusive use with the DIT AgTech Supplement range
            </li>
            <li>
              The only dosing unit designed specifically to be compatible with
              urea feeding
            </li>
            <li>Enhanced safety features for peace of mind</li>
            <li>
              Ensure the whole herd receive the correct supplement dose
              proportional to their body weight
            </li>
            <li>
              Cost effective - reduced wear and tear on equipment,save on labour
              costs
            </li>
            <li>Flexible rental and install options</li>
            <li>Touch screen for ease of use</li>
            <li>Remote telemetry for monitoring dose rates</li>
            <li>Treat up to 10,000 head per day per unit</li>
            <li>Multiple fail safe mechanisms proven to provide safety</li>
            <li>Solar powered</li>
            <li>Remote telemetry with uHUB Platform connectivity</li>
            <li>Tech support available</li>
          </ul>
        </Col>
        <Col md={4}>
          <img
            src={Udose}
            className="img-fluid"
            alt=""
            style={{ maxWidth: '350px' }}
          />
        </Col>
      </Row>

      <Row>
        <Col>
          <p className="text-secondary-color fw-bold font-20 text-center">
            If you are interested please contact us.
          </p>
          <div className="d-flex justify-content-center align-items-center">
            <Link
              className="btn btn-sm btn-success"
              to="https://ditagtech.com.au/contact/"
              target="_blank"
              rel="noreferrer"
              style={{ display: 'inline-block' }}>
              Contact Us
            </Link>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ProductInfo;
