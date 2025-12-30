import React from 'react';
import { Card, Row, Col, Button, Form, Alert } from 'react-bootstrap';
import PageTitle from '../../components/PageTitle';
import { PADDOCK_EDIT, PADDOCK_LIST } from '../../constants/path';
import usePropertiesDropdown from '../../hooks/dropdown/usePropertiesDropdown';
import CustomLoader from '../../components/CustomLoader';
import ErrorMessage from '../../components/ErrorMessage';
import useUpdatePaddock from './hooks/useUpdatePaddock';
import PaddockEditForm from './form/PaddockEditForm';

const EditPaddock: React.FC = () => {
  const {
    register,
    control,
    errors,
    handleSubmit,
    onSubmit,
    serverValidationError,
    setServerValidationError,
    submitted,
    navigateToPaddockList,
    paddockDetail,
    isErrorPaddockDetail,
    isFetchingPaddockDetail,
  } = useUpdatePaddock();

  const {
    data: propertiesOptions,
    isError,
    isFetching,
  } = usePropertiesDropdown();

  if (isError || isErrorPaddockDetail) {
    return <ErrorMessage />;
  }

  if (isFetching || isFetchingPaddockDetail) {
    return <CustomLoader />;
  }

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          {
            label: 'Paddocks',
            path: PADDOCK_LIST,
          },
          {
            label: 'Edit Paddock',
            path: PADDOCK_EDIT,
            active: true,
          },
        ]}
        title="Edit Paddock"
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
              <PaddockEditForm
                errors={errors}
                register={register}
                control={control}
                propertiesOptions={propertiesOptions}
                paddockDetail={paddockDetail}
              />

              <Row>
                <Col>
                  <div className="float-end button-list">
                    <Button
                      variant="outline"
                      className=" btn btn-ghost"
                      onClick={navigateToPaddockList}>
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

export default EditPaddock;
