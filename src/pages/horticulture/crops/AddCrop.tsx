import React from 'react';
import { Alert, Button, Card, Col, Form, Row } from 'react-bootstrap';
import { CROP_ADD, CROP_LIST } from '../../../constants/path';
import useCreateCrop from './hooks/useCreateCrop';
import PageTitle from '../../../components/PageTitle';
import AddCropForm from './forms/AddCropForm';

const AddCrop: React.FC = () => {
  const {
    register,
    control,
    errors,
    onSubmit,
    handleSubmit,
    serverValidationError,
    setServerValidationError,
    navigateToCropList,
    submitted,
  } = useCreateCrop();

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          {
            label: 'Crop List',
            path: CROP_LIST,
          },
          {
            label: 'Add Crop',
            path: CROP_ADD,
            active: true,
          },
        ]}
        title="Add Crop"
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
                <AddCropForm
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

export default AddCrop;
