/* eslint-disable react/prop-types */
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';

import CustomDatePicker from '../../../../../../../components/CustomDatePicker';
import { FormInput } from '../../../../../../../components';
import ReactSelect from '../../../../../../../components/ReactSelect';
import { ServiceLogFormValues } from '../../../../../../../types/udose/serviceLog';
import { LabelNumericValue } from '../../../../../../../types/common';

type Props = {
  register: UseFormRegister<ServiceLogFormValues>;
  errors: FieldErrors<ServiceLogFormValues>;
  control: Control<ServiceLogFormValues>;
  maintainersOptions: LabelNumericValue[];
};

const AddServiceLogForm: React.FC<Props> = ({
  register,
  errors,
  control,
  maintainersOptions,
}) => {
  return (
    <Row>
      <Col md={12}>
        <div className="mb-2">
          <CustomDatePicker
            label="Date"
            name="date"
            control={control}
            errors={errors}
            defaultSelected={new Date()}
            maxDate={new Date()}
          />
        </div>
      </Col>

      <Col md={12}>
        <div className="mb-2">
          <CustomDatePicker
            label="Arrival Time"
            name="arrival_time"
            control={control}
            errors={errors}
            defaultSelected={undefined}
            maxDate={new Date()}
            showTimeSelect
            showTimeSelectOnly
            dateFormat="p"
            placeholder="HH:MM AM/PM"
          />
        </div>
      </Col>

      <Col md={12}>
        <div className="mb-2">
          <CustomDatePicker
            label="Departure Time"
            name="departure_time"
            control={control}
            errors={errors}
            defaultSelected={undefined}
            maxDate={new Date()}
            showTimeSelect
            showTimeSelectOnly
            dateFormat="p"
            placeholder="HH:MM AM/PM"
          />
        </div>
      </Col>

      <Col md={12}>
        <div className="mb-2">
          <ReactSelect
            errors={errors}
            control={control}
            label="Maintainer"
            name="user_id"
            options={maintainersOptions}
          />
        </div>
      </Col>

      <Col md={12}>
        <FormInput
          label="Notes"
          type="textarea"
          name="notes"
          placeholder="Text Here..."
          register={register}
          errors={errors}
          control={control}
          containerClass="mb-2"
        />
      </Col>
    </Row>
  );
};

export default AddServiceLogForm;
