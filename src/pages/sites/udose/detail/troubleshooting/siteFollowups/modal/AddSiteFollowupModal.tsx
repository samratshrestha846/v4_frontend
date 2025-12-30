import React from 'react';
import { Modal } from 'react-bootstrap';
import CustomModalHeader from '../../../../../../../components/modal/CustomModalHeader';
import CreateSiteFollowup from '../CreateSiteFollowup';

type Props = {
  showModal: boolean;
  toggleModal: () => void;
  refetchSiteFollowups?: () => void;
};

const AddSiteFollowupModal: React.FC<Props> = ({
  showModal,
  toggleModal,
  refetchSiteFollowups,
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
          title="Add Site Follow-up"
          handleModalClose={toggleModal}
        />
      </Modal.Header>
      <Modal.Body>
        <CreateSiteFollowup
          toggleModal={toggleModal}
          refetchSiteFollowups={refetchSiteFollowups}
        />
      </Modal.Body>
    </Modal>
  );
};

export default AddSiteFollowupModal;
