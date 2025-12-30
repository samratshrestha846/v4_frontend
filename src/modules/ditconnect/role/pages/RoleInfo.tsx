import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { RoleResponse } from '../types/Role';

type Props = {
  role: RoleResponse;
};

const RoleInfo: React.FC<Props> = ({ role }) => {
  return (
    <Row>
      <Col sm={6} md={4}>
        <h6 className="font-14">Name </h6>
        <p>{role?.name ?? '-'}</p>
      </Col>
      <Col sm={6} md={4}>
        <h6 className="font-14">Guard Name</h6>
        <p>{role?.guard_name ?? '-'}</p>
      </Col>
    </Row>
  );
};

export default RoleInfo;
