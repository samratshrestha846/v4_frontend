/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React from 'react';
import { Row, Col, Form, Card } from 'react-bootstrap';
import { Controller } from 'react-hook-form';
import { FormInput } from '../../../../components';
import { DEFAULT_ALERT_ACTIVITY_INTERVAL } from '../../../../constants/ceresTagConstants';

const AlertNotificationForm = ({
  propertyDetail,
  register,
  control,
  errors,
  activityAlertNone,
  setActivityAlertNone,
  activityAlertLow,
  setActivityAlertLow,
  activityAlertHigh,
  setActivityAlertHigh,
  setAgreed,
  enableActivityAlertNone,
  setEnableActivityAlertNone,
  enableActivityAlertLow,
  setEnableActivityAlertLow,
  enableActivityAlertHigh,
  setEnableActivityAlertHigh,
  agreed,
}: any) => {
  return (
    <>
      <Row className="justify-content-center">
        <Col md={8}>
          <Card>
            <Card.Header>
              <div className="d-flex justify-content-between">
                <h5 className="m-0">Enable No Activity Alert</h5>
                <Controller
                  name="settings[ceres_tag][enable_alert_type_activity_threshold_none]"
                  control={control}
                  defaultValue={activityAlertNone}
                  render={({ field }) => (
                    <Form.Switch
                      id="switch_enable_alert_type_activity_threshold_none"
                      className="custom-switch"
                      checked={field.value}
                      onChange={(e) => {
                        const { checked } = e.target;
                        setActivityAlertNone(checked);
                        field.onChange(checked);
                      }}
                    />
                  )}
                />
              </div>
            </Card.Header>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <p className="m-0">Enable Frequent Alert</p>
                <Controller
                  name="settings[ceres_tag][enable_frequent_alert_type_activity_threshold_none]"
                  control={control}
                  render={({ field }) => (
                    <Form.Switch
                      id="switch_enable_frequent_alert_type_activity_threshold_none"
                      className="custom-switch"
                      checked={field.value}
                      onChange={(e) => {
                        const { checked } = e.target;
                        setEnableActivityAlertNone(checked);
                        field.onChange(checked);
                      }}
                    />
                  )}
                />
              </div>

              <div className="d-flex justify-content-between align-items-center mt-3">
                <p className="m-0">Alert Notification Interval (in Minutes)</p>
                <div>
                  <FormInput
                    control={control}
                    register={register}
                    errors={errors}
                    type="number"
                    name="settings[ceres_tag][frequency_alert_type_activity_threshold_none]"
                    defaultValue={
                      propertyDetail?.settings?.ceres_tag
                        ?.frequency_alert_type_activity_threshold_none ??
                      DEFAULT_ALERT_ACTIVITY_INTERVAL
                    }
                  />
                  {errors &&
                  errors.settings?.ceres_tag
                    ?.frequency_alert_type_activity_threshold_none ? (
                    <Form.Control.Feedback type="invalid" className="d-block">
                      {
                        errors?.settings?.ceres_tag
                          ?.frequency_alert_type_activity_threshold_none
                          ?.message
                      }
                    </Form.Control.Feedback>
                  ) : null}
                </div>
              </div>
              {enableActivityAlertNone ? (
                <div className="d-flex justify-content-start align-items-center mt-1 text-info font-12 fst-italic">
                  <i className="bx bx-info-circle me-1" />
                  <p className="m-0">
                    You will receive a <strong>Single Alert </strong> after the
                    interval defined in Alert Notification Interval.
                  </p>
                </div>
              ) : (
                <div className="d-flex justify-content-start align-items-center mt-1 text-info font-12 fst-italic">
                  <i className="bx bx-info-circle me-1" />
                  <p className="m-0">
                    You will receive a <strong>Single Alert </strong> per day if
                    the Enable Frequent Alert option is disabled.
                  </p>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md={8}>
          <Card>
            <Card.Header>
              <div className="d-flex justify-content-between">
                <h5 className="m-0">Enable Low Activity Alert</h5>
                <Controller
                  name="settings[ceres_tag][enable_alert_type_activity_threshold_low]"
                  control={control}
                  defaultValue={activityAlertLow}
                  render={({ field }) => (
                    <Form.Switch
                      id="switch_enable_alert_type_activity_threshold_low"
                      className="custom-switch"
                      checked={field.value}
                      onChange={(e) => {
                        const { checked } = e.target;
                        setActivityAlertLow(checked);
                        field.onChange(checked);
                      }}
                    />
                  )}
                />
              </div>
            </Card.Header>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <p className="m-0">Enable Frequent Alert</p>
                <Controller
                  name="settings[ceres_tag][enable_frequent_alert_type_activity_threshold_low]"
                  control={control}
                  render={({ field }) => (
                    <Form.Switch
                      id="switch_enable_frequent_alert_type_activity_threshold_low"
                      className="custom-switch"
                      checked={field.value}
                      onChange={(e) => {
                        const { checked } = e.target;
                        setEnableActivityAlertLow(checked);
                        field.onChange(checked);
                      }}
                    />
                  )}
                />
              </div>

              <div className="d-flex justify-content-between align-items-center mt-3">
                <p className="m-0">Alert Notification Interval (in Minutes)</p>
                <div>
                  <FormInput
                    control={control}
                    register={register}
                    errors={errors}
                    type="number"
                    name="settings[ceres_tag][frequency_alert_type_activity_threshold_low]"
                  />
                  {errors &&
                  errors.settings?.ceres_tag
                    ?.frequency_alert_type_activity_threshold_low ? (
                    <Form.Control.Feedback type="invalid" className="d-block">
                      {
                        errors?.settings?.ceres_tag
                          ?.frequency_alert_type_activity_threshold_low?.message
                      }
                    </Form.Control.Feedback>
                  ) : null}
                </div>
              </div>
              {enableActivityAlertLow ? (
                <div className="d-flex justify-content-start align-items-center mt-1 text-info font-12 fst-italic">
                  <i className="bx bx-info-circle me-1" />
                  <p className="m-0">
                    You will receive a <strong>Single Alert </strong> after the
                    interval defined in Alert Notification Interval.
                  </p>
                </div>
              ) : (
                <div className="d-flex justify-content-start align-items-center mt-1 text-info font-12 fst-italic">
                  <i className="bx bx-info-circle me-1" />
                  <p className="m-0">
                    You will receive a <strong>Single Alert </strong> per day if
                    the Enable Frequent Alert option is disabled.
                  </p>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md={8}>
          <Card>
            <Card.Header>
              <div className="d-flex justify-content-between">
                <h5 className="m-0">Enable High Activity Alert</h5>
                <Controller
                  name="settings[ceres_tag][enable_alert_type_activity_threshold_high]"
                  control={control}
                  defaultValue={activityAlertHigh}
                  render={({ field }) => (
                    <Form.Switch
                      id="switch_enable_alert_type_activity_threshold_high"
                      className="custom-switch"
                      checked={field.value}
                      onChange={(e) => {
                        const { checked } = e.target;
                        setActivityAlertHigh(checked);
                        field.onChange(checked);
                      }}
                    />
                  )}
                />
              </div>
            </Card.Header>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <p className="m-0">Enable Frequent Alert</p>
                <Controller
                  name="settings[ceres_tag][enable_frequent_alert_type_activity_threshold_high]"
                  control={control}
                  defaultValue={
                    propertyDetail?.settings?.ceres_tag
                      ?.enable_frequent_alert_type_activity_threshold_high
                  }
                  render={({ field }) => (
                    <Form.Switch
                      id="switch_enable_frequent_alert_type_activity_threshold_high"
                      className="custom-switch"
                      checked={field.value}
                      onChange={(e) => {
                        const { checked } = e.target;
                        setEnableActivityAlertHigh(checked);
                        field.onChange(checked);
                      }}
                    />
                  )}
                />
              </div>

              <div className="d-flex justify-content-between align-items-center mt-3">
                <p className="m-0">Alert Notification Interval (in Minutes)</p>
                <div>
                  <FormInput
                    control={control}
                    register={register}
                    errors={errors}
                    type="number"
                    name="settings[ceres_tag][frequency_alert_type_activity_threshold_high]"
                  />
                  {errors &&
                  errors.settings?.ceres_tag
                    ?.frequency_alert_type_activity_threshold_high ? (
                    <Form.Control.Feedback type="invalid" className="d-block">
                      {
                        errors?.settings?.ceres_tag
                          ?.frequency_alert_type_activity_threshold_high
                          ?.message
                      }
                    </Form.Control.Feedback>
                  ) : null}
                </div>
              </div>
              {enableActivityAlertHigh ? (
                <div className="d-flex justify-content-start align-items-center mt-1 text-info font-12 fst-italic">
                  <i className="bx bx-info-circle me-1" />
                  <p className="m-0">
                    You will receive a <strong>Single Alert </strong> after the
                    interval defined in Alert Notification Interval.
                  </p>
                </div>
              ) : (
                <div className="d-flex justify-content-start align-items-center mt-1 text-info font-12 fst-italic">
                  <i className="bx bx-info-circle me-1" />
                  <p className="m-0">
                    You will receive a <strong>Single Alert </strong> per day if
                    the Enable Frequent Alert option is disabled.
                  </p>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col md={8}>
          <Form.Label>
            <div className="d-flex justify-content-center align-items-center">
              <FormInput
                type="checkbox"
                control={control}
                register={register}
                errors={errors}
                name="agreed"
                propagateOnChange={(e: any) => {
                  setAgreed(e.target.checked);
                }}
                defaultChecked={agreed}
              />
              &nbsp;&nbsp;
              <p className="m-0">
                I agree to update the Alert Notification Settings.
              </p>
            </div>
          </Form.Label>
          {errors && errors.agreed ? (
            <Form.Control.Feedback type="invalid" className="d-block">
              {errors?.agreed.message}
            </Form.Control.Feedback>
          ) : null}
        </Col>
      </Row>
    </>
  );
};

export default AlertNotificationForm;
