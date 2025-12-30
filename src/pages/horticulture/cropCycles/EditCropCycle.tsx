import React from 'react';
import { Alert, Button, Card, Col, Form, Row } from 'react-bootstrap';
import CustomLoader from '../../../components/CustomLoader';
import ErrorMessage from '../../../components/ErrorMessage';
import PageTitle from '../../../components/PageTitle';
import { CROP_CYCLE_LIST } from '../../../constants/path';
import useUpdateCropCycle from './hooks/useUpdateCropCycle';
import EditCropCycleForm from './forms/EditCropCycleForm';
import useCropsDropdown from '../../../hooks/dropdown/useCropsDropdown';

const EditCropCycle: React.FC = () => {
  const {
    register,
    control,
    errors,
    handleSubmit,
    onSubmit,
    serverValidationError,
    setServerValidationError,
    navigateToCropCycleList,
    submitted,
    isError,
    isFetching,
    cropCycleDetail,
  } = useUpdateCropCycle();

  const {
    data: cropsOption,
    isFetching: isFetchingCrops,
    isError: isErrorCrops,
  } = useCropsDropdown();

  if (isFetching || isFetchingCrops) {
    return <CustomLoader />;
  }

  if (isError || isErrorCrops) {
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
            label: 'Edit Crop Cycle',
            path: '',
            active: true,
          },
        ]}
        title="Edit Crop Cycle"
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
                <EditCropCycleForm
                  control={control}
                  errors={errors}
                  register={register}
                  cropsOption={cropsOption ?? []}
                  cropCycleDetail={cropCycleDetail}
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

export default EditCropCycle;
