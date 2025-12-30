/* eslint-disable no-unused-vars */
import React, { Dispatch, SetStateAction } from 'react';
import { Form, Alert, Button, Col, Modal, Row } from 'react-bootstrap';
import {
  Control,
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form';

import SiteDeviceStatusForm from './forms/SiteDeviceStatusForm';
import { SiteStatusFormFields } from '../../../types/siteStatus';
import {
  DOSER_ACTION_LABEL_STOP,
  DOSER_ACTION_LABEL_START,
} from '../../../constants/constants';
import CustomModalHeader from '../../../components/modal/CustomModalHeader';

type ConfirmModalProps = {
  register: UseFormRegister<SiteStatusFormFields>;
  control: Control<SiteStatusFormFields>;
  errors: FieldErrors<SiteStatusFormFields>;
  showModal: boolean;
  toggleModal: () => void;
  doserStatus: boolean;
  handleCancel: () => void;
  submitted: boolean;
  serverValidationError: boolean;
  setServerValidationError: Dispatch<SetStateAction<boolean>>;
  handleSubmit: UseFormHandleSubmit<SiteStatusFormFields, undefined>;
  onSubmit: (formData: SiteStatusFormFields) => Promise<void>;
};

const SiteStartStopModal: React.FC<ConfirmModalProps> = ({
  register,
  control,
  errors,
  showModal,
  toggleModal,
  doserStatus,
  handleCancel,
  submitted,
  serverValidationError,
  setServerValidationError,
  handleSubmit,
  onSubmit,
}) => {
  return (
    <Modal
      show={showModal}
      onHide={toggleModal}
      backdrop="static"
      dialogClassName="custom-modal">
      <Modal.Header>
        <CustomModalHeader
          handleModalClose={toggleModal}
          title={
            doserStatus
              ? `${DOSER_ACTION_LABEL_START} uDOSE`
              : `${DOSER_ACTION_LABEL_STOP} uDOSE`
          }
        />
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {serverValidationError && (
            <Alert
              variant="danger"
              onClose={() => setServerValidationError(false)}
              dismissible>
              <strong>Validation Failed - </strong> Please fix validation errors
              and try again
            </Alert>
          )}

          <Row>
            <Col>
              <p className="fw-semibold text-secondary-color">
                {`Do you want to ${doserStatus ? DOSER_ACTION_LABEL_START.toLowerCase() : DOSER_ACTION_LABEL_STOP.toLowerCase()} uDOSE device ?`}
              </p>
            </Col>
          </Row>

          {!doserStatus && (
            <SiteDeviceStatusForm
              register={register}
              control={control}
              errors={errors}
            />
          )}

          <Row>
            <Col>
              <p className="text-muted">
                Note: This will take 2-5 mins to update in the website
              </p>
            </Col>
          </Row>

          <Row xs="auto" className="float-end">
            <Col>
              <div className="button-list">
                <Button
                  variant="outline"
                  className="btn btn-ghost"
                  onClick={handleCancel}>
                  <i className="bx bx-x " /> Cancel
                </Button>

                <Button
                  variant="secondary"
                  type="submit"
                  className="btn btn-secondary"
                  disabled={submitted}>
                  <i className="bx bx-send" />
                  {doserStatus
                    ? DOSER_ACTION_LABEL_START
                    : DOSER_ACTION_LABEL_STOP}
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default SiteStartStopModal;
