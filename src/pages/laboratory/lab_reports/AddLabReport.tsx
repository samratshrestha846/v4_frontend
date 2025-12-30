import React from 'react';
import { Card, Row, Col, Button, Form, Alert } from 'react-bootstrap';
import PageTitle from '../../../components/PageTitle';
import useCreateLabReport from './hooks/useCreateLabReport';
import LabReportForm from './forms/LabReportForm';
import { LAB_REPORT_ADD, LAB_REPORT_LIST } from '../../../constants/path';
import CustomLoader from '../../../components/CustomLoader';
import ErrorMessage from '../../../components/ErrorMessage';
import usePropertiesDropdown from '../../../hooks/dropdown/usePropertiesDropdown';

const AddLabReport: React.FC = () => {
  const {
    register,
    control,
    errors,
    handleSubmit,
    onSubmit,
    serverValidationError,
    setServerValidationError,
    navigateToLabReportList,
    showModal,
    setShowModal,
    handleChangeOnLabSampleSelect,
    submitted,
    defaultTestResults,
    selectedLabSamples,
    loading,
    isExistingProperty,
    handleRemoveLabSample,
    setIsExistingProperty,
  } = useCreateLabReport();

  const {
    data: propertiesOptions,
    isError: isErrorPropertiesOptions,
    isFetching: isFetchingPropertiesOptions,
  } = usePropertiesDropdown();

  if (isFetchingPropertiesOptions) return <CustomLoader />;

  if (isErrorPropertiesOptions) return <ErrorMessage />;

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          {
            label: 'Lab Reports',
            path: LAB_REPORT_LIST,
          },
          {
            label: 'Add Lab Report',
            path: LAB_REPORT_ADD,
            active: true,
          },
        ]}
        title="Add Lab Report"
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
        <Card>
          <Card.Body>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <LabReportForm
                register={register}
                control={control}
                errors={errors}
                showModal={showModal}
                setShowModal={setShowModal}
                handleChangeOnLabSampleSelect={handleChangeOnLabSampleSelect}
                selectedLabSamples={selectedLabSamples}
                defaultTestResults={defaultTestResults}
                loading={loading}
                propertiesOptions={propertiesOptions}
                isExistingProperty={isExistingProperty}
                handleRemoveLabSample={handleRemoveLabSample}
                setIsExistingProperty={setIsExistingProperty}
              />
              <Row>
                <Col>
                  <div className="mt-3 float-end button-list">
                    <Button
                      variant="outline"
                      className=" btn btn-ghost"
                      onClick={navigateToLabReportList}>
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
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default AddLabReport;
