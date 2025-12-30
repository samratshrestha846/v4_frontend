import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { Paddock } from '../../../types/horticulture/paddock';

type Props = {
  paddock?: Paddock;
  numberOfBlocks?: number;
};

const PaddockInfo: React.FC<Props> = ({ paddock, numberOfBlocks }) => {
  return (
    <Card>
      <Card.Body>
        <Row>
          <Col sm={6} md={3}>
            <h6 className="font-14">Paddock</h6>
            <p className="text-sm lh-150">{paddock?.name ?? '-'}</p>
          </Col>

          <Col sm={6} md={3}>
            <h6 className="font-14">Area in Hectares</h6>
            <p className="text-sm lh-150">{paddock?.area_in_hectare ?? '-'}</p>
          </Col>

          <Col sm={6} md={3}>
            <h6 className="font-14">No. of Blocks</h6>
            <p className="text-sm lh-150">{numberOfBlocks ?? 0}</p>
          </Col>

          <Col sm={6} md={3}>
            <h6 className="font-14">Customer</h6>
            <p className="text-sm lh-150">
              {paddock?.customer?.business_name ?? '-'}
            </p>
          </Col>
          <Col sm={6} md={3}>
            <h6 className="font-14">Property</h6>
            <p className="text-sm lh-150">
              {paddock?.customer_property?.name ?? '-'}
            </p>
          </Col>
          <Col sm={6} md={3}>
            <h6 className="font-14">Region</h6>
            <p className="text-sm lh-150">
              {paddock?.region
                ? `${paddock?.region?.name}, ${paddock?.region?.state}`
                : '-'}
            </p>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default PaddockInfo;
