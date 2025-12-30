import React from 'react';
import { Modal } from 'react-bootstrap';
import parse from 'html-react-parser';
import CustomModalHeader from '../../../../../components/modal/CustomModalHeader';

type Props = {
  showModal: boolean;
  toggleModal: () => void;
  potentialAction?: string;
};

const PotentialActionModal: React.FC<Props> = ({
  showModal,
  toggleModal,
  potentialAction,
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
          handleModalClose={toggleModal}
          title=" Potential Actions"
        />
      </Modal.Header>
      <Modal.Body>{potentialAction ? parse(potentialAction) : '-'}</Modal.Body>
    </Modal>
  );
};

export default PotentialActionModal;
