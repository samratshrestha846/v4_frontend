import React from 'react';
import { Form, Alert, Row, Col } from 'react-bootstrap';
import PageTitle from '../../../components/PageTitle';
import useCreateLabTestResult from './hooks/useCreateLabTestResult';
import CustomLoader from '../../../components/CustomLoader';
import LabTestResultForm from './forms/LabTestResultForm';
import SampleDetail from '../lab_samples/detail/SampleDetail';
import ErrorMessage from '../../../components/ErrorMessage';

const AddLabTestResult: React.FC = () => {
  const {
    register,
    control,
    errors,
    handleSubmit,
    serverValidationError,
    setServerValidationError,
    submitted,
    onSubmit,
    navigateToLabSamplesList,
    labSample,
    isFetchingLabSample,
    isErrorLabSample,
    userOptions,
    isFetchingUserOptions,
    isErrorUserOptions,
  } = useCreateLabTestResult();

  if (isFetchingLabSample || isFetchingUserOptions) {
    return <CustomLoader />;
  }

  if (isErrorLabSample || isErrorUserOptions) {
    return <ErrorMessage />;
  }

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: 'Lab Samples', path: '/lab-samples/list', active: false },
          {
            label: 'Add Lab Test Result',
            path: '/lab-test-results/add',
            active: true,
          },
        ]}
        title="Add Lab Test Result"
      />

      <Row>
        <Col md={12}>
          <div className=" mt-4 mt-lg-0 ">
            <SampleDetail labSample={labSample} />
          </div>
        </Col>
        <Col md={12}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            {serverValidationError && (
              <Alert
                variant="danger"
                onClose={() => setServerValidationError(false)}
                dismissible>
                <strong>Validation Failed - </strong> Please fix validation
                errors and try again
              </Alert>
            )}
            <LabTestResultForm
              register={register}
              control={control}
              errors={errors}
              userOptions={userOptions}
              testParams={labSample?.default_test_parameters}
              navigateToLabSamplesList={navigateToLabSamplesList}
              submitted={submitted}
            />
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default AddLabTestResult;
