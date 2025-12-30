import React from 'react';
import { Col, Row, Table } from 'react-bootstrap';
import UdoseRecordSettings from '../../../../types/udose/udoseSettings';

type Props = {
  udoseSetting?: UdoseRecordSettings;
  paddock?: string;
};

const SupplementInfo: React.FC<Props> = ({ udoseSetting, paddock }) => {
  return (
    <Row>
      <Col>
        <div className="mt-3">
          <h5 className="text-primary">DIT Supplements</h5>
          <div className="bg-white">
            <Table striped responsive size="sm" className="m-0">
              <thead>
                <tr>
                  <th>Paddock</th>
                  <th>Product</th>
                  <th className="numeric-text">Doser/Trigger</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{paddock}</td>
                  <td>{udoseSetting?.supplement_name ?? '-'}</td>
                  <td className="numeric-text">
                    {udoseSetting
                      ? `${udoseSetting?.target_dose} ml / ${udoseSetting?.trigger_point} L`
                      : '-'}
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default SupplementInfo;
