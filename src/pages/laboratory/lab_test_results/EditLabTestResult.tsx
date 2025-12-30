import React from 'react';
import { Form, Alert, Row, Col } from 'react-bootstrap';
import PageTitle from '../../../components/PageTitle';
import useUsersDropdownByRole from '../../../hooks/dropdown/useUserDropdownByRole';
import CustomLoader from '../../../components/CustomLoader';
import SampleDetail from '../lab_samples/detail/SampleDetail';
import EditLabTestResultForm from './forms/EditLabTestResultForm';
import useUpdateLabTestResult from './hooks/useUpdateLabTestResult';
import ErrorMessage from '../../../components/ErrorMessage';

const EditLabTestResult = () => {
  const {
    data: userOptions,
    isFetching: isFetchingUserOptions,
    isError: isErrorUSerOptions,
  } = useUsersDropdownByRole({
    type: 'dropdown',
    roles: 'Admin,Manager',
  });

  const {
    register,
    control,
    errors,
    handleSubmit,
    onSubmit,
    serverValidationError,
    setServerValidationError,
    submitted,
    navigateToLabSampleView,
    labTestResult,
    isFetchingLabTestResult,
    isErrorLabTestResult,
  } = useUpdateLabTestResult();

  if (isFetchingUserOptions || isFetchingLabTestResult) {
    return <CustomLoader />;
  }

  if (isErrorUSerOptions || isErrorLabTestResult) {
    return <ErrorMessage />;
  }

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: 'Lab Samples', path: '/lab-samples/list', active: false },
          {
            label: 'Edit Lab Test Result',
            path: '/lab-test-results/edit/:id',
            active: true,
          },
        ]}
        title="Edit Lab Test Result"
      />

      <Row>
        <Col md={12}>
          <div className=" mt-4 mt-lg-0 ">
            <SampleDetail labSample={labTestResult?.lab_sample} />
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
            <EditLabTestResultForm
              register={register}
              control={control}
              errors={errors}
              userOptions={userOptions}
              labTestResult={labTestResult}
              navigateToLabSampleView={navigateToLabSampleView}
              submitted={submitted}
            />
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default EditLabTestResult;
