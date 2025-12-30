/* eslint-disable react/prop-types */
import React from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';
import { FormInput } from '../../../../components';
import ReactSelect from '../../../../components/ReactSelect';
import { Sale, SaleFormFields } from '../../../../types/sale/saleList';
import { LabelNumericValue } from '../../../../types/common';
import CustomDatePicker from '../../../../components/CustomDatePicker';

type Props = {
  control: Control<SaleFormFields>;
  register: UseFormRegister<SaleFormFields>;
  errors: FieldErrors<SaleFormFields>;
  submitted: boolean;
  navigateToSaleList: () => void;
  customersOptions: LabelNumericValue[];
  sale?: Sale;
};

const SaleEditForm: React.FC<Props> = ({
  control,
  register,
  errors,
  submitted,
  navigateToSaleList,
  customersOptions,
  sale,
}) => {
  return (
    <>
      <Row>
        <Col xl={6} lg={6} md={6} className="mb-3">
          <ReactSelect
            name="customer_id"
            label="Customer"
            errors={errors}
            control={control}
            options={customersOptions}
            defaultSelected={customersOptions?.find(
              (item) => item.value === sale?.customer_id
            )}
          />
        </Col>

        <Col xl={6} lg={6} md={6} className="mb-3">
          <FormInput
            label="Product Detail"
            type="text"
            name="product_detail"
            placeholder="Enter Product Detail"
            errors={errors}
            register={register}
            control={control}
          />
        </Col>
      </Row>

      <Row>
        <Col xl={6} lg={6} md={6} className="mb-3">
          <FormInput
            label="Total Bill Amount"
            type="text"
            name="total_billed_amount"
            placeholder="Enter Bill Amount"
            errors={errors}
            register={register}
            control={control}
          />
        </Col>
        <Col xl={6} lg={6} md={6} className="mb-3">
          <FormInput
            label="Total Received Amount"
            type="text"
            name="total_received_amount"
            placeholder="Enter Received Amount"
            errors={errors}
            register={register}
            control={control}
          />
        </Col>
      </Row>

      <Row>
        <Col xl={6} lg={6} md={6} className="mb-3">
          <CustomDatePicker
            label="Purchase Date"
            name="purchase_date"
            defaultSelected={undefined}
            maxDate={new Date()}
            control={control}
            errors={errors}
          />
        </Col>

        <Col xl={6} lg={6} md={6} className="mb-3">
          <CustomDatePicker
            label="Bill Cleared Date"
            name="bill_cleared_date"
            defaultSelected={undefined}
            maxDate={new Date()}
            control={control}
            errors={errors}
          />
        </Col>
      </Row>
      <Row>
        <Col xl={6} lg={6} md={6} className="mb-3">
          <FormInput
            label="External Invoice No."
            type="text"
            name="external_invoice_number"
            placeholder="Enter External Invoice No."
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
              onClick={navigateToSaleList}>
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

export default SaleEditForm;
