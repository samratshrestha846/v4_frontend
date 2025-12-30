import React from 'react';
import { Alert, Button, Col, Form, Row } from 'react-bootstrap';
import CustomLoader from '../../components/CustomLoader';
import ErrorMessage from '../../components/ErrorMessage';
import EditAreaAndFertilizerForm from './forms/EditAreaAndFertilizerForm';
import useUpdateAreaAndFertilizer from './hooks/useUpdateAreaAndFertilizer';

type Props = {
  toggleModal?: () => void;
  refetch?: () => void;
  sessionSummaryId?: number;
};

const EditAreaAndFertilizer: React.FC<Props> = ({
  toggleModal,
  refetch: refetchSessionSummaries,
  sessionSummaryId,
}) => {
  const {
    control,
    errors,
    onSubmit,
    handleSubmit,
    serverValidationError,
    setServerValidationError,
    submitted,
    paddockOptions,
    isFetchingPaddockOptions,
    isErrorPaddockOptions,
    blockOptions,
    isFetchingBlockOptions,
    isErrorBlockOptions,
    subBlockOptions,
    isFetchingSubBlockOptions,
    isErrorSubBlockOptions,
    propagateOnPropertyChange,
    propagateOnPaddockChange,
    propagateOnBlockChange,
    sessionSummary,
    isFetching,
    isError,
    propertyOptions,
    isFetchingPropertyOptions,
    isErrorPropertyOptions,
    fertilizerOptions,
    isFetchingFertilizerOptions,
    isErrorFertilizerOptions,
  } = useUpdateAreaAndFertilizer({
    refetchSessionSummaries,
    toggleModal,
    id: sessionSummaryId,
  });

  if (isFetchingPropertyOptions || isFetchingFertilizerOptions || isFetching) {
    return <CustomLoader />;
  }

  if (
    isErrorPropertyOptions ||
    isErrorFertilizerOptions ||
    isError ||
    isErrorPaddockOptions ||
    isErrorBlockOptions ||
    isErrorSubBlockOptions
  ) {
    return <ErrorMessage />;
  }

  return (
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

        {(isFetchingPaddockOptions ||
          isFetchingBlockOptions ||
          isFetchingSubBlockOptions) && <CustomLoader />}

        <Form onSubmit={handleSubmit(onSubmit)}>
          {sessionSummary && (
            <EditAreaAndFertilizerForm
              control={control}
              errors={errors}
              propertyOptions={propertyOptions}
              paddockOptions={paddockOptions}
              blockOptions={blockOptions}
              subBlockOptions={subBlockOptions}
              fertilizerOptions={fertilizerOptions}
              propagateOnPropertyChange={propagateOnPropertyChange}
              propagateOnPaddockChange={propagateOnPaddockChange}
              propagateOnBlockChange={propagateOnBlockChange}
              sessionSummary={sessionSummary}
            />
          )}

          <Row xs="auto" className="float-end">
            <Col>
              <div className="button-list">
                <Button
                  variant="outline"
                  className="btn btn-ghost"
                  onClick={toggleModal}>
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
      </Col>
    </Row>
  );
};

export default EditAreaAndFertilizer;
