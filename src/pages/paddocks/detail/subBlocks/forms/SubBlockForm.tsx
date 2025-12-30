/* eslint-disable react/prop-types */
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { FormInput } from '../../../../../components';

const SubBlockForm = ({ register, errors, control }: any) => {
  return (
    <Row>
      <Col md={12}>
        <FormInput
          label="Name"
          type="text"
          name="name"
          placeholder="Name"
          register={register}
          errors={errors}
          control={control}
          containerClass="mb-2"
        />
      </Col>

      <Col md={12}>
        <FormInput
          label="Area in Hectares"
          type="text"
          name="area_in_hectares"
          register={register}
          errors={errors}
          control={control}
          containerClass="mb-2"
        />
      </Col>
    </Row>
  );
};

export default SubBlockForm;
