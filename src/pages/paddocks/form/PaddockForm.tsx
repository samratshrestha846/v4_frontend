import React from 'react';
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';
import { Col, Row } from 'react-bootstrap';
import { PaddockFormValues } from '../../../types/horticulture/paddock';
import ReactSelect from '../../../components/ReactSelect';
import { FormInput } from '../../../components';
import { LabelNumericValueDropdown } from '../../../types/common';

type Props = {
  control: Control<PaddockFormValues>;
  errors: FieldErrors<PaddockFormValues>;
  register: UseFormRegister<PaddockFormValues>;
  propertiesOptions: LabelNumericValueDropdown[];
};

const PaddockForm: React.FC<Props> = ({
  control,
  register,
  errors,
  propertiesOptions,
}) => {
  return (
    <Row>
      <Col md={6}>
        <div className="mb-2">
          <ReactSelect
            label="Customer Property"
            name="customer_property_id"
            errors={errors}
            control={control}
            options={propertiesOptions}
          />
        </div>
      </Col>

      <Col md={6}>
        <FormInput
          label="Name"
          type="text"
          name="name"
          placeholder="Name"
          register={register}
          control={control}
          errors={errors}
          containerClass="mb-2"
        />
      </Col>

      <Col md={6}>
        <FormInput
          label="Area (Hectare)"
          type="text"
          name="area_in_hectare"
          placeholder="Area (Hectare)"
          register={register}
          control={control}
          errors={errors}
          containerClass="mb-2"
        />
      </Col>
    </Row>
  );
};

export default PaddockForm;
