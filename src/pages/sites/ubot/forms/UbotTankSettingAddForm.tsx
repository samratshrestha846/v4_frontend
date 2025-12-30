/* eslint-disable react/prop-types */
import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';
import { FormInput } from '../../../../components';
import { UbotFormFields } from '../../../../types/ubot';

type Props = {
  register: UseFormRegister<UbotFormFields>;
  errors: FieldErrors<UbotFormFields>;
  control: Control<UbotFormFields>;
};

const UbotTankSettingAddForm: React.FC<Props> = ({
  control,
  register,
  errors,
}) => {
  return (
    <>
      <h5 className="mt-0 mb-2 text-uppercase p-2 b-secondary">
        <i className="mdi mdi-file-table-box-multiple-outline me-2" />
        Tank Settings
      </h5>
      <Row className="mb-1">
        <Col sm={6} md={4} className="mb-2">
          <FormInput
            label="Tank Height (m)"
            type="text"
            name="tank_height"
            placeholder="Enter Tank Height"
            register={register}
            key="tank_height"
            errors={errors}
            control={control}
          />
        </Col>
        <Col sm={6} md={4} className="mb-2">
          <Form.Label>
            Density (Kg/m<sup>3</sup>)
          </Form.Label>
          <FormInput
            type="text"
            name="density"
            placeholder="Enter Density"
            register={register}
            key="density"
            errors={errors}
            control={control}
          />
        </Col>
        <Col sm={6} md={4} className="mb-2">
          <FormInput
            label="Tank Capacity(l)"
            type="text"
            name="tank_capacity"
            placeholder="Enter Tank Capacity"
            register={register}
            key="tank_capacity"
            errors={errors}
            control={control}
          />
        </Col>
      </Row>
    </>
  );
};

export default UbotTankSettingAddForm;
