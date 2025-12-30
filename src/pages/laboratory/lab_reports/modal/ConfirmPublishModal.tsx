import React, { Dispatch, SetStateAction } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { LAB_REPORT_PUBLISHED } from '../../../../constants/labConstants';
import CustomModalHeader from '../../../../components/modal/CustomModalHeader';

type Props = {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  status?: string;
  handleCancel: () => void;
  handleSubmit: () => void;
};

const ConfirmPublishModal: React.FC<Props> = ({
  showModal,
  setShowModal,
  status,
  handleCancel,
  handleSubmit,
}) => {
  return (
    <Modal
      show={showModal}
      onHide={() => setShowModal(false)}
      backdrop="static"
      dialogClassName="custom-modal">
      <Modal.Header>
        <CustomModalHeader
          title={`${status === LAB_REPORT_PUBLISHED ? 'Publish' : 'Unpublish'} Lab Report`}
          handleModalClose={() => setShowModal(false)}
        />
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex align-item-center">
          <span className="flex-grow-1">
            <p className="fw-semibold text-secondary-color">
              Are you sure, you want to{' '}
              {status === LAB_REPORT_PUBLISHED ? 'Publish' : 'Unpublish'} Lab
              Report ?
            </p>
          </span>
        </div>
        <div className="button-list float-end">
          <Button
            variant="outline"
            className="btn btn-ghost"
            onClick={handleCancel}>
            <i className="bx bx-x me-1" />
            Cancel
          </Button>
          <Button
            variant="secondary"
            className="btn btn-secondary"
            onClick={handleSubmit}>
            <i className="bx bx-save me-1" />
            Save
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ConfirmPublishModal;
