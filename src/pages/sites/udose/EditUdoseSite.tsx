import React from 'react';
import { Form, Row, Col, Alert, Button, Card } from 'react-bootstrap';
import PageTitle from '../../../components/PageTitle';
import CustomLoader from '../../../components/CustomLoader';
import { STATUS_TEST_SITE } from '../../../constants/constants';
import useUpdateUdoseSite from './hooks/useUpdateUdoseSite';
import BusinessInfoEditForm from './forms/BusinessInfoEditForm';
import UdoseEditForm from './forms/UdoseEditForm';
import UdoseSiteSettingForm from './forms/UdoseSiteSettingForm';
import { prepareDynamicUrl } from '../../../helpers';
import {
  TEST_SITE_LIST,
  UDOSE_EDIT,
  UDOSE_SITE_LIST,
} from '../../../constants/path';
import Loader from '../../../components/Loader';

const EditUdoseSite: React.FC = () => {
  const {
    register,
    control,
    errors,
    handleSubmit,
    onSubmit,
    serverValidationError,
    setServerValidationError,
    navigateToUdoseSiteList,
    navigateToTestSiteList,
    propagateOnChange,
    showCustomerRegion,
    customer,
    region,
    configurationSettings,
    isFetchingConfigurationSettings,
    udoseData,
    isFetchingUdoseData,
    propertiesOptions,
    isFetchingPropertiesOptions,
    devicesOptions,
    isFetchingDevicesOptions,
    serviceTypesOptions,
    isFetchingServiceTypesOptions,
    isFetchingProperty,
    fields,
  } = useUpdateUdoseSite();

  if (
    isFetchingUdoseData ||
    isFetchingDevicesOptions ||
    isFetchingServiceTypesOptions ||
    isFetchingPropertiesOptions ||
    isFetchingConfigurationSettings
  ) {
    return <CustomLoader />;
  }

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          {
            label: 'uDose Sites',
            path:
              udoseData?.status === STATUS_TEST_SITE
                ? TEST_SITE_LIST
                : UDOSE_SITE_LIST,
          },
          {
            label: 'Edit uDose Site',
            path: prepareDynamicUrl(UDOSE_EDIT, udoseData?.id),
            active: true,
          },
        ]}
        title="Edit uDose Site"
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
                <UdoseEditForm
                  control={control}
                  register={register}
                  errors={errors}
                  devicesOptions={devicesOptions}
                  serviceTypesOptions={serviceTypesOptions}
                  udoseData={udoseData}
                />
                <BusinessInfoEditForm
                  control={control}
                  errors={errors}
                  propertyOptions={propertiesOptions}
                  customer={customer}
                  region={region}
                  propagateOnChange={propagateOnChange}
                  showCustomerRegion={showCustomerRegion}
                  udoseData={udoseData}
                />

                <UdoseSiteSettingForm
                  control={control}
                  register={register}
                  errors={errors}
                  configurationSettings={configurationSettings}
                  siteSettings={udoseData?.site_settings}
                  fields={fields}
                />
                <Row xs="auto" className="float-end">
                  <Col>
                    <div className="button-list">
                      <Button
                        variant="outline"
                        className="btn btn-ghost"
                        onClick={
                          udoseData?.status === STATUS_TEST_SITE
                            ? navigateToTestSiteList
                            : navigateToUdoseSiteList
                        }>
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

export default EditUdoseSite;
