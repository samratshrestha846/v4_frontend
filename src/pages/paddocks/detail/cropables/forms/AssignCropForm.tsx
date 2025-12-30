/* eslint-disable react/prop-types */
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import ReactSelect from '../../../../../components/ReactSelect';
import CustomDatePicker from '../../../../../components/CustomDatePicker';
import { FormInput } from '../../../../../components';

const AssignCropForm = ({ register, errors, control, cropsOptions }: any) => {
  return (
    <Row>
      <Col md={12}>
        <div className="mb-2">
          <ReactSelect
            label="Crop"
            name="crop_id"
            errors={errors}
            control={control}
            options={cropsOptions}
          />
        </div>
      </Col>

      <Col md={12}>
        <div className="mb-2">
          <CustomDatePicker
            label="Started On"
            name="date_from"
            defaultSelected={new Date()}
            control={control}
            errors={errors}
          />
        </div>
      </Col>

      <Col md={12}>
        <FormInput
          label="No. of Plants"
          type="text"
          name="number_of_plants"
          register={register}
          errors={errors}
          control={control}
          containerClass="mb-2"
        />
      </Col>
    </Row>
  );
};

export default AssignCropForm;
