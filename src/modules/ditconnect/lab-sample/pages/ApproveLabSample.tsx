import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import CustomDatePicker from '@uhub/components/CustomDatePicker';
import BackendValidationMessage from '@uhub/components/BackendValidationMessage';
import { LabSampleResponse } from '../types/LabSample';
import useApproveLabSample from '../hooks/useApproveLabSample';

type Props = {
  labSample: LabSampleResponse;
  toggleModal: () => void;
};

const ApproveLabSample: React.FC<Props> = ({ labSample, toggleModal }) => {
  const {
    control,
    errors,
    handleSubmit,
    serverValidationError,
    setServerValidationError,
    submitted,
    onSubmit,
  } = useApproveLabSample({
    sampleId: labSample?.id,
    toggleModal,
  });

  return (
    <>
      <div className="d-flex align-items-center gap-1">
        <p className="fw-semibold text-secondary-color">
          Are you sure you want to approve{' '}
          <span className="fst-italic">
            Lab Sample - {labSample?.sample_id}
          </span>{' '}
          ?
        </p>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {serverValidationError && (
          <BackendValidationMessage
            setServerValidationError={setServerValidationError}
          />
        )}

        <Row>
          <Col>
            <div className="mb-2">
              <CustomDatePicker
                dateFormat="dd/MM/yyyy hh:mm aa"
                label="Received At"
                name="received_datetime"
                control={control}
                errors={errors}
                defaultSelected={undefined}
                maxDate={new Date()}
                showTimeSelect
                placeholder="DD/MM/YYYY AM/PM"
              />
            </div>
          </Col>
        </Row>
        <div className="button-list float-end mt-2">
          <Button
            variant="outline"
            className="btn btn-ghost"
            onClick={toggleModal}>
            <i className="bx bx-x me-1" />
            Cancel
          </Button>
          <Button
            variant="secondary"
            className="btn btn-primary"
            type="submit"
            disabled={submitted}>
            <i className="bx bx-check me-1" />
            Approve
          </Button>
        </div>
      </Form>
    </>
  );
};

export default ApproveLabSample;
