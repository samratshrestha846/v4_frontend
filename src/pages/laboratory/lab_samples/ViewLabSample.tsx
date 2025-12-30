import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import PageTitle from '../../../components/PageTitle';
import SampleDetail from './detail/SampleDetail';
import LabTestReport from './detail/LabTestReport';
import useReadLabSample from './hooks/useReadLabSample';
import useLabTestResultByLabSampleId from './hooks/useLabTestResultByLabSampleId';
import CustomLoader from '../../../components/CustomLoader';
import ErrorMessage from '../../../components/ErrorMessage';

const ViewLabSample: React.FC = () => {
  const { id } = useParams();

  const {
    data: labSample,
    isFetching: isFetchingLabSample,
    isError: isErrorLabSample,
    navigateToAddLabTestResult,
  } = useReadLabSample();

  const {
    data: labTestResults,
    isFetching: isFetchingLabTestResults,
    isError: isErrorLabTestResults,
  } = useLabTestResultByLabSampleId(id);

  if (isFetchingLabSample || isFetchingLabTestResults) {
    return <CustomLoader />;
  }

  if (isErrorLabSample || isErrorLabTestResults) {
    return <ErrorMessage />;
  }

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: 'Lab Samples', path: '/lab-samples/list' },
          {
            label: 'Lab Sample Details',
            path: `/lab-samples/view/${id}`,
            active: true,
          },
        ]}
        title="Lab Sample Detail"
      />
      <div className="content-title">
        <Row>
          <Col md={6} className="">
            <div className="text-sm-start" />
          </Col>
          <Col md={6} className="">
            <div className="float-end">
              <Button
                variant="secondary"
                className="mt-1 btn btn-secondary noprint"
                onClick={navigateToAddLabTestResult}>
                <i className="bx bx-notepad me-1" /> Add Lab Test Result
              </Button>
            </div>
          </Col>
        </Row>
      </div>
      <Row>
        <Col md={12}>
          <SampleDetail labSample={labSample} />
        </Col>
        {labTestResults?.map((testResult) =>
          testResult.lab_test_result ? (
            <Col md={6} key={testResult.id}>
              <LabTestReport testResult={testResult.lab_test_result} />
            </Col>
          ) : null
        )}
      </Row>
    </>
  );
};

export default ViewLabSample;
