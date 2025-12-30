import React from 'react';
import { Modal } from 'react-bootstrap';
import CustomModalHeader from '../../../components/modal/CustomModalHeader';
import AddUser from '../AddUser';

type Props = {
  showModal: boolean;
  toggleModal: () => void;
  refetch: any;
};

const AddUserModal: React.FC<Props> = ({ showModal, toggleModal, refetch }) => {
  return (
    <Modal
      show={showModal}
      onHide={toggleModal}
      backdrop="static"
      keyboard={false}
      size="lg"
      dialogClassName="custom-modal">
      <Modal.Header>
        <CustomModalHeader handleModalClose={toggleModal} title="Add User" />
      </Modal.Header>
      <Modal.Body>
        <AddUser toggleModal={toggleModal} refetch={refetch} />
      </Modal.Body>
    </Modal>
  );
};

export default AddUserModal;
