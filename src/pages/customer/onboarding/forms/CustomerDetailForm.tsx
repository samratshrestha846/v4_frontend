/* eslint-disable react/prop-types */
import React from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';
import { FormInput } from '../../../../components';
import PRODUCT_OPTIONS from '../../../../constants/productOptions';
import ReactSelect from '../../../../components/ReactSelect';
import { LabelNumericValue } from '../../../../types/common';
import {
  CustomerInputFields,
  InputFields,
} from '../../../../types/customer/customerOnboarding';

type Props = {
  control: Control<InputFields>;
  errors: FieldErrors<InputFields>;
  register: UseFormRegister<InputFields>;
  referrerOptions: LabelNumericValue[];
  customerDetails?: CustomerInputFields;
};

const CustomerDetailForm: React.FC<Props> = ({
  control,
  errors,
  register,
  referrerOptions,
  customerDetails,
}) => {
  return (
    <Row>
      <Col md={6}>
        <FormInput
          label="Business Name"
          type="text"
          name="business_name"
          placeholder="Enter Business Name"
          errors={errors}
          register={register}
          control={control}
          containerClass="mb-2"
        />
      </Col>

      <Col md={6}>
        <FormInput
          label="Email"
          type="text"
          name="email"
          placeholder="Enter Email"
          errors={errors}
          register={register}
          control={control}
          containerClass="mb-2"
        />
      </Col>

      <Col md={6}>
        <FormInput
          label="Phone"
          type="number"
          name="phone"
          placeholder="Enter Phone"
          errors={errors}
          register={register}
          control={control}
          containerClass="mb-2"
        />
      </Col>
      <Col md={6}>
        <ReactSelect
          name="referrer_id"
          label="Referrer"
          errors={errors}
          control={control}
          options={referrerOptions}
          defaultSelected={referrerOptions?.find(
            (item) => item.value === customerDetails?.referrer_id
          )}
        />
      </Col>
      <Col md={4}>
        <div className="mb-2">
          <Form.Label>Products</Form.Label>
          {PRODUCT_OPTIONS.map((product) => (
            <FormInput
              key={product.label}
              id={product.label}
              label={product.label}
              type="checkbox"
              name="subscribed_products[]"
              defaultValue={product.value}
              errors={errors}
              register={register}
              control={control}
            />
          ))}
        </div>
      </Col>

      <Col md={4}>
        <div className="mb-2">
          <Form.Label>Setting</Form.Label>
          <FormInput
            label="Show Dashboard"
            type="checkbox"
            name="settings[show_dashboard]"
            errors={errors}
            register={register}
            control={control}
          />
        </div>
      </Col>

      <Col md={4}>
        <div className="mb-2">
          <Form.Label>Is Active ?</Form.Label>
          <FormInput
            key="is_active"
            label="Yes"
            type="checkbox"
            name="is_active"
            errors={errors}
            register={register}
            control={control}
            defaultChecked
          />
        </div>
      </Col>
    </Row>
  );
};

export default CustomerDetailForm;
