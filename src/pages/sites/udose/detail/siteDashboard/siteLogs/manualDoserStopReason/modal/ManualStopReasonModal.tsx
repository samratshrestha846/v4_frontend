import React from 'react';
import { Modal } from 'react-bootstrap';
import CreateManualDoserStopReason from '../CreateManualDoserStopReason';

type Props = {
  siteId: number;
  showModal: boolean;
  toggleModal: () => void;
  refetch: any;
};

const ManualStopReasonModal: React.FC<Props> = ({
  siteId,
  showModal,
  toggleModal,
  refetch,
}) => {
  return (
    <Modal
      show={showModal}
      onHide={toggleModal}
      backdrop="static"
      keyboard={false}
      contentClassName="custom-modal">
      <Modal.Body className="p-3">
        <CreateManualDoserStopReason
          siteId={siteId}
          toggleModal={toggleModal}
          refetch={refetch}
        />
      </Modal.Body>
    </Modal>
  );
};

export default ManualStopReasonModal;
