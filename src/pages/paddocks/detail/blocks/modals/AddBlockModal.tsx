import React from 'react';
import { Modal } from 'react-bootstrap';
import AddBlock from '../AddBlock';
import CustomModalHeader from '../../../../../components/modal/CustomModalHeader';

type Props = {
  showModal: boolean;
  toggleModal: () => void;
  refetchBlocks: () => void;
};

const AddBlockModal: React.FC<Props> = ({
  showModal,
  toggleModal,
  refetchBlocks,
}) => {
  return (
    <Modal
      show={showModal}
      onHide={toggleModal}
      backdrop="static"
      keyboard={false}
      dialogClassName="custom-modal">
      <Modal.Header>
        <CustomModalHeader handleModalClose={toggleModal} title="Add Block" />
      </Modal.Header>
      <Modal.Body>
        <AddBlock toggleModal={toggleModal} refetchBlocks={refetchBlocks} />
      </Modal.Body>
    </Modal>
  );
};

export default AddBlockModal;
