import React from 'react';
import { Card, Row, Col, Button, Form, Alert } from 'react-bootstrap';
import PageTitle from '../../../components/PageTitle';
import LabSampleForm from './forms/LabSampleForm';
import useUsersDropdownByRole from '../../../hooks/dropdown/useUserDropdownByRole';
import useCreateLabSample from './hooks/useCreateLabSample';
import useLabSampleTypesDropdown from '../../../hooks/dropdown/useLabSampleTypesDropdown';
import useUdoseSitesDropdown from '../../../hooks/dropdown/useUdoseSitesDropdown';
import CustomLoader from '../../../components/CustomLoader';

const AddLabSample = () => {
  const { data: userOptions, isFetching: isFetchingUsers } =
    useUsersDropdownByRole({
      type: 'dropdown',
      roles: 'Admin,Manager',
    });

  const {
    data: labSampleTypeOptions,
    isFetching: isFetchingLabSampleTypeOptions,
  } = useLabSampleTypesDropdown();

  const { data: siteOptions, isFetching: isFetchingSiteOptions } =
    useUdoseSitesDropdown();

  const {
    register,
    control,
    errors,
    handleSubmit,
    onSubmit,
    serverValidationError,
    setServerValidationError,
    navigateToLabSampleList,
    setFileUploaded,
  }: any = useCreateLabSample();

  if (
    isFetchingUsers ||
    isFetchingLabSampleTypeOptions ||
    isFetchingSiteOptions
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
            label: 'Add Lab Sample',
            path: '/lab-samples/add',
            active: true,
          },
        ]}
        title="Add Lab Sample"
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
              <LabSampleForm
                register={register}
                control={control}
                errors={errors}
                labSampleTypeOptions={labSampleTypeOptions}
                siteOptions={siteOptions || []}
                userOptions={userOptions || []}
                setFileUploaded={setFileUploaded}
              />
              <Row className="">
                <Col>
                  <div className="float-end button-list">
                    <Button
                      variant="outline"
                      className=" btn btn-ghost"
                      onClick={navigateToLabSampleList}>
                      <i className="bx bx-x me-1" />
                      Cancel
                    </Button>
                    <Button
                      variant="secondary"
                      className="btn btn-secondary"
                      type="submit">
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

export default AddLabSample;
