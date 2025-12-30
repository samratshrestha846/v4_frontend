import React from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import BackendValidationMessage from '@uhub/components/BackendValidationMessage';
import { FormInput } from '@uhub/components';
import CancelButton from '@uhub/components/Form/CancelButton';
import SubmitButton from '@uhub/components/Form/SubmitButton';
import useCustomerContactForm from './hooks/useCustomerContactForm';

const CustomerContactForm = ({ defaultValues }: any) => {
  const {
    register,
    control,
    errors,
    handleSubmit,
    serverValidationError,
    setServerValidationError,
    submitted,
    navigateToList,
    onSubmit,
  } = useCustomerContactForm(defaultValues);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {serverValidationError && (
        <BackendValidationMessage
          setServerValidationError={setServerValidationError}
        />
      )}

      <Row>
        <Col xl={6} lg={6} md={6} className="mb-3">
          <FormInput
            label="Customer"
            name="customer"
            register={register}
            errors={errors}
          />
        </Col>
        <Col xl={6} lg={6} md={6} className="mb-3">
          <FormInput
            label="Phone Number"
            name="phone_number"
            register={register}
            errors={errors}
          />
        </Col>
        <Col xl={6} lg={6} md={6} className="mb-3">
          <FormInput
            label="Address"
            name="address"
            register={register}
            errors={errors}
          />
        </Col>
        <Col xl={6} lg={6} md={6} className="mb-3">
          <FormInput
            label="Details"
            type="textarea"
            name="details"
            placeholder="Any Details"
            register={register}
            control={control}
            errors={errors}
          />
        </Col>
      </Row>

      <Row className="">
        <Col>
          <div className="float-end button-list">
            <CancelButton redirectOnClick={navigateToList} />
            <SubmitButton disable={submitted} />
          </div>
        </Col>
      </Row>
    </Form>
  );
};

export default CustomerContactForm;
