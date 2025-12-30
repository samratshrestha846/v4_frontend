import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { formattedDatetime } from '@uhub/helpers';
import { SupplementInventoryViewResponse } from '../types/SupplementInventory';

type Props = {
  supplementInventory: SupplementInventoryViewResponse;
};

const SupplementInventoryInfo: React.FC<Props> = ({ supplementInventory }) => {
  return (
    <Row>
      <Col sm={6} md={3}>
        <h6 className="font-14">Name </h6>
        <p>{supplementInventory?.supplement_name ?? '-'}</p>
      </Col>
      <Col sm={6} md={3}>
        <h6 className="font-14">Current Quantity</h6>
        <p>{supplementInventory?.current_qty}</p>
      </Col>
      <Col sm={6} md={3}>
        <h6 className="font-14">Location</h6>
        <p>{supplementInventory?.location_name ?? '-'}</p>
      </Col>
      <Col sm={6} md={3}>
        <h6 className="font-14">Batch Number</h6>
        <p>
          {supplementInventory?.supplement_manufacture?.batch_number ?? '-'}
        </p>
      </Col>
      <Col sm={6} md={3}>
        <h6 className="font-14">Created At</h6>
        <p>
          {supplementInventory?.created_at
            ? formattedDatetime(supplementInventory?.created_at)
            : '-'}
        </p>
      </Col>
    </Row>
  );
};

export default SupplementInventoryInfo;
