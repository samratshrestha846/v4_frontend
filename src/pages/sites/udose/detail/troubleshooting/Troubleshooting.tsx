import React from 'react';
import { Col, Row } from 'react-bootstrap';
import ListSiteFollowup from './siteFollowups/ListSiteFollowup';
import ListServiceLogs from './siteServiceLogs/ListServiceLogs';

const Troubleshooting: React.FC = () => {
  return (
    <Row>
      <Col md={12}>
        <ListSiteFollowup />
      </Col>
      <hr />
      <Col md={12}>
        <ListServiceLogs />
      </Col>
    </Row>
  );
};

export default Troubleshooting;
