import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { StorageTankResponse } from '../../types/StorageTank';

type Props = {
  storageTank: StorageTankResponse;
};

const StorageTankInfo: React.FC<Props> = ({ storageTank }) => {
  return (
    <Row>
      <Col sm={6} md={4}>
        <h6 className="font-14">Name </h6>
        <p>{storageTank?.name ?? '-'}</p>
      </Col>
      <Col sm={6} md={4}>
        <h6 className="font-14">Location</h6>
        <p>{storageTank?.location?.name ?? '-'}</p>
      </Col>
      <Col sm={6} md={4}>
        <h6 className="font-14">Capacity</h6>
        <p>{storageTank?.capacity ? `${storageTank.capacity} L` : '-'}</p>
      </Col>
      <Col sm={6} md={4}>
        <h6 className="font-14">Quantity</h6>
        <p>{storageTank?.current_qty ?? '-'}</p>
      </Col>
    </Row>
  );
};

export default StorageTankInfo;
