import React from 'react';
import { Form, Row, Col, Alert, Button } from 'react-bootstrap';
import TransportEmissionForm from './forms/TransportEmissionForm';
import useCreateTransportEmission from './hooks/useCreateTransportEmission';

type Props = {
  toggleModal: () => void;
  refetch: any;
};

const AddTransportEmission: React.FC<Props> = ({ toggleModal, refetch }) => {
  const {
    register,
    control,
    errors,
    handleSubmit,
    onSubmit,
    serverValidationError,
    setServerValidationError,
    submitted,
  } = useCreateTransportEmission({ toggleModal, refetch });

  return (
    <Row className="justify-content-md-center">
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
        <Form onSubmit={handleSubmit(onSubmit)}>
          <TransportEmissionForm
            control={control}
            register={register}
            errors={errors}
          />
          <Row>
            <Col>
              <div className="float-end button-list mt-2">
                <Button
                  variant="outline"
                  className="btn btn-ghost"
                  onClick={toggleModal}>
                  <i className="bx bx-x me-1" /> Cancel
                </Button>
                <Button
                  variant="secondary"
                  className="btn btn-secondary"
                  type="submit"
                  disabled={submitted}>
                  <i className="bx bx-save me-1" /> Save
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};

export default AddTransportEmission;
