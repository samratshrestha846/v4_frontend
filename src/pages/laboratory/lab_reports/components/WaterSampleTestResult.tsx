import React from 'react';
import { Col, Row, Table } from 'react-bootstrap';
import { LabTestResultView } from '../../../../types/lab/labTestResult';

type Props = {
  defaultResults?: LabTestResultView[] | null;
  otherResults?: LabTestResultView[] | null;
};

const WaterSampleTestResult: React.FC<Props> = ({
  defaultResults,
  otherResults,
}) => {
  return (
    <>
      <Row>
        <Col>
          <div className="mt-3">
            <h5 className="text-primary">Lab Sample Results</h5>
            <div className="bg-white">
              <Table striped responsive size="sm" className="m-0">
                <thead>
                  <tr>
                    <th>Parameters</th>
                    <th className="numeric-text">Results</th>
                    <th className="numeric-text">Livestock Guidelines</th>
                  </tr>
                </thead>
                <tbody>
                  {defaultResults?.[0]?.results?.map((item) => (
                    <tr key={item.key}>
                      <td key={item.name}>
                        {`${item?.name} ${item?.unit ? `(${item.unit})` : ''}`}
                      </td>
                      <td className="numeric-text" key={item.key}>
                        {item?.result ?? '-'}
                      </td>
                      <td
                        className="numeric-text"
                        key={`${item.key} - ${item.name}`}>
                        {item.range}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="mt-3">
            <div className="bg-white">
              <Table striped responsive size="sm" className="m-0">
                <thead>
                  <tr>
                    <th>Parameters</th>
                    <th className="numeric-text">Results</th>
                  </tr>
                </thead>
                <tbody>
                  {otherResults?.[0]?.results?.map((item) => (
                    <tr key={item.key}>
                      <td
                        key={
                          item.name
                        }>{`${item?.name} ${item?.unit ? `(${item.unit})` : ''}`}</td>
                      <td className="numeric-text" key={item.key}>
                        {item?.result ?? '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default WaterSampleTestResult;
