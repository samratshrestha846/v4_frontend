/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Fragment } from 'react';
import { Row, Table, Card, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {
  capitalizeFirstLetter,
  prepareDynamicUrl,
  formattedShortDate,
} from '../../../../helpers';
import { LAB_TEST_RESULT_EDIT } from '../../../../constants/path';
import { LabTestResult } from '../../../../types/lab/labTestResult';
import { Param, SubParam } from '../../../../types/lab/labTestParams';

type Props = {
  testResult?: LabTestResult | null;
};

const LabTestReport: React.FC<Props> = ({ testResult }) => {
  return (
    <div>
      <Card className="mbp-2">
        <Card.Header as="h5" className="text-primary-color">
          {testResult?.lab_test_param?.test_type
            ? capitalizeFirstLetter(testResult?.lab_test_param?.test_type)
            : 'Lab Test Result'}
          <div className="float-end noprint d-flex align-items-center gap-2">
            <OverlayTrigger
              overlay={<Tooltip id="edit-result">Edit Result</Tooltip>}>
              <Link
                to={prepareDynamicUrl(LAB_TEST_RESULT_EDIT, testResult?.id)}>
                <i className="bx bx-edit text-muted" />
              </Link>
            </OverlayTrigger>
          </div>
        </Card.Header>
        <Card.Body>
          <div className="table-responsive">
            <Table className=" table table-sm mb-0">
              <tbody>
                <tr key="analysed-detail">
                  <td className=" border-0">
                    <h6 className="font-14 m-0"> Analysed By </h6>
                    <p className="text-sm lh-150 mb-0">
                      {testResult?.analysed_by
                        ? `${testResult?.analysed_by?.first_name} ${testResult?.analysed_by?.last_name}`
                        : '-'}
                    </p>
                  </td>
                  <td className=" border-0">
                    <h6 className="font-14 m-0"> Analysed On </h6>
                    <p className="text-sm lh-150 mb-0">
                      {formattedShortDate(testResult?.analysed_date_time)}
                    </p>
                  </td>
                </tr>
                {/* <tr key="comments">
                  <td className=" border-0" colSpan={2}>
                    <h6 className="font-14 m-0"> Comments</h6>
                    <p className="text-sm lh-150 mb-0">
                      {testResult?.comments ? testResult?.comments : '-'}
                    </p>
                  </td>
                </tr> */}
              </tbody>
            </Table>
          </div>
          <Row>
            <div className="table-responsive">
              <Table className=" table table-sm mb-0">
                <thead className="table-light">
                  <tr>
                    <th key="parameter">Parameter</th>
                    <th key="result">Result</th>
                    <th key="unit">Unit</th>
                  </tr>
                </thead>
                <tbody>
                  {testResult?.results?.map((param: Param) =>
                    param?.sub_params && param.sub_params?.length > 0 ? (
                      <Fragment key={param.name}>
                        <tr key={param.key}>
                          <td colSpan={3} className="text-primary-color">
                            <h5>{param.name}</h5>
                          </td>
                        </tr>
                        {param?.sub_params?.map((subParam: SubParam) => (
                          <tr key={subParam.key}>
                            <td key={subParam.name}>{subParam.name}</td>
                            <td key={subParam.result}>{subParam.result} </td>
                            <td key={subParam.key}>
                              {subParam.unit !== '-' && subParam.unit}
                            </td>
                          </tr>
                        ))}
                      </Fragment>
                    ) : (
                      <tr key={param.key}>
                        <td key={param.name}>{param.name}</td>
                        <td key={param.result}>{param.result}</td>
                        <td key={param.key}>
                          {param.unit !== '-' && param.unit}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </Table>
            </div>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default LabTestReport;
