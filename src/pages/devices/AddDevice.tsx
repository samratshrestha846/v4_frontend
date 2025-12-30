import React from 'react';
import { Form, Row, Col, Alert, Button, Card } from 'react-bootstrap';
import PageTitle from '../../components/PageTitle';
import CustomLoader from '../../components/CustomLoader';
import useCreateDevice from './hooks/useCreateDevice';
import useDeviceConfigurationsDropdown from '../../hooks/dropdown/useDeviceConfigurationsDropdown';
import useTagsDropdown from '../../hooks/dropdown/useTagsDropdown';
import DeviceFormAdd from './forms/DeviceFormAdd';
import Loader from '../../components/Loader';
import ErrorMessage from '../../components/ErrorMessage';

const AddDevice: React.FC = () => {
  const {
    register,
    control,
    errors,
    handleSubmit,
    onSubmit,
    serverValidationError,
    setServerValidationError,
    navigateToDeviceList,
    propagateOnDeviceConfigurationChange,
    propagateOnHasTelemetryChange,
    deviceConfiguration,
    hasTelemetry,
    submitted,
    variantOptions,
    isFetchingVariantOptions,
    isErrorVariantOptions,
  } = useCreateDevice();

  const {
    data: configurationsOptions,
    isFetching: isFetchingConfigurations,
    isError: isErrorConfigurations,
  } = useDeviceConfigurationsDropdown();

  const {
    data: tagsOptions,
    isFetching: isFetchingTagsOptions,
    isError: isErrorTagsOptions,
  } = useTagsDropdown();

  if (isFetchingConfigurations || isFetchingTagsOptions) {
    return <CustomLoader />;
  }

  if (isErrorConfigurations || isErrorTagsOptions || isErrorVariantOptions) {
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
            label: 'Add Device',
            path: '/devices/add',
            active: true,
          },
        ]}
        title="Add Device"
      />
      <Row>
        <Col md={12} xs={12}>
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
                <DeviceFormAdd
                  control={control}
                  register={register}
                  errors={errors}
                  configurationsOptions={configurationsOptions}
                  tagsOptions={tagsOptions}
                  deviceConfiguration={deviceConfiguration}
                  hasTelemetry={hasTelemetry}
                  propagateOnDeviceConfigurationChange={
                    propagateOnDeviceConfigurationChange
                  }
                  propagateOnHasTelemetryChange={propagateOnHasTelemetryChange}
                  variantOptions={variantOptions || []}
                />
                <Row xs="auto" className="float-end">
                  <Col>
                    <div className="button-list">
                      <Button
                        variant="outline"
                        className="btn btn-ghost"
                        onClick={navigateToDeviceList}>
                        <i className="bx bx-x " /> Cancel
                      </Button>

                      <Button
                        variant="secondary"
                        type="submit"
                        className="btn btn-secondary"
                        disabled={submitted}>
                        <i className="bx bx-save " /> Save
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

export default AddDevice;
