import React from 'react';
import { Modal } from 'react-bootstrap';
import { capitalizeWordFirstLetter } from '../helpers';
import CustomModalHeader from './modal/CustomModalHeader';

type Props = {
  showModal: boolean;
  toggleModal: () => void;
  action?: string;
  component: any;
  size?: 'lg' | 'sm' | 'xl' | undefined;
};

const ActionModal: React.FC<Props> = ({
  showModal,
  toggleModal,
  action,
  component,
  size,
}) => {
  return (
    <Modal
      show={showModal}
      onHide={toggleModal}
      backdrop="static"
      size={size ?? undefined}
      keyboard={false}
      dialogClassName="custom-modal">
      <Modal.Header>
        <CustomModalHeader
          title={capitalizeWordFirstLetter(action, '_') || 'Modal Title'}
          handleModalClose={toggleModal}
        />
      </Modal.Header>
      <Modal.Body>{component}</Modal.Body>
    </Modal>
  );
};

export default ActionModal;
