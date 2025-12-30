import React from 'react';
import { Col, Row, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import PageTitle from '../../../components/PageTitle';
import { PROPERTY_VIEW } from '../../../constants/path';
import CustomLoader from '../../../components/CustomLoader';
import ErrorMessage from '../../../components/ErrorMessage';
import useUpdateAlertNotificationsSetting from './hooks/useUpdateAlertNotificationsSetting';
import AlertNotificationForm from './forms/AlertNotificationForm';
import { prepareDynamicUrl } from '../../../helpers';

const AlertNotificationsSetting: React.FC = () => {
  const navigate = useNavigate();

  const {
    propertyDetail,
    isError,
    isFetching,
    register,
    control,
    handleSubmit,
    onSubmit,
    errors,
    serverValidationError,
    setServerValidationError,
    submitted,
    agreed,
    setAgreed,
    activityAlertNone,
    setActivityAlertNone,
    activityAlertLow,
    setActivityAlertLow,
    activityAlertHigh,
    setActivityAlertHigh,
    enableActivityAlertNone,
    setEnableActivityAlertNone,
    enableActivityAlertLow,
    setEnableActivityAlertLow,
    enableActivityAlertHigh,
    setEnableActivityAlertHigh,
  } = useUpdateAlertNotificationsSetting();

  if (isFetching) return <CustomLoader />;

  if (isError) return <ErrorMessage />;

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          {
            label: propertyDetail?.name ?? 'Property',
            path: prepareDynamicUrl(PROPERTY_VIEW, propertyDetail?.id),
            active: false,
          },
          {
            label: 'Alert Notifications Settings',
            path: '',
            active: true,
          },
        ]}
        title="Alert Notifications Settings"
      />
      <Row className="justify-content-center">
        <Col md={8}>
          {serverValidationError && (
            <Alert
              variant="danger"
              onClose={() => setServerValidationError(false)}
              dismissible>
              <strong>Validation Failed - </strong> Please fix validation errors
              and try again
            </Alert>
          )}
        </Col>
      </Row>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <AlertNotificationForm
          propertyDetail={propertyDetail}
          register={register}
          control={control}
          errors={errors}
          activityAlertNone={activityAlertNone}
          setActivityAlertNone={setActivityAlertNone}
          activityAlertLow={activityAlertLow}
          setActivityAlertLow={setActivityAlertLow}
          activityAlertHigh={activityAlertHigh}
          setActivityAlertHigh={setActivityAlertHigh}
          enableActivityAlertNone={enableActivityAlertNone}
          setEnableActivityAlertNone={setEnableActivityAlertNone}
          enableActivityAlertLow={enableActivityAlertLow}
          setEnableActivityAlertLow={setEnableActivityAlertLow}
          enableActivityAlertHigh={enableActivityAlertHigh}
          setEnableActivityAlertHigh={setEnableActivityAlertHigh}
          setAgreed={setAgreed}
          agreed={agreed}
        />

        <Row className="justify-content-center">
          <Col md={8}>
            <div className="float-end button-list my-3">
              <Button
                variant="outline"
                className=" btn btn-ghost"
                onClick={() =>
                  navigate(prepareDynamicUrl(PROPERTY_VIEW, propertyDetail?.id))
                }>
                <i className="bx bx-x me-1" />
                Cancel
              </Button>

              <Button
                variant="secondary"
                className="btn btn-secondary"
                type="submit"
                disabled={submitted}>
                <i className="bx bx-save me-1" />
                Save
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default AlertNotificationsSetting;
