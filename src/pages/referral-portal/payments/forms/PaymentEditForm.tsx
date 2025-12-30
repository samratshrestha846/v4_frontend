/* eslint-disable react/prop-types */
import React from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';
import { FormInput } from '../../../../components';
import ReactSelect from '../../../../components/ReactSelect';
import CustomDatePicker from '../../../../components/CustomDatePicker';
import {
  Payment,
  PaymentFormFields,
} from '../../../../types/payment/paymentList';
import { LabelNumericValue } from '../../../../types/common';

type Props = {
  control: Control<PaymentFormFields>;
  register: UseFormRegister<PaymentFormFields>;
  errors: FieldErrors<PaymentFormFields>;
  submitted: boolean;
  navigateToPaymentList: () => void;
  referrersOptions: LabelNumericValue[];
  payment?: Payment;
};

const PaymentAddForm: React.FC<Props> = ({
  control,
  register,
  errors,
  submitted,
  navigateToPaymentList,
  referrersOptions,
  payment,
}) => {
  return (
    <>
      <Row>
        <Col xl={6} lg={6} md={6} className="mb-3">
          <ReactSelect
            name="referrer_id"
            label="Referrer"
            errors={errors}
            control={control}
            options={referrersOptions}
            defaultSelected={referrersOptions.find(
              (item) => item.value === payment?.referrer_id
            )}
          />
        </Col>

        <Col md={6} className="mb-3">
          <CustomDatePicker
            label="Payment Date"
            name="payment_date"
            defaultSelected={undefined}
            maxDate={new Date()}
            control={control}
            errors={errors}
            isClearable
          />
        </Col>
      </Row>

      <Row>
        <Col xl={6} lg={6} md={6} className="mb-3">
          <FormInput
            label="Amount"
            type="text"
            name="amount"
            placeholder="Enter Amount"
            errors={errors}
            register={register}
            control={control}
          />
        </Col>
        <Col xl={6} lg={6} md={6} className="mb-3">
          <FormInput
            label="Note"
            type="text"
            name="note"
            placeholder="Enter Note"
            errors={errors}
            register={register}
            control={control}
          />
        </Col>
      </Row>
      <Row className="">
        <Col>
          <div className="float-end button-list">
            <Button
              className="btn btn-ghost"
              variant="outline"
              onClick={navigateToPaymentList}>
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
    </>
  );
};

export default PaymentAddForm;
