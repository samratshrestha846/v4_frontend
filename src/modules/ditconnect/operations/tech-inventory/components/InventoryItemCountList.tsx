import React from 'react';

import { Row, Col, Table } from 'react-bootstrap';
import { TechInventoryResponse } from '../types/TechInventory';

type Props = {
  selectedRecord: TechInventoryResponse | null;
};

const InventoryItemCountList: React.FC<Props> = ({ selectedRecord }) => {
  return (
    <Row>
      <Col xl={12} lg={12} md={12} className="mb-1">
        {selectedRecord && selectedRecord.inventory_item_counts.length > 0 && (
          <Table striped bordered hover responsive className="mb-0">
            <thead>
              <tr>
                <th className="text-left">Location</th>
                <th className="text-left">Qty</th>
              </tr>
            </thead>
            <tbody>
              {selectedRecord.inventory_item_counts.map(
                (location: any, idx: number) => (
                  <tr key={idx}>
                    <td>{`${location.related_location?.name}, ${location.related_location?.state}`}</td>
                    <td>{location.qty}</td>
                  </tr>
                )
              )}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default InventoryItemCountList;
