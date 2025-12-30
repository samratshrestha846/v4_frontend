/* eslint-disable react/prop-types */
import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import CancelButton from '@uhub/components/Form/CancelButton';
import SubmitButton from '@uhub/components/Form/SubmitButton';
import BackendValidationMessage from '@uhub/components/BackendValidationMessage';
import { FormInput } from '@uhub/components';

import { InventoryLocationFormProps } from '../types/InventoryLocation';
import useInventoryLocationForm from '../hooks/useInventoryLocationForm';

type Props = {
  defaultValues: InventoryLocationFormProps;
};
const InventoryLocationForm: React.FC<Props> = ({ defaultValues }) => {
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
  } = useInventoryLocationForm(defaultValues);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {serverValidationError && (
        <BackendValidationMessage
          setServerValidationError={setServerValidationError}
        />
      )}
      <Row>
        <Col xl={6} lg={6} md={6}>
          <FormInput
            label="Name"
            type="text"
            name="name"
            register={register}
            control={control}
            errors={errors}
            containerClass="mb-2"
          />
        </Col>
        <Col xl={6} lg={6} md={6}>
          <FormInput
            label="State"
            type="text"
            name="state"
            register={register}
            control={control}
            errors={errors}
            containerClass="mb-2"
          />
        </Col>
        <Col xl={6} lg={6} md={6}>
          <FormInput
            label="Is production facility available ?"
            type="checkbox"
            name="is_production_facility"
            register={register}
            control={control}
            errors={errors}
            containerClass="mb-2"
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

export default InventoryLocationForm;
