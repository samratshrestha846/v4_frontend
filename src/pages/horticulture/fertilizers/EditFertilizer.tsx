import React from 'react';
import { Form, Alert, Row, Col, Button, Card } from 'react-bootstrap';
import PageTitle from '../../../components/PageTitle';
import { FERTILIZER_EDIT, FERTILIZER_LIST } from '../../../constants/path';
import useUpdateFertilizer from './hooks/useUpdateFertilizer';
import CustomLoader from '../../../components/CustomLoader';
import ErrorMessage from '../../../components/ErrorMessage';
import { prepareDynamicUrl } from '../../../helpers';
import FertilizerEditForm from './forms/FertilizerEditForm';

const EditFertilizer: React.FC = () => {
  const {
    register,
    control,
    errors,
    handleSubmit,
    onSubmit,
    serverValidationError,
    setServerValidationError,
    submitted,
    navigateToFertilizerList,
    fertilizerDetail,
    isFetchingFertilizerDetail,
    isErrorFertilizerDetail,
  } = useUpdateFertilizer();

  if (isFetchingFertilizerDetail) return <CustomLoader />;

  if (isErrorFertilizerDetail) return <ErrorMessage />;

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: 'Fertilizers', path: FERTILIZER_LIST, active: false },
          {
            label: `${fertilizerDetail?.name || 'Fertilizer Name'}`,
            path: prepareDynamicUrl(FERTILIZER_EDIT, fertilizerDetail?.id),
            active: true,
          },
        ]}
        title="Edit Fertilizer"
      />

      {serverValidationError && (
        <Alert
          variant="danger"
          onClose={() => setServerValidationError(false)}
          dismissible>
          <strong>Validation Failed - </strong> Please fix validation errors and
          try again
        </Alert>
      )}

      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FertilizerEditForm
              register={register}
              control={control}
              errors={errors}
              fertilizerDetail={fertilizerDetail}
            />

            <Row>
              <Col>
                <div className="float-end button-list">
                  <Button
                    className="btn btn-ghost"
                    variant="outline"
                    onClick={navigateToFertilizerList}>
                    <i className="bx bx-x me-1" />
                    Cancel
                  </Button>
                  <Button
                    variant="secondary"
                    className="btn btn-secondary"
                    type="submit"
                    disabled={submitted}>
                    <i className="bx bx-save me-1" />
                    Save
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default EditFertilizer;
