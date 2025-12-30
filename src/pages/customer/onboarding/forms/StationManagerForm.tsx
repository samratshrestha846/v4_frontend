/* eslint-disable react/prop-types */
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
} from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';
import { FormInput } from '../../../../components';
import {
  InputFields,
  StationManagerInputFields,
} from '../../../../types/customer/customerOnboarding';

type Props = {
  control: Control<InputFields>;
  errors: FieldErrors<InputFields>;
  register: UseFormRegister<InputFields>;
  stationManagerDetails?: StationManagerInputFields;
};

const StationManagerForm: React.FC<Props> = ({
  control,
  errors,
  register,
  stationManagerDetails,
}) => {
  return (
    <>
      <Row>
        <Col md={6}>
          <FormInput
            label="First Name"
            type="text"
            name="first_name"
            placeholder="Enter first name"
            containerClass="mb-2"
            register={register}
            key="first_name"
            errors={errors}
            control={control}
          />
        </Col>
        <Col md={6}>
          <FormInput
            label="Last Name"
            type="text"
            name="last_name"
            placeholder="Enter last name"
            containerClass="mb-2"
            register={register}
            key="last_name"
            errors={errors}
            control={control}
          />
        </Col>
      </Row>
      <Row>
        <Col md={6} className="mb-2">
          <FormInput
            label="Email Address"
            type="text"
            name="email_address"
            placeholder="Enter email"
            register={register}
            key="email_address"
            errors={errors}
            control={control}
            containerClass="mb-2"
          />
        </Col>
        <Col md={6} className="mb-2">
          <div className="mb-2">
            <Controller
              control={control}
              name="phone_number"
              key="phone_number"
              rules={{ required: true }}
              render={({ field: { onChange } }) => (
                <PhoneInput
                  specialLabel="Mobile Number"
                  masks={{ au: ' ... ... ...' }}
                  onChange={onChange}
                  country="au"
                  onlyCountries={['au']}
                  enableLongNumbers={false}
                  countryCodeEditable={false}
                  value={stationManagerDetails?.phone_number}
                />
              )}
            />
            {errors && errors?.phone_number ? (
              <span className="phone-error-message">
                {errors?.phone_number?.message}
              </span>
            ) : null}
          </div>
        </Col>
      </Row>
    </>
  );
};

export default StationManagerForm;
