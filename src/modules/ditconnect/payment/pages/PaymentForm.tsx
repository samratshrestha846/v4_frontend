/* eslint-disable react/prop-types */
import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import CancelButton from '@uhub/components/Form/CancelButton';
import SubmitButton from '@uhub/components/Form/SubmitButton';
import BackendValidationMessage from '@uhub/components/BackendValidationMessage';
import { FormInput } from '@uhub/components';
import ReactSelect from '@uhub/components/ReactSelect';
import { PaymentFormProps } from '../types/Payment';
import usePaymentForm from '../hooks/usePaymentForm';
import { PAYMENT_METHOD_OPTIONS } from '../constants/constant';

type Props = {
  defaultValues: PaymentFormProps;
  toggleModal: () => void;
};

const PaymentForm: React.FC<Props> = ({ defaultValues, toggleModal }) => {
  const {
    register,
    control,
    errors,
    handleSubmit,
    serverValidationError,
    setServerValidationError,
    submitted,
    onSubmit,
  } = usePaymentForm(defaultValues);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {serverValidationError && (
        <BackendValidationMessage
          setServerValidationError={setServerValidationError}
        />
      )}
      <Row>
        <Col md={12}>
          <div className="mb-2">
            <ReactSelect
              label="Payment Method"
              name="paid_by"
              errors={errors}
              control={control}
              options={PAYMENT_METHOD_OPTIONS}
              placeholder="Select"
              isClearable
              defaultSelected={PAYMENT_METHOD_OPTIONS?.find(
                (item: any) => item.value === defaultValues?.paid_by
              )}
            />
          </div>
        </Col>
        <Col md={12}>
          <FormInput
            label="Purchase Order No."
            type="text"
            name="po_number"
            register={register}
            control={control}
            errors={errors}
            containerClass="mb-2"
          />
        </Col>
      </Row>

      <Row>
        <Col>
          <div className="float-end button-list mt-2">
            <CancelButton redirectOnClick={toggleModal} />
            <SubmitButton disable={submitted} />
          </div>
        </Col>
      </Row>
    </Form>
  );
};

export default PaymentForm;
