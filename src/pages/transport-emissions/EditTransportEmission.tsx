/* eslint-disable react/prop-types */
import React from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import BackendValidationMessage from '../../components/BackendValidationMessage';
import useUpdateTransportEmission from './hooks/useUpdateTransportEmission';
import TransportEmissionForm from './forms/TransportEmissionForm';
import { TransportEmission } from '../../types/transportEmission';

type Props = {
  toggleModal: () => void;
  refetch: any;
  transportEmissionDetail: TransportEmission;
};

const EditTransportEmission: React.FC<Props> = ({
  toggleModal,
  refetch,
  transportEmissionDetail,
}) => {
  const {
    register,
    control,
    errors,
    handleSubmit,
    onSubmit,
    serverValidationError,
    setServerValidationError,
    submitted,
  } = useUpdateTransportEmission({
    toggleModal,
    refetch,
    transportEmissionDetail,
  });

  return (
    <Row>
      <Col>
        {serverValidationError && (
          <BackendValidationMessage
            setServerValidationError={setServerValidationError}
          />
        )}

        <div className="p-1">
          <Form onSubmit={handleSubmit(onSubmit)}>
            <TransportEmissionForm
              control={control}
              register={register}
              errors={errors}
            />

            <div className="float-end button-list mt-2">
              <Button
                variant="outline"
                className="btn btn-ghost"
                onClick={toggleModal}>
                <i className="bx bx-x me-1" /> Cancel
              </Button>
              <Button
                variant="secondary"
                type="submit"
                className="btn btn-secondary "
                disabled={submitted}>
                <i className="bx bx-save me-1" /> Save
              </Button>
            </div>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default EditTransportEmission;
