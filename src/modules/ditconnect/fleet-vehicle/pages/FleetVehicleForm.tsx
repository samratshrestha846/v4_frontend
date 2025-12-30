/* eslint-disable react/prop-types */
import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';

import CancelButton from '@uhub/components/Form/CancelButton';
import SubmitButton from '@uhub/components/Form/SubmitButton';
import BackendValidationMessage from '@uhub/components/BackendValidationMessage';
import { FormInput } from '@uhub/components';
import ReactSelect from '@uhub/components/ReactSelect';
import CustomDatePicker from '@uhub/components/CustomDatePicker';

import { FleetVehicleFormProps } from '../types/FleetVehicle';

import useFleetVehicleForm from '../hooks/useFleetVehicleForm';
import {
  FLEET_VEHICLE_STATUS_OPTIONS,
  FLEET_VEHICLE_TYPE_OPTIONS,
} from '../constants/constant';

type Props = {
  defaultValues: FleetVehicleFormProps;
};
const FleetVehicleForm: React.FC<Props> = ({ defaultValues }) => {
  const {
    register,
    control,
    errors,
    handleSubmit,
    serverValidationError,
    setServerValidationError,
    submitted,
    navigateToList,
    onSubmit,
  } = useFleetVehicleForm(defaultValues);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {serverValidationError && (
        <BackendValidationMessage
          setServerValidationError={setServerValidationError}
        />
      )}
      <Row>
        <Col xl={6} lg={6} md={6}>
          <FormInput
            label="Registration Number"
            type="text"
            name="reg_number"
            register={register}
            control={control}
            errors={errors}
            containerClass="mb-2"
          />
        </Col>
        <Col xl={6} lg={6} md={6}>
          <div className="mb-2">
            <ReactSelect
              label="Type"
              name="type"
              errors={errors}
              control={control}
              options={FLEET_VEHICLE_TYPE_OPTIONS}
              placeholder="Select"
              isClearable
              defaultSelected={FLEET_VEHICLE_TYPE_OPTIONS?.find(
                (item) => item.value === defaultValues?.type
              )}
            />
          </div>
        </Col>
      </Row>
      <Row>
        <Col xl={6} lg={6} md={6}>
          <div className="mb-2">
            <CustomDatePicker
              label="Purchased Date"
              name="purchased_date"
              control={control}
              errors={errors}
              defaultSelected={defaultValues?.purchased_date}
              maxDate={new Date()}
            />
          </div>
        </Col>

        <Col xl={6} lg={6} md={6}>
          <div className="mb-2">
            <CustomDatePicker
              label="Rego Until"
              name="rego_until"
              control={control}
              errors={errors}
              defaultSelected={defaultValues?.rego_until}
            />
          </div>
        </Col>
      </Row>
      {defaultValues?.id && (
        <Row>
          <Col xl={6} lg={6} md={6}>
            <div className="mb-2">
              <ReactSelect
                label="Status"
                name="status"
                errors={errors}
                control={control}
                options={FLEET_VEHICLE_STATUS_OPTIONS}
                placeholder="Select"
                defaultSelected={FLEET_VEHICLE_STATUS_OPTIONS?.find(
                  (item) => item.value === defaultValues?.status
                )}
              />
            </div>
          </Col>
        </Row>
      )}

      <Row>
        <Col>
          <div className="float-end button-list mt-3">
            <CancelButton redirectOnClick={navigateToList} />
            <SubmitButton disable={submitted} />
          </div>
        </Col>
      </Row>
    </Form>
  );
};

export default FleetVehicleForm;
