import React from 'react';
import { Modal } from 'react-bootstrap';
import CreateSiteNote from '../CreateSiteNote';

type Props = {
  siteId: number;
  showModal: boolean;
  toggleModal: () => void;
  refetch: any;
};

const CreateSiteNoteModal: React.FC<Props> = ({
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
        <CreateSiteNote
          toggleModal={toggleModal}
          siteId={siteId}
          refetch={refetch}
        />
      </Modal.Body>
    </Modal>
  );
};

export default CreateSiteNoteModal;
