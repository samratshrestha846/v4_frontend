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
  BusinessOwnerInputFields,
  InputFields,
} from '../../../../types/customer/customerOnboarding';

type Props = {
  control: Control<InputFields>;
  errors: FieldErrors<InputFields>;
  register: UseFormRegister<InputFields>;
  ownerDetails?: BusinessOwnerInputFields;
};

const BusinessOwnerDetailsForm: React.FC<Props> = ({
  control,
  errors,
  register,
  ownerDetails,
}) => {
  return (
    <>
      <Row>
        <Col md={6}>
          <FormInput
            label="First Name"
            type="text"
            name="owner_first_name"
            placeholder="Enter first name"
            containerClass="mb-2"
            register={register}
            key="owner_first_name"
            errors={errors}
            control={control}
          />
        </Col>
        <Col md={6}>
          <FormInput
            label="Last Name"
            type="text"
            name="owner_last_name"
            placeholder="Enter last name"
            containerClass="mb-2"
            register={register}
            key="owner_last_name"
            errors={errors}
            control={control}
          />
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <FormInput
            label="Email Address"
            type="text"
            name="owner_email"
            placeholder="Enter email"
            register={register}
            key="owner_email"
            errors={errors}
            control={control}
            containerClass="mb-2"
          />
        </Col>
        <Col md={6}>
          <div className="mb-2">
            <Controller
              control={control}
              name="owner_phone_number"
              key="owner_phone_number"
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
                  value={ownerDetails?.owner_phone_number}
                />
              )}
            />
            {errors && errors?.owner_phone_number ? (
              <span className="phone-error-message">
                {errors?.owner_phone_number?.message}
              </span>
            ) : null}
          </div>
        </Col>
      </Row>
    </>
  );
};

export default BusinessOwnerDetailsForm;
