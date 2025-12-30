import React from 'react';
import { Form, Alert, Row, Col, Button, Card } from 'react-bootstrap';
import PageTitle from '../../../components/PageTitle';
import { FERTILIZER_ADD, FERTILIZER_LIST } from '../../../constants/path';
import useCreateFertilizer from './hooks/useCreateFertilizer';
import FertilizerAddForm from './forms/FertilizerAddForm';

const AddFertilizer: React.FC = () => {
  const {
    register,
    control,
    errors,
    handleSubmit,
    onSubmit,
    serverValidationError,
    setServerValidationError,
    submitted,
    navigateToFertilizerList,
  } = useCreateFertilizer();

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: 'Fertilizers', path: FERTILIZER_LIST, active: false },
          {
            label: 'Add Fertilizer',
            path: FERTILIZER_ADD,
            active: true,
          },
        ]}
        title="Add Fertilizer "
      />

      {serverValidationError && (
        <Alert
          variant="danger"
          onClose={() => setServerValidationError(false)}
          dismissible>
          <strong>Validation Failed - </strong> Please fix validation errors and
          try again
        </Alert>
      )}

      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FertilizerAddForm
              register={register}
              control={control}
              errors={errors}
            />
            <Row>
              <Col>
                <div className="float-end button-list">
                  <Button
                    className="btn btn-ghost"
                    variant="outline"
                    onClick={navigateToFertilizerList}>
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
    </>
  );
};

export default AddFertilizer;
