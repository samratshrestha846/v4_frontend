import React from 'react';
import { Modal } from 'react-bootstrap';
import AddTransportEmission from '../AddTransportEmission';
import CustomModalHeader from '../../../components/modal/CustomModalHeader';

type Props = {
  showModal: boolean;
  toggleModal: () => void;
  refetch: any;
};

const AddTransportEmissionModal: React.FC<Props> = ({
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
      dialogClassName="custom-modal">
      <Modal.Header>
        <CustomModalHeader
          handleModalClose={toggleModal}
          title="Add Transport Emission"
        />
      </Modal.Header>
      <Modal.Body>
        <AddTransportEmission toggleModal={toggleModal} refetch={refetch} />
      </Modal.Body>
    </Modal>
  );
};

export default AddTransportEmissionModal;
