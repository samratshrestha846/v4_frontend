/* eslint-disable react/prop-types */
import React from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { FormInput } from '../../components';
import BackendValidationMessage from '../../components/BackendValidationMessage';
import useCreateWaterPressure from './hooks/useCreateWaterPressure';

type Props = {
  toggleModal: () => void;
  siteId: number;
  refetch: any;
};

const AddWaterPressure: React.FC<Props> = ({
  toggleModal,
  siteId,
  refetch,
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
  } = useCreateWaterPressure({ toggleModal, refetch });

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
            <Row>
              <Col md={12}>
                <FormInput
                  type="hidden"
                  name="site_id"
                  register={register}
                  defaultValue={siteId}
                />
                <FormInput
                  label="Water Pressure"
                  type="text"
                  name="pressure"
                  placeholder="Enter water pressure"
                  containerClass="mb-2"
                  register={register}
                  key="pressure"
                  errors={errors}
                  control={control}
                />
              </Col>
            </Row>
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

export default AddWaterPressure;
