import React from 'react';
import { Modal } from 'react-bootstrap';
import AddNutrientForm from '../forms/AddNutrientForm';
import CustomModalHeader from '../../../components/modal/CustomModalHeader';

type AddNutrientModalProps = {
  toggleModal: () => void;
  showModal: boolean;
  methaneRefetch: () => void;
  nonMethaneRefetch: () => void;
};

const AddNutrientModal: React.FC<AddNutrientModalProps> = ({
  toggleModal,
  showModal,
  methaneRefetch,
  nonMethaneRefetch,
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
          title="Add Supplement Nutrient"
          handleModalClose={toggleModal}
        />
      </Modal.Header>
      <Modal.Body>
        <AddNutrientForm
          toggleModal={toggleModal}
          methaneRefetch={methaneRefetch}
          nonMethaneRefetch={nonMethaneRefetch}
        />
      </Modal.Body>
    </Modal>
  );
};

export default AddNutrientModal;
