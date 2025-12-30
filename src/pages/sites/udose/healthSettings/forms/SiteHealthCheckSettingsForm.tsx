/* eslint-disable react/prop-types */
import React, { ChangeEvent } from 'react';
import { Card, Row, Col, Form } from 'react-bootstrap';
import {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';
import { FormInput } from '../../../../../components';
import {
  HealthSettingConfiguration,
  SiteHealthSettings,
} from '../../../../../types/udose/siteHealthSettings';

type Props = {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  control: Control<any>;
  healthSettings?: SiteHealthSettings;
  setValue: UseFormSetValue<HealthSettingConfiguration>;
};

const SiteHealthCheckSettingsForm: React.FC<Props> = ({
  register,
  errors,
  control,
  healthSettings,
  setValue,
}) => {
  return (
    <>
      <Card className="mb-1">
        <Card.Header>
          <Row>
            <Col md={9}>
              <h5 className="mt-1 mb-0">All Check</h5>
              <div className="d-flex justify-content-start align-items-center">
                <i className="bx bx-info-circle font-10 text-info me-1" />
                <p className="m-0 font-10 fst-italic">
                  The health check for the site is not performed if it is
                  disabled.
                </p>
              </div>
            </Col>
            <Col md={3}>
              <Form.Switch
                id="checking_enabled"
                className="custom-switch"
                name="checking_enabled"
                defaultChecked={
                  healthSettings?.health_check_configuration?.checking_enabled
                }
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setValue('checking_enabled', e.target.checked)
                }
              />
            </Col>
          </Row>
        </Card.Header>
      </Card>

      <Card className="mb-1">
        <Card.Header>
          <Row className="mb-2">
            <Col md={9}>
              <h5 className="mt-1 mb-0">Water Flow</h5>
            </Col>
            <Col md={3}>
              <Form.Switch
                id="water_flow"
                className="custom-switch"
                name="water_flow"
                defaultChecked={
                  healthSettings?.health_check_configuration?.configuration
                    .water_flow
                }
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setValue('water_flow', e.target.checked)
                }
              />
            </Col>
          </Row>
          <Row>
            <Col md={9}>
              <p className="mt-1 mb-0">
                Notify when there is no water flow for X hours
              </p>
            </Col>
            <Col md={3}>
              <FormInput
                type="text"
                placeholder="Default : 10 hours without W.F"
                name="water_flow_threshold_hours"
                register={register}
                control={control}
                errors={errors}
              />
            </Col>
          </Row>
        </Card.Header>
      </Card>

      <Card className="mb-1">
        <Card.Header>
          <Row className="mb-2">
            <Col md={9}>
              <h5 className="mt-1 mb-0">Low Water Flow</h5>
            </Col>
            <Col md={3}>
              <Form.Switch
                id="min_water_flow"
                className="custom-switch"
                name="min_water_flow"
                defaultChecked={
                  healthSettings?.health_check_configuration?.configuration
                    .min_water_flow
                }
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setValue('min_water_flow', e.target.checked)
                }
              />
            </Col>
          </Row>
          <Row>
            <Col md={9}>
              <p className="mt-1 mb-0">
                Notify when there is continuous low water flow or below minimum
                X threshold
              </p>
            </Col>
            <Col md={3}>
              <FormInput
                type="text"
                placeholder="0"
                name="min_water_flow_threshold"
                register={register}
                control={control}
                errors={errors}
              />
            </Col>
          </Row>
        </Card.Header>
      </Card>

      <Card className="mb-1">
        <Card.Header>
          <Row className="mb-2">
            <Col md={9}>
              <h5 className="mt-1 mb-0">Water Leakage</h5>
            </Col>
            <Col md={3}>
              <Form.Switch
                id="water_leak"
                className="custom-switch"
                name="water_leak"
                defaultChecked={
                  healthSettings?.health_check_configuration?.configuration
                    .water_leak
                }
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setValue('water_leak', e.target.checked)
                }
              />
            </Col>
          </Row>
          <Row>
            <Col md={9}>
              <p className="mt-1 mb-0">
                Maximum water limit in specified duration
              </p>
            </Col>
            <Col md={3}>
              <FormInput
                type="text"
                placeholder="Default: 10,000 L"
                name="max_water_flow_limit"
                register={register}
                errors={errors}
              />
            </Col>
          </Row>
          <Row>
            <Col md={9}>
              <p className="mt-2 mb-0">
                Hours before the water flow limit is reached
              </p>
            </Col>
            <Col md={3}>
              <FormInput
                className="mt-1"
                type="text"
                placeholder="Default: 24 hours"
                name="max_water_flow_limit_hrs"
                register={register}
                errors={errors}
              />
            </Col>
          </Row>
        </Card.Header>
      </Card>

      <Card className="mb-1">
        <Card.Header>
          <Row>
            <Col md={9}>
              <h5 className="mt-1">Tank Level</h5>
            </Col>
            <Col md={3}>
              <Form.Switch
                id="tank_level"
                className="custom-switch"
                name="tank_level"
                defaultChecked={
                  healthSettings?.health_check_configuration?.configuration
                    .tank_level
                }
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setValue('tank_level', e.target.checked)
                }
              />
            </Col>
          </Row>
          <Row>
            <Col md={9}>
              <p className="mt-1 mb-0">Notify Tank Level below %</p>
            </Col>
            <Col md={3}>
              <FormInput
                type="text"
                placeholder="Default : Below 10%"
                name="tank_level_threshold"
                register={register}
                errors={errors}
              />
            </Col>
          </Row>
        </Card.Header>
      </Card>
    </>
  );
};

export default SiteHealthCheckSettingsForm;
