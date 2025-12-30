import React from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
} from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';
import ReactSelect from '../../../components/ReactSelect';
import { FormInput } from '../../../components';

import {} from '../../../types/tag';
import { LabelNumericValue } from '../../../types/common';

import useAuth from '../../../hooks/useAuth';
import { User, UserFormFields } from '../../../types/user/user';

type Props = {
  register: UseFormRegister<UserFormFields>;
  control: Control<UserFormFields>;
  errors: FieldErrors<UserFormFields>;
  roleOptions: LabelNumericValue[];
  customerOptions: LabelNumericValue[];
  userDetail?: User;
  showCustomerField: boolean;
  // eslint-disable-next-line no-unused-vars
  propagateOnRoleChange?: (selected?: LabelNumericValue) => void;
};

const UserAddForm: React.FC<Props> = ({
  register,
  control,
  errors,
  roleOptions,
  customerOptions,
  userDetail,
  showCustomerField,
  propagateOnRoleChange,
}) => {
  const { isSuperAdmin, isAdmin } = useAuth();
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
            name="email"
            placeholder="Enter email"
            register={register}
            key="email"
            errors={errors}
            control={control}
          />
        </Col>
        <Col md={6} className="mb-2">
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
      <Row>
        <Col md={6}>
          <ReactSelect
            isDisabled={!(isSuperAdmin || isAdmin)}
            name="role_id"
            label="Role"
            errors={errors}
            control={control}
            options={roleOptions}
            defaultSelected={roleOptions?.find(
              (val) => val.value === userDetail?.roles?.[0]?.id
            )}
            propagateOnChange={propagateOnRoleChange}
            isClearable
          />
        </Col>
        {showCustomerField && (
          <Col md={6}>
            <ReactSelect
              name="customer_id"
              label="Business Customer"
              errors={errors}
              control={control}
              options={customerOptions}
              defaultSelected={customerOptions?.find(
                (val) => val.value === userDetail?.customer?.id
              )}
            />
          </Col>
        )}
      </Row>
    </>
  );
};

export default UserAddForm;
