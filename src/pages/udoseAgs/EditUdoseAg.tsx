import React from 'react';
import { Form, Row, Col, Alert, Button, Card } from 'react-bootstrap';
import PageTitle from '../../components/PageTitle';
import CustomLoader from '../../components/CustomLoader';
import useDevicesDropdown from '../../hooks/dropdown/useDevicesDropdown';
import { DEVICE_CONFIGURATION_TYPE_UDOSE_AG } from '../../constants/constants';
import { UDOSE_AG_ADD, UDOSE_AG_LIST } from '../../constants/path';
import useCustomersDropdown from '../../hooks/dropdown/useCustomersDropdown';
import useUpdateUdoseAg from './hooks/useUpdateUdoseAg';
import EditUdoseAgForm from './forms/EditUdoseAgForm';

const EditUdoseAg: React.FC = () => {
  const {
    register,
    control,
    errors,
    handleSubmit,
    onSubmit,
    serverValidationError,
    setServerValidationError,
    navigateToUdoseAgList,
    submitted,
    udoseAgDetail,
    isError,
    isFetching,
  } = useUpdateUdoseAg();

  const {
    data: devicesOptions,
    isFetching: isFetchingDevicesOptions,
    isError: isErrorDevicesOptions,
  } = useDevicesDropdown({
    action: 'form',
    device_type: DEVICE_CONFIGURATION_TYPE_UDOSE_AG,
    isDependentQuery: true,
    deviceId: udoseAgDetail?.device?.id,
    status: udoseAgDetail?.status ? 1 : 0,
    isDependencyFetched: !!udoseAgDetail,
  });

  const {
    customersDropdown: customersOptions,
    isFetchingCustomersDropdown: isFetchingCustomersOptions,
    isErrorCustomersDropdown: isErrorCustomersOptions,
  } = useCustomersDropdown();

  if (isFetching || isFetchingDevicesOptions || isFetchingCustomersOptions) {
    return <CustomLoader />;
  }

  if (isError || isErrorCustomersOptions || isErrorDevicesOptions) {
    return <CustomLoader />;
  }

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          {
            label: 'uDose Ags',
            path: UDOSE_AG_LIST,
          },
          {
            label: 'Edit uDose Ag',
            path: UDOSE_AG_ADD,
            active: true,
          },
        ]}
        title="Edit uDose Ag"
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
                <EditUdoseAgForm
                  control={control}
                  errors={errors}
                  register={register}
                  customersOptions={customersOptions}
                  devicesOptions={devicesOptions}
                  udoseAgDetail={udoseAgDetail}
                />

                <Row xs="auto" className="float-end">
                  <Col>
                    <div className="button-list mt-2">
                      <Button
                        variant="outline"
                        className="btn btn-ghost"
                        onClick={navigateToUdoseAgList}>
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

export default EditUdoseAg;
