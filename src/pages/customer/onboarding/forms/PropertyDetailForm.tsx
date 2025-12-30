/* eslint-disable react/prop-types */
import React, { Dispatch, SetStateAction } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';

import { FormInput } from '../../../../components';
import ReactSelect from '../../../../components/ReactSelect';
import { InputFields } from '../../../../types/customer/customerOnboarding';
import { LabelNumericValue } from '../../../../types/common';

type Props = {
  control: Control<InputFields>;
  errors: FieldErrors<InputFields>;
  register: UseFormRegister<InputFields>;
  isCreateNewStationManager: boolean;
  setIsCreateNewStationManager: Dispatch<SetStateAction<boolean>>;
  regionsDropdown: LabelNumericValue[];
};

const PropertyDetailForm: React.FC<Props> = ({
  control,
  register,
  errors,
  isCreateNewStationManager,
  setIsCreateNewStationManager,
  regionsDropdown,
}) => {
  return (
    <>
      <Row>
        <Col md={6}>
          <FormInput
            label="Property Name"
            type="text"
            name="name"
            placeholder="Enter Property Name"
            errors={errors}
            register={register}
            control={control}
            containerClass="mb-2"
          />
        </Col>

        <Col md={6}>
          <ReactSelect
            label="Region"
            name="region_id"
            errors={errors}
            control={control}
            options={regionsDropdown}
          />
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <div className="mb-2">
            <Form.Label>Optiweigh Setting</Form.Label>
            <FormInput
              key="is_enable"
              label="Enable"
              type="checkbox"
              name="is_enable"
              errors={errors}
              register={register}
              control={control}
              className="mb-2"
            />
          </div>
        </Col>
        <Col md={6}>
          <FormInput
            label="Optiweigh Client ID"
            register={register}
            control={control}
            errors={errors}
            name="client_id"
            type="text"
            containerClass="mb-2"
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <FormInput
            label="Please check if you want to create Station Manager for this Property"
            type="checkbox"
            name="isCreateNewStationManager"
            propagateOnChange={() =>
              setIsCreateNewStationManager(!isCreateNewStationManager)
            }
            control={control}
            register={register}
            containerClass="my-2"
          />
        </Col>
      </Row>
    </>
  );
};

export default PropertyDetailForm;
