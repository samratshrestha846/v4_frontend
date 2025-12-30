import React from 'react';
import { Alert, Button, Col, Form, Row } from 'react-bootstrap';
import AssignAreaAndFertilizerForm from './forms/AssignAreaAndFertilizerForm';
import useAssignAreaAndFertilizer from './hooks/useAssignAreaAndFertilizer';
import usePropertiesDropdown from '../../hooks/dropdown/usePropertiesDropdown';
import CustomLoader from '../../components/CustomLoader';
import ErrorMessage from '../../components/ErrorMessage';
import useFertilizersDropdown from '../../hooks/dropdown/useFertilizersDropdown';

type Props = {
  toggleModal?: () => void;
  refetch?: () => void;
  sessionSummaryId?: number;
};

const AssignAreaAndFertilizer: React.FC<Props> = ({
  toggleModal,
  refetch: refetchSessionSummaries,
  sessionSummaryId,
}) => {
  const {
    data: propertyOptions,
    isFetching: isFetchingPropertyOptions,
    isError: isErrorPropertyOptions,
  } = usePropertiesDropdown();

  const {
    data: fertilizerOptions,
    isFetching: isFetchingFertilizerOptions,
    isError: isErrorFertilizerOptions,
  } = useFertilizersDropdown();

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
  } = useAssignAreaAndFertilizer({
    refetchSessionSummaries,
    toggleModal,
    id: sessionSummaryId,
  });

  if (isFetchingPropertyOptions || isFetchingFertilizerOptions) {
    return <CustomLoader />;
  }

  if (
    isErrorPropertyOptions ||
    isErrorFertilizerOptions ||
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
          <AssignAreaAndFertilizerForm
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
          />
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

export default AssignAreaAndFertilizer;
