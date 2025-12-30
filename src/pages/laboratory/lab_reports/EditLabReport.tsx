import React from 'react';
import { Card, Row, Col, Button, Form, Alert } from 'react-bootstrap';
import PageTitle from '../../../components/PageTitle';
import { LAB_REPORT_EDIT, LAB_REPORT_LIST } from '../../../constants/path';
import useUpdateLabReport from './hooks/useUpdateLabReport';
import CustomLoader from '../../../components/CustomLoader';
import ErrorMessage from '../../../components/ErrorMessage';
import LabReportEditForm from './forms/LabReportEditForm';
import usePropertiesDropdown from '../../../hooks/dropdown/usePropertiesDropdown';

const EditLabReport: React.FC = () => {
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
    labReportDetail,
    isFetchingLabReportDetail,
    isErrorLabReportDetail,
    defaultTestResults,
    selectedLabSamples,
    loading,
    isExistingProperty,
    handleRemoveLabSample,
    handleIsPropertyExistChange,
  } = useUpdateLabReport();

  const {
    data: propertiesOptions,
    isError: isErrorPropertiesOptions,
    isFetching: isFetchingPropertiesOptions,
  } = usePropertiesDropdown();

  if (isFetchingLabReportDetail || isFetchingPropertiesOptions) {
    return <CustomLoader />;
  }

  if (isErrorLabReportDetail || isErrorPropertiesOptions) {
    return <ErrorMessage />;
  }

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          {
            label: 'Lab Reports',
            path: LAB_REPORT_LIST,
          },
          {
            label: 'Edit Lab Report',
            path: LAB_REPORT_EDIT,
            active: true,
          },
        ]}
        title="Edit Lab Report"
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
              <LabReportEditForm
                register={register}
                control={control}
                errors={errors}
                showModal={showModal}
                setShowModal={setShowModal}
                handleChangeOnLabSampleSelect={handleChangeOnLabSampleSelect}
                selectedLabSamples={selectedLabSamples}
                defaultTestResults={defaultTestResults}
                labReportDetail={labReportDetail}
                loading={loading}
                propertiesOptions={propertiesOptions}
                isExistingProperty={isExistingProperty}
                handleRemoveLabSample={handleRemoveLabSample}
                handleIsPropertyExistChange={handleIsPropertyExistChange}
              />
              <Row>
                <Col>
                  <div className="float-end button-list">
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

export default EditLabReport;
