import React from 'react';
import { Row, Col, Button, Form, Alert } from 'react-bootstrap';

import PageTitle from '../../../components/PageTitle';
import EditLabSampleForm from './forms/EditLabSampleForm';
import useUpdateLabSample from './hooks/useUpdateLabSample';
import CustomLoader from '../../../components/CustomLoader';
import useUsersDropdownByRole from '../../../hooks/dropdown/useUserDropdownByRole';
import EditDefaultTestParamsForm from './forms/EditDefaultTestParamsForm';
import ErrorMessage from '../../../components/ErrorMessage';
import usePropertiesDropdown from '../../../hooks/dropdown/usePropertiesDropdown';
import useHandleCheckUncheckTestParameters from './hooks/useHandleCheckUncheckTestParameters';

const EditLabSample: React.FC = () => {
  const {
    data: userOptions,
    isFetching: isFetchingUsers,
    isError: isErrorUsers,
  } = useUsersDropdownByRole({
    type: 'dropdown',
    roles: 'Admin,Manager',
  });

  const {
    data: propertiesOptions,
    isFetching: isFetchingPropertiesOptions,
    isError: isErrorPropertiesOptions,
  } = usePropertiesDropdown();

  const {
    register,
    control,
    errors,
    handleSubmit,
    onSubmit,
    submitted,
    serverValidationError,
    setServerValidationError,
    navigateToLabSampleList,
    setFileUploaded,
    sampleData,
    isFetchingSampleData,
    isErrorSampleData,
    isFetchingTestParams,
    isErrorTestParams,
    labTestTypeOptions,
    isFetchingTestTypesOptions,
    isErrorTestTypesOptions,
    testType,
    labSampleType,
    testParameters,
    propagateOnLabSampleTypeChange,
    propagateOnTestTypeChange,
    siteOptions,
    isFetchingSiteOptions,
    isErrorSiteOptions,
    propagateOnCustomerPeropertyChange,
    customerPropertyId,
    setValue,
    labSampleTypeOptions,
    isFetchingLabSampleTypeOptions,
    isErrorLabSampleTypeOptions,
    selectedTestParam,
    setSelectedTestParam,
  } = useUpdateLabSample();

  const { handleSelectAll, propagateOnChange } =
    useHandleCheckUncheckTestParameters({
      testParameters,
      setValue,
      sampleData,
      testType,
      labSampleType,
      selectedTestParam,
      setSelectedTestParam,
    });

  if (
    isErrorSampleData ||
    isErrorUsers ||
    isErrorLabSampleTypeOptions ||
    isErrorSiteOptions ||
    isErrorTestParams ||
    isErrorTestTypesOptions ||
    isErrorPropertiesOptions
  ) {
    return <ErrorMessage />;
  }

  if (
    isFetchingSampleData ||
    isFetchingUsers ||
    isFetchingLabSampleTypeOptions ||
    isFetchingSiteOptions ||
    isFetchingTestParams ||
    isFetchingTestTypesOptions ||
    isFetchingPropertiesOptions
  ) {
    return <CustomLoader />;
  }

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          {
            label: 'Lab Samples',
            path: '/lab-samples/list',
          },
          {
            label: 'Edit Lab Sample',
            path: `/lab-samples/edit/${sampleData?.id}`,
            active: true,
          },
        ]}
        title="Edit Lab Sample"
      />
      <div>
        {serverValidationError && (
          <Alert
            variant="danger"
            onClose={() => setServerValidationError(false)}
            dismissible>
            <strong>Validation Failed - </strong> Please fix validation errors
            and try again
          </Alert>
        )}

        <Form onSubmit={handleSubmit(onSubmit)}>
          <EditLabSampleForm
            register={register}
            control={control}
            errors={errors}
            labSample={sampleData}
            userOptions={userOptions}
            labSampleTypeOptions={labSampleTypeOptions}
            labTestTypeOptions={labTestTypeOptions}
            siteOptions={siteOptions}
            setFileUploaded={setFileUploaded}
            propagateOnLabSampleTypeChange={propagateOnLabSampleTypeChange}
            propagateOnTestTypeChange={propagateOnTestTypeChange}
            propagateOnCustomerPeropertyChange={
              propagateOnCustomerPeropertyChange
            }
            labSampleType={labSampleType}
            testType={testType}
            propertiesOptions={propertiesOptions}
            customerPropertyId={customerPropertyId}
          />
          {selectedTestParam &&
            testParameters &&
            testParameters.params.length > 0 && (
              <EditDefaultTestParamsForm
                register={register}
                control={control}
                errors={errors}
                testParam={testParameters}
                handleSelectAll={handleSelectAll}
                selectedTestParam={selectedTestParam}
                propagateOnChange={propagateOnChange}
              />
            )}
          <Row>
            <Col>
              <div className="float-end button-list mb-2">
                <Button
                  variant="outline"
                  className="btn btn-ghost"
                  onClick={navigateToLabSampleList}>
                  <i className="bx bx-x me-1" />
                  Cancel
                </Button>
                <Button
                  variant="secondary"
                  className="btn btn-secondary"
                  type="submit"
                  disabled={submitted}>
                  <i className="bx bx-save me-1" />
                  Save
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
};

export default EditLabSample;
