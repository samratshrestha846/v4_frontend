/* eslint-disable react/prop-types */
import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import CancelButton from '@uhub/components/Form/CancelButton';
import SubmitButton from '@uhub/components/Form/SubmitButton';
import { FormInput } from '@uhub/components';
import CustomDatePicker from '@uhub/components/CustomDatePicker';
import BackendValidationMessage from '@uhub/components/BackendValidationMessage';
import { SupplementInventoryAdjustmentFormProps } from '../types/SupplementInventory';
import useSupplementInventoryForm from '../hooks/useSupplementInventoryForm';

type Props = {
  defaultValues: SupplementInventoryAdjustmentFormProps;
};
const SupplementInventoryForm: React.FC<Props> = ({ defaultValues }) => {
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
  } = useSupplementInventoryForm(defaultValues);
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {serverValidationError && (
        <BackendValidationMessage
          setServerValidationError={setServerValidationError}
        />
      )}
      <Row>
        <Col xl={3} lg={3} md={3}>
          <FormInput
            label="Quantity"
            type="number"
            name="adj_qty"
            register={register}
            control={control}
            errors={errors}
            containerClass="mb-2"
          />
        </Col>
        <Col xl={3} lg={3} md={3}>
          <CustomDatePicker
            label="Date"
            name="dates"
            defaultSelected={new Date()}
            maxDate={new Date()}
            control={control}
            errors={errors}
          />
        </Col>
      </Row>
      <Row>
        <Col xl={6} lg={6} md={6}>
          <FormInput
            label="Notes"
            type="textarea"
            name="notes"
            placeholder="Notes"
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

export default SupplementInventoryForm;
