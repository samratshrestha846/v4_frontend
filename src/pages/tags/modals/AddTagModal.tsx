import React from 'react';
import { Modal } from 'react-bootstrap';
import CustomModalHeader from '../../../components/modal/CustomModalHeader';
import AddTag from '../AddTag';

type Props = {
  showModal: boolean;
  toggleModal: () => void;
  refetch: any;
};

const AddTagModal: React.FC<Props> = ({ showModal, toggleModal, refetch }) => {
  return (
    <Modal
      show={showModal}
      onHide={toggleModal}
      backdrop="static"
      keyboard={false}
      dialogClassName="custom-modal">
      <Modal.Header>
        <CustomModalHeader handleModalClose={toggleModal} title="Add Tag" />
      </Modal.Header>
      <Modal.Body>
        <AddTag toggleModal={toggleModal} refetch={refetch} />
      </Modal.Body>
    </Modal>
  );
};

export default AddTagModal;
