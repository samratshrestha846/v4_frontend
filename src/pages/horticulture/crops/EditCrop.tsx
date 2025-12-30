import React from 'react';
import { Alert, Button, Card, Col, Form, Row } from 'react-bootstrap';
import CustomLoader from '../../../components/CustomLoader';
import useUpdateCrop from './hooks/useUpdateCrop';
import ErrorMessage from '../../../components/ErrorMessage';
import PageTitle from '../../../components/PageTitle';
import { CROP_LIST } from '../../../constants/path';
import EditCropForm from './forms/EditCropForm';

const EditCrop: React.FC = () => {
  const {
    register,
    control,
    errors,
    handleSubmit,
    onSubmit,
    serverValidationError,
    setServerValidationError,
    navigateToCropList,
    submitted,
    isError,
    isFetching,
  } = useUpdateCrop();

  if (isFetching) {
    return <CustomLoader />;
  }

  if (isError) {
    return <ErrorMessage />;
  }

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          {
            label: 'Crop List',
            path: CROP_LIST,
          },
          {
            label: 'Edit Crop',
            path: '',
            active: true,
          },
        ]}
        title="Edit Crop"
      />
      <Row>
        <Col md={12} xs={12}>
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
                <EditCropForm
                  control={control}
                  errors={errors}
                  register={register}
                />

                <Row xs="auto" className="float-end">
                  <Col>
                    <div className="button-list">
                      <Button
                        variant="outline"
                        className="btn btn-ghost"
                        onClick={navigateToCropList}>
                        <i className="bx bx-x " /> Cancel
                      </Button>

                      <Button
                        variant="secondary"
                        type="submit"
                        className="btn btn-secondary"
                        disabled={submitted}>
                        <i className="bx bx-save " /> Save
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default EditCrop;
