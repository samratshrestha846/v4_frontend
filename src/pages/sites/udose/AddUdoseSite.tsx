import React from 'react';
import { Form, Row, Col, Alert, Button, Card } from 'react-bootstrap';
import PageTitle from '../../../components/PageTitle';
import CustomLoader from '../../../components/CustomLoader';
import useCreditTypesDropdown from '../../../hooks/dropdown/useCreditTypesDropdown';
import usePropertiesDropdown from '../../../hooks/dropdown/usePropertiesDropdown';
import useDevicesDropdown from '../../../hooks/dropdown/useDevicesDropdown';
import useCreateUdoseSite from './hooks/useCreateUdoseSite';
import UdoseAddForm from './forms/UdoseAddForm';
import BusinessInfoAddForm from './forms/BusinessInfoAddForm';
import { DEVICE_CONFIGURATION_TYPE_UDOSE } from '../../../constants/constants';
import { UDOSE_ADD, UDOSE_SITE_LIST } from '../../../constants/path';
import Loader from '../../../components/Loader';
import ErrorMessage from '../../../components/ErrorMessage';
import UdoseSiteSettingForm from './forms/UdoseSiteSettingForm';

const AddUdoseSite: React.FC = () => {
  const {
    register,
    control,
    errors,
    handleSubmit,
    onSubmit,
    serverValidationError,
    setServerValidationError,
    navigateToUdoseSiteList,
    propagateOnChange,
    showCustomerRegion,
    customer,
    region,
    configurationSettings,
    isErrorConfigurationSettings,
    isFetchingConfigurationSettings,
    isFetchingProperty,
    fields,
  } = useCreateUdoseSite();

  const {
    data: devicesOptions,
    isFetching: isFetchingDevicesOptions,
    isError: isErrorDevicesOptions,
  } = useDevicesDropdown({
    action: 'form',
    device_type: DEVICE_CONFIGURATION_TYPE_UDOSE,
  });

  const {
    data: serviceTypesOptions,
    isFetching: isFetchingServiceTypesOptions,
    isError: isErrorServiceTypesOptions,
  } = useCreditTypesDropdown();

  const {
    data: propertiesOptions,
    isFetching: isFetchingPropertiesOptions,
    isError: isErrorPropertiesOptions,
  } = usePropertiesDropdown();

  if (
    isFetchingDevicesOptions ||
    isFetchingServiceTypesOptions ||
    isFetchingPropertiesOptions ||
    isFetchingConfigurationSettings
  ) {
    return <CustomLoader />;
  }

  if (
    isErrorConfigurationSettings ||
    isErrorDevicesOptions ||
    isErrorServiceTypesOptions ||
    isErrorPropertiesOptions
  ) {
    return <ErrorMessage />;
  }

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          {
            label: 'uDose Sites',
            path: UDOSE_SITE_LIST,
          },
          {
            label: 'Add uDose Site',
            path: UDOSE_ADD,
            active: true,
          },
        ]}
        title="Add New uDose Site"
      />

      {isFetchingProperty && <Loader />}

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

          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <UdoseAddForm
                  control={control}
                  register={register}
                  errors={errors}
                  devicesOptions={devicesOptions}
                  serviceTypesOptions={serviceTypesOptions}
                />
                <BusinessInfoAddForm
                  control={control}
                  errors={errors}
                  propertyOptions={propertiesOptions}
                  customer={customer}
                  region={region}
                  propagateOnChange={propagateOnChange}
                  showCustomerRegion={showCustomerRegion}
                />

                <UdoseSiteSettingForm
                  control={control}
                  register={register}
                  errors={errors}
                  configurationSettings={configurationSettings ?? []}
                  siteSettings={undefined}
                  fields={fields}
                />
                <Row xs="auto" className="float-end">
                  <Col>
                    <div className="button-list">
                      <Button
                        variant="outline"
                        className="btn btn-ghost"
                        onClick={navigateToUdoseSiteList}>
                        <i className="bx bx-x " /> Cancel
                      </Button>

                      <Button
                        variant="secondary"
                        type="submit"
                        className="btn btn-secondary">
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

export default AddUdoseSite;
