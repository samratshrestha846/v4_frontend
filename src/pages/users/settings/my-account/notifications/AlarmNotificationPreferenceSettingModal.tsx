import CustomModalHeader from '@uhub/components/modal/CustomModalHeader';
import React from 'react';
import { Button, Modal } from 'react-bootstrap';

type Props = {
  via: string;
  showModal: boolean;
  toggleModal: () => void;
  handleSave: () => void;
  status: boolean;
};

const AlarmNotificationPreferenceSettingModal: React.FC<Props> = ({
  via,
  showModal,
  toggleModal,
  handleSave,
  status,
}) => {
  return (
    <Modal
      show={showModal}
      onHide={toggleModal}
      backdrop="static"
      keyboard={false}
      dialogClassName="custom-modal">
      <Modal.Header>
        <CustomModalHeader
          title="Notification Settings"
          handleModalClose={toggleModal}
        />
      </Modal.Header>
      <Modal.Body>
        {status ? (
          <p className="fw-semibold">
            Are you sure you want to receive alarm notification via {via} ?
          </p>
        ) : (
          <p className="fw-semibold">
            {`Are you sure you don't want to receive alarm notification via ${via} ?`}
          </p>
        )}

        <div className="button-list float-end">
          <Button
            variant="outline"
            className="btn btn-ghost"
            onClick={toggleModal}>
            <i className="bx bx-x me-1" />
            <span>Cancel</span>
          </Button>
          <Button
            variant="secondary"
            className="btn btn-secondary"
            onClick={handleSave}>
            <i className="bx bx-save me-1" />
            <span>Save</span>
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AlarmNotificationPreferenceSettingModal;
