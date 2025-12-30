import React from 'react';
import { Modal } from 'react-bootstrap';
import UpdateSubBlock from '../UpdateSubBlock';
import { SubBlock } from '../../../../../types/horticulture/subBlock';

type Props = {
  showModal: boolean;
  toggleModal: () => void;
  refetchSubBlocks?: () => void;
  subBlockDetail?: SubBlock;
};

const UpdateSubBlockModal: React.FC<Props> = ({
  showModal,
  toggleModal,
  refetchSubBlocks,
  subBlockDetail,
}) => {
  return (
    <Modal
      show={showModal}
      onHide={toggleModal}
      backdrop="static"
      keyboard={false}>
      <Modal.Header className="b-secondary" closeButton>
        <h4 className="modal-title">Update Sub Block</h4>
      </Modal.Header>
      <Modal.Body>
        <UpdateSubBlock
          toggleModal={toggleModal}
          refetchSubBlocks={refetchSubBlocks}
          subBlockDetail={subBlockDetail}
        />
      </Modal.Body>
    </Modal>
  );
};

export default UpdateSubBlockModal;
