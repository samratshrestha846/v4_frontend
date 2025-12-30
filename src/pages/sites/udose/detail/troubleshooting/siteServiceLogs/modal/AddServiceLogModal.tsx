import React from 'react';
import { Modal } from 'react-bootstrap';
import AddSiteServiceLog from '../AddServiceLog';
import CustomModalHeader from '../../../../../../../components/modal/CustomModalHeader';

type Props = {
  showModal: boolean;
  toggleModal: () => void;
  refetchServiceLogs: () => void;
  refetchSiteFollowups?: () => void;
  followupId?: number;
};

const AddServiceLogModal: React.FC<Props> = ({
  showModal,
  toggleModal,
  refetchServiceLogs,
  refetchSiteFollowups,
  followupId,
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
          title="Add Service Log"
          handleModalClose={toggleModal}
        />
      </Modal.Header>
      <Modal.Body>
        <AddSiteServiceLog
          toggleModal={toggleModal}
          refetchServiceLogs={refetchServiceLogs}
          refetchSiteFollowups={refetchSiteFollowups}
          followupId={followupId}
        />
      </Modal.Body>
    </Modal>
  );
};

export default AddServiceLogModal;
