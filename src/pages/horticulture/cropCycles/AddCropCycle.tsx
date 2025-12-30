import React from 'react';
import { Alert, Button, Card, Col, Form, Row } from 'react-bootstrap';
import { CROP_CYCLE_LIST, CROP_CYCLE_ADD } from '../../../constants/path';
import PageTitle from '../../../components/PageTitle';
import AddCropCycleForm from './forms/AddCropCycleForm';
import useCreateCropCycle from './hooks/useCreateCropCycle';
import useCropsDropdown from '../../../hooks/dropdown/useCropsDropdown';
import CustomLoader from '../../../components/CustomLoader';
import ErrorMessage from '../../../components/ErrorMessage';

const AddCropCycle: React.FC = () => {
  const {
    register,
    control,
    errors,
    onSubmit,
    handleSubmit,
    serverValidationError,
    setServerValidationError,
    navigateToCropCycleList,
    submitted,
  } = useCreateCropCycle();

  const {
    data: cropsOption,
    isFetching: isFetchingCrops,
    isError: isErrorCrops,
  } = useCropsDropdown();

  if (isFetchingCrops) {
    return <CustomLoader />;
  }

  if (isErrorCrops) {
    return <ErrorMessage />;
  }

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          {
            label: 'Crop Cycle List',
            path: CROP_CYCLE_LIST,
          },
          {
            label: 'Add Crop Cycle',
            path: CROP_CYCLE_ADD,
            active: true,
          },
        ]}
        title="Add Crop Cycle"
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
                <AddCropCycleForm
                  control={control}
                  errors={errors}
                  register={register}
                  cropsOption={cropsOption ?? []}
                />
                <Row xs="auto" className="float-end mt-2">
                  <Col>
                    <div className="button-list">
                      <Button
                        variant="outline"
                        className="btn btn-ghost"
                        onClick={navigateToCropCycleList}>
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

export default AddCropCycle;
