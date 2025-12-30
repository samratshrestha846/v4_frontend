import React from 'react';
import { Modal } from 'react-bootstrap';
import CustomModalHeader from '../../../../../../../components/modal/CustomModalHeader';
import EditSiteFollowup from '../EditSiteFollowup';

type Props = {
  followupId: number;
  showModal: boolean;
  toggleModal: () => void;
  refetchSiteFollowups?: () => void;
};

const EditSiteFollowupModal: React.FC<Props> = ({
  followupId,
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
          title="Edit Site Follow-up"
          handleModalClose={toggleModal}
        />
      </Modal.Header>
      <Modal.Body>
        <EditSiteFollowup
          followupId={followupId}
          toggleModal={toggleModal}
          refetchSiteFollowups={refetchSiteFollowups}
        />
      </Modal.Body>
    </Modal>
  );
};

export default EditSiteFollowupModal;
