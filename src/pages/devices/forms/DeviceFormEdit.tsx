/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { ChangeEvent } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';
import ReactSelect from '../../../components/ReactSelect';
import { FormInput } from '../../../components';
import { Device, DeviceFormFields } from '../../../types/device/device';
import { LabelNumericValue, LabelValueDropdown } from '../../../types/common';

type Props = {
  control: Control<DeviceFormFields>;
  errors: FieldErrors<DeviceFormFields>;
  register: UseFormRegister<DeviceFormFields>;
  configurationsOptions: any[];
  tagsOptions: any[];
  deviceData?: Device;
  deviceConfiguration?: LabelNumericValue;
  hasTelemetry: boolean;
  propagateOnDeviceConfigurationChange: (selected: any) => void;
  propagateOnHasTelemetryChange: (e: ChangeEvent<HTMLInputElement>) => void;
  variantOptions: LabelValueDropdown[];
};

const DeviceFormEdit: React.FC<Props> = ({
  control,
  errors,
  register,
  configurationsOptions,
  tagsOptions,
  deviceData,
  deviceConfiguration,
  hasTelemetry,
  propagateOnDeviceConfigurationChange,
  propagateOnHasTelemetryChange,
  variantOptions,
}) => {
  return (
    <Row>
      <Col md={6} className="mb-3">
        <ReactSelect
          name="device_configuration_id"
          label="Device Configuration"
          errors={errors}
          control={control}
          options={configurationsOptions}
          propagateOnChange={propagateOnDeviceConfigurationChange}
          defaultSelected={configurationsOptions?.find(
            (element) => element.value === deviceData?.device_configuration?.id
          )}
          isClearable
        />
      </Col>

      {variantOptions.length > 0 && (
        <Col md={6} className="mb-3">
          <ReactSelect
            name="variant"
            label={
              deviceConfiguration?.label
                ? `${deviceConfiguration?.label} Variant`
                : 'Variant'
            }
            errors={errors}
            control={control}
            options={variantOptions}
            defaultSelected={variantOptions?.find(
              (element) => element.value === deviceData?.variant
            )}
            isClearable
          />
        </Col>
      )}

      <Col md={6} className="mb-3">
        <ReactSelect
          name="tag_ids[]"
          label="Device Tags"
          errors={errors}
          control={control}
          options={tagsOptions}
          isMultiple
          closeMenuOnSelect={false}
          defaultSelected={deviceData?.tags?.map((tag) => ({
            value: tag.id,
            label: tag.name,
          }))}
        />
      </Col>

      <Col md={6}>
        <Form.Label>Telemetry Option</Form.Label>
        <FormInput
          name="has_telemetry"
          label="Has Telemetry"
          errors={errors}
          control={control}
          register={register}
          type="checkbox"
          containerClass="mb-3"
          propagateOnChange={propagateOnHasTelemetryChange}
          defaultChecked={deviceData?.has_telemetry}
        />
      </Col>

      {hasTelemetry && (
        <>
          <Col md={6} className="mb-3">
            <FormInput
              label="Gateway Modem Number"
              type="text"
              name="gateway_modem_number"
              placeholder="Communication ID for Telstra SIMs or Satellite"
              register={register}
              key="gateway_modem_number"
              errors={errors}
              control={control}
            />
          </Col>

          <Col sm={6} md={6}>
            <Form.Label>Telemetry Type</Form.Label>
            <div className="mb-3">
              <div className="d-flex align-items-center">
                <div>
                  <FormInput
                    id="orbcomm"
                    label="Orbcomm"
                    type="radio"
                    name="telemetry"
                    register={register}
                    defaultValue="orbcomm"
                    errors={errors}
                    control={control}
                  />
                </div>
                <div className="ms-2">
                  <FormInput
                    id="nbiot"
                    label="NB-IoT"
                    type="radio"
                    name="telemetry"
                    register={register}
                    defaultValue="nbiot"
                    errors={errors}
                    control={control}
                  />
                </div>
              </div>
              {errors && errors.telemetry ? (
                <Form.Control.Feedback type="invalid" className="d-block">
                  {errors.telemetry.message}
                </Form.Control.Feedback>
              ) : null}
            </div>
          </Col>
        </>
      )}

      <Col md={6}>
        <Form.Label>Refurbished Option</Form.Label>
        <FormInput
          name="is_refurbished"
          label="Is Refurbished"
          errors={errors}
          control={control}
          register={register}
          type="checkbox"
          containerClass="mb-3"
          defaultChecked={deviceData?.is_refurbished}
        />
      </Col>

      <Col md={6}>
        <Form.Label>Flowmeter Option</Form.Label>
        <FormInput
          name="has_flow_meter"
          label="Has Flowmeter"
          errors={errors}
          control={control}
          register={register}
          type="checkbox"
          containerClass="mb-3"
          defaultChecked={deviceData?.has_flow_meter}
        />
      </Col>
    </Row>
  );
};

export default DeviceFormEdit;
