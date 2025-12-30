import React from 'react';
import { Form, Row, Col, Button, Card } from 'react-bootstrap';
import PageTitle from '../../../components/PageTitle';
import CustomLoader from '../../../components/CustomLoader';
import useCreditTypesDropdown from '../../../hooks/dropdown/useCreditTypesDropdown';
import usePropertiesDropdown from '../../../hooks/dropdown/usePropertiesDropdown';
import useDevicesDropdown from '../../../hooks/dropdown/useDevicesDropdown';
import { DEVICE_CONFIGURATION_TYPE_UBOT } from '../../../constants/constants';
import { UBOT_ADD, UBOT_LIST } from '../../../constants/path';
import useCreateUbotSite from './hooks/useCreateUbotSite';
import UbotAddForm from './forms/UbotAddForm';
import UbotBusinessInfoAddForm from './forms/UbotBusinessInfoAddForm';
import UbotTankSettingAddForm from './forms/UbotTankSettingAddForm';
import ErrorMessage from '../../../components/ErrorMessage';
import BackendValidationMessage from '../../../components/BackendValidationMessage';
import Loader from '../../../components/Loader';

const AddUbotSite: React.FC = () => {
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
    isFetchingProperty,
  } = useCreateUbotSite();

  const {
    data: devicesOptions,
    isFetching: isFetchingDevicesOptions,
    isError: isErrorDevicesOptions,
  } = useDevicesDropdown({
    action: 'form',
    device_type: DEVICE_CONFIGURATION_TYPE_UBOT,
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
    isErrorDevicesOptions ||
    isErrorServiceTypesOptions ||
    isErrorPropertiesOptions
  ) {
    return <ErrorMessage />;
  }

  if (
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
            label: 'Add uBot Site',
            path: UBOT_ADD,
            active: true,
          },
        ]}
        title="Add New uBot Site"
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
                <UbotAddForm
                  control={control}
                  register={register}
                  errors={errors}
                  devicesOptions={devicesOptions}
                  serviceTypesOptions={serviceTypesOptions}
                />
                <UbotBusinessInfoAddForm
                  control={control}
                  errors={errors}
                  propertyOptions={propertiesOptions}
                  customer={customer}
                  region={region}
                  propagateOnChange={propagateOnChange}
                  showCustomerRegion={showCustomerRegion}
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

export default AddUbotSite;
