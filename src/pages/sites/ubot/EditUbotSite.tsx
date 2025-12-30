import React from 'react';
import { Form, Row, Col, Button, Card } from 'react-bootstrap';
import PageTitle from '../../../components/PageTitle';
import CustomLoader from '../../../components/CustomLoader';
import { UBOT_EDIT, UBOT_LIST } from '../../../constants/path';
import UbotTankSettingAddForm from './forms/UbotTankSettingAddForm';
import useUpdateUbotSite from './hooks/useUpdateUbotSite';
import ErrorMessage from '../../../components/ErrorMessage';
import { prepareDynamicUrl } from '../../../helpers';
import UbotEditForm from './forms/UbotEditForm';
import UbotBusinessInfoEditForm from './forms/UbotBusinessInfoEditForm';
import Loader from '../../../components/Loader';
import BackendValidationMessage from '../../../components/BackendValidationMessage';

const EditUbotSite: React.FC = () => {
  const {
    register,
    control,
    errors,
    handleSubmit,
    onSubmit,
    serverValidationError,
    setServerValidationError,
    navigateToUbotSiteList,
    propagateOnChange,
    showCustomerRegion,
    customer,
    region,
    ubotData,
    isFetchingUbotData,
    isErrorUbotData,
    propertiesOptions,
    isFetchingPropertiesOptions,
    isErrorPropertiesOptions,
    devicesOptions,
    isFetchingDevicesOptions,
    isErrorDevicesOptions,
    serviceTypesOptions,
    isFetchingServiceTypesOptions,
    isErrorServiceTypesOptions,
    isFetchingProperty,
  } = useUpdateUbotSite();

  if (
    isErrorUbotData ||
    isErrorDevicesOptions ||
    isErrorServiceTypesOptions ||
    isErrorPropertiesOptions
  ) {
    return <ErrorMessage />;
  }

  if (
    isFetchingUbotData ||
    isFetchingDevicesOptions ||
    isFetchingServiceTypesOptions ||
    isFetchingPropertiesOptions
  ) {
    return <CustomLoader />;
  }

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          {
            label: 'uBot Sites',
            path: UBOT_LIST,
          },
          {
            label: 'Edit uBot Site',
            path: prepareDynamicUrl(UBOT_EDIT, ubotData?.id),
            active: true,
          },
        ]}
        title="Edit uBot Site"
      />

      {isFetchingProperty && <Loader />}
      <Row>
        <Col md={12} xs={12}>
          {serverValidationError && (
            <BackendValidationMessage
              setServerValidationError={setServerValidationError}
            />
          )}

          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <UbotEditForm
                  control={control}
                  register={register}
                  errors={errors}
                  devicesOptions={devicesOptions}
                  serviceTypesOptions={serviceTypesOptions}
                  ubotData={ubotData}
                />
                <UbotBusinessInfoEditForm
                  errors={errors}
                  control={control}
                  propertyOptions={propertiesOptions}
                  customer={customer}
                  region={region}
                  propagateOnChange={propagateOnChange}
                  showCustomerRegion={showCustomerRegion}
                  ubotData={ubotData}
                />
                <UbotTankSettingAddForm
                  control={control}
                  register={register}
                  errors={errors}
                />
                <Row xs="auto" className="float-end">
                  <Col>
                    <div className="button-list">
                      <Button
                        variant="outline"
                        className="btn btn-ghost"
                        onClick={navigateToUbotSiteList}>
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

export default EditUbotSite;
