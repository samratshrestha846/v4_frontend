/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Col, Row, Table } from 'react-bootstrap';
import { LabTestResultView } from '../../../../types/lab/labTestResult';

type Props = {
  defaultResults?: LabTestResultView[] | null;
};

const PastureSampleTestResult: React.FC<Props> = ({ defaultResults }) => {
  return (
    <Row>
      <Col>
        <div className="mt-3">
          <h5 className="text-primary">Lab Sample Results</h5>
          <div className="bg-white">
            <Table striped responsive size="sm" className="m-0">
              <thead>
                <tr>
                  <th>Sample ID</th>
                  {defaultResults?.[0]?.results?.map((item) => (
                    <th className="numeric-text" key={item.key}>
                      {`${item?.name} ${item?.unit ? `(${item.unit})` : ''}`}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {defaultResults?.map((resultItem, index) => (
                  <tr key={index}>
                    <td>{resultItem.sampleId ?? '-'}</td>
                    {resultItem?.results?.map((item) => (
                      <td className="numeric-text" key={item.key}>
                        {item?.result ?? '-'}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default PastureSampleTestResult;
