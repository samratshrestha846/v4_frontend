import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';
import { FormInput } from '../../../../components';
import { CropFormValues } from '../../../../types/horticulture/horticulture';

type Props = {
  control: Control<CropFormValues>;
  errors: FieldErrors<CropFormValues>;
  register: UseFormRegister<CropFormValues>;
};

const AddCropForm: React.FC<Props> = ({ register, errors, control }) => {
  return (
    <Row className="mb-1">
      <Col sm={6} md={6}>
        <div className="mb-2">
          <FormInput
            label="Name"
            type="text"
            name="name"
            placeholder="Enter Name"
            register={register}
            key="name"
            errors={errors}
            control={control}
            containerClass="mb-2"
          />
        </div>
      </Col>
      <Col sm={6} md={6}>
        <FormInput
          label="Life Span Days"
          type="number"
          name="life_span_in_days"
          placeholder="Enter Life Span in days"
          register={register}
          key="life_span_in_days"
          errors={errors}
          control={control}
          containerClass="mb-2"
        />
      </Col>
    </Row>
  );
};

export default AddCropForm;
