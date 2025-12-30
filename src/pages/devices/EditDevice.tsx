import React from 'react';
import { Card, Row, Col, Form, Alert, Button } from 'react-bootstrap';
import PageTitle from '../../components/PageTitle';
import CustomLoader from '../../components/CustomLoader';
import useUpdateDevice from './hooks/useUpdateDevice';
import useDeviceConfigurationsDropdown from '../../hooks/dropdown/useDeviceConfigurationsDropdown';
import useTagsDropdown from '../../hooks/dropdown/useTagsDropdown';
import DeviceFormEdit from './forms/DeviceFormEdit';
import ErrorMessage from '../../components/ErrorMessage';
import Loader from '../../components/Loader';

const EditDevice: React.FC = () => {
  const {
    register,
    control,
    errors,
    handleSubmit,
    onSubmit,
    serverValidationError,
    setServerValidationError,
    submitted,
    navigateToDeviceList,
    deviceData,
    isFetchingDeviceData,
    isErrorDeviceData,
    propagateOnDeviceConfigurationChange,
    propagateOnHasTelemetryChange,
    hasTelemetry,
    deviceConfiguration,
    variantOptions,
    isFetchingVariantOptions,
    isErrorVariantOptions,
  } = useUpdateDevice();

  const {
    data: configurationsOptions,
    isFetching: isFetchingConfigurations,
    isError: isErrorConfigurationOptions,
  } = useDeviceConfigurationsDropdown();

  const {
    data: tagsOptions,
    isFetching: isFetchingTagsOptions,
    isError: isErrorTagsOptions,
  } = useTagsDropdown();

  if (
    isFetchingDeviceData ||
    isFetchingConfigurations ||
    isFetchingTagsOptions
  ) {
    return <CustomLoader />;
  }

  if (
    isErrorDeviceData ||
    isErrorConfigurationOptions ||
    isErrorTagsOptions ||
    isErrorVariantOptions
  ) {
    return <ErrorMessage />;
  }

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          {
            label: 'Devices',
            path: '/devices/list',
          },
          {
            label: 'Edit Device',
            path: `/devices/edit/${deviceData?.id}`,
            active: true,
          },
        ]}
        title="Edit Device"
      />
      <Row>
        <Col>
          {serverValidationError && (
            <Alert
              variant="danger"
              onClose={() => setServerValidationError(false)}
              dismissible>
              <strong>Validation Failed - </strong> Please fix validation errors
              and try again
            </Alert>
          )}

          {isFetchingVariantOptions && <Loader />}

          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <DeviceFormEdit
                  control={control}
                  register={register}
                  errors={errors}
                  propagateOnDeviceConfigurationChange={
                    propagateOnDeviceConfigurationChange
                  }
                  configurationsOptions={configurationsOptions}
                  tagsOptions={tagsOptions}
                  hasTelemetry={hasTelemetry}
                  deviceData={deviceData}
                  propagateOnHasTelemetryChange={propagateOnHasTelemetryChange}
                  deviceConfiguration={deviceConfiguration}
                  variantOptions={variantOptions || []}
                />

                <Row xs="auto" className="float-end">
                  <Col>
                    <div className="button-list">
                      <Button
                        variant="outline"
                        className="btn btn-ghost"
                        onClick={navigateToDeviceList}>
                        <i className="bx bx-x" /> Cancel
                      </Button>

                      <Button
                        type="submit"
                        variant="secondary"
                        className="btn btn-secondary"
                        disabled={submitted}>
                        <i className="bx bx-save" /> Save
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default EditDevice;
