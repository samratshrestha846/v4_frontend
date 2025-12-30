import React from 'react';
import { Form, Button, Row, Col, Alert, Card } from 'react-bootstrap';
import PageTitle from '../../components/PageTitle';
import CustomLoader from '../../components/CustomLoader';
import useUpdateDeviceStockType from './hooks/useUpdateDeviceStockType';
import DeviceStockTypeForm from './forms/DeviceStockTypeForm';
import useStockTypesDropdown from '../../hooks/dropdown/useStocktypesDropdown';

const EditStockTypeDevice: React.FC = () => {
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
  } = useUpdateDeviceStockType();

  const { data: stockTypesOptions, isFetching: isFetchingStockTypesOptions } =
    useStockTypesDropdown();

  if (isFetchingDeviceData || isFetchingStockTypesOptions)
    return <CustomLoader />;

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          {
            label: 'Devices',
            path: '/devices/list',
          },
          {
            label: 'Edit Stock Type',
            path: `/devices/edit-stock-type/:${deviceData?.id}`,
            active: true,
          },
        ]}
        title="Edit Stock Type"
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
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <DeviceStockTypeForm
                  control={control}
                  register={register}
                  errors={errors}
                  deviceData={deviceData}
                  stockTypesOptions={stockTypesOptions}
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

export default EditStockTypeDevice;
