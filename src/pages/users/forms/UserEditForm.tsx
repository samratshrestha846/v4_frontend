import React from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
} from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';
import { FormInput } from '../../../components';
import { User, UserFormFields } from '../../../types/user/user';

type Props = {
  register: UseFormRegister<UserFormFields>;
  control: Control<UserFormFields>;
  errors: FieldErrors<UserFormFields>;
  userDetail?: User;
};

const UserEditForm: React.FC<Props> = ({
  register,
  control,
  errors,
  userDetail,
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
          <Controller
            control={control}
            name="phone_number"
            key="phone_number"
            rules={{ required: true }}
            render={({ field: { onChange } }) => (
              <PhoneInput
                specialLabel="Mobile Number"
                value={userDetail?.phone_number}
                masks={{ au: ' ... ... ...' }}
                onChange={onChange}
                country="au"
                onlyCountries={['au']}
                enableLongNumbers={false}
                countryCodeEditable={false}
              />
            )}
          />
          {errors && errors?.phone_number ? (
            <Form.Control.Feedback type="invalid" className="d-block">
              {errors.phone_number?.message}
            </Form.Control.Feedback>
          ) : null}
        </Col>
      </Row>
    </>
  );
};

export default UserEditForm;
