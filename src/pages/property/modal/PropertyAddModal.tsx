/* eslint-disable react/prop-types */
import React from 'react';
import { Modal } from 'react-bootstrap';
import PropertyAddForm from '../form/PropertyAddForm';
import CustomModalHeader from '../../../components/modal/CustomModalHeader';

type Props = {
  showModal: boolean;
  toggleModal: () => void;
  refetch: () => void;
};

const PropertyAddModal: React.FC<Props> = ({
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
          title="Add Property"
          handleModalClose={toggleModal}
        />
      </Modal.Header>
      <Modal.Body>
        <PropertyAddForm toggleModal={toggleModal} refetch={refetch} />
      </Modal.Body>
    </Modal>
  );
};

export default PropertyAddModal;
