import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';
import { FormInput } from '../../../components';

type Props = {
  control: Control<any>;
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
};

const TransportEmissionForm: React.FC<Props> = ({
  control,
  register,
  errors,
}) => {
  return (
    <Row>
      <Col md={12} className="mb-2">
        <FormInput
          label="Origin"
          type="text"
          name="origin"
          placeholder="Enter Origin"
          register={register}
          key="origin"
          errors={errors}
          control={control}
        />
      </Col>
      <Col md={12} className="mb-2">
        <FormInput
          label="Destination"
          type="text"
          name="destination"
          placeholder="Enter Destination"
          register={register}
          key="destination"
          errors={errors}
          control={control}
        />
      </Col>
      <Col md={12} className="mb-2">
        <FormInput
          label="Distance (km)"
          type="text"
          name="distance"
          placeholder="0.00"
          register={register}
          key="distance"
          errors={errors}
          control={control}
        />
      </Col>
      <Col md={12} className="mb-2">
        <FormInput
          label="Vehicle"
          type="text"
          name="vehicle"
          placeholder="Enter Vehicle"
          register={register}
          key="vehicle"
          errors={errors}
          control={control}
        />
      </Col>
      <Col md={12} className="mb-2">
        <FormInput
          label="Emission Per Kg"
          type="text"
          name="emission_per_kg"
          placeholder="0.00"
          register={register}
          key="emission_per_kg"
          errors={errors}
          control={control}
        />
      </Col>
    </Row>
  );
};

export default TransportEmissionForm;
