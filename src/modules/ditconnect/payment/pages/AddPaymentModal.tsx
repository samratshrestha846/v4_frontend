import React from 'react';
import { Modal } from 'react-bootstrap';
import CustomModalHeader from '@uhub/components/modal/CustomModalHeader';
import PaymentForm from './PaymentForm';

type Props = {
  showModal: boolean;
  toggleModal: () => void;
  purchaseRequestId: number;
  purchaseRequestNo: string;
};

const AddPaymentModal: React.FC<Props> = ({
  showModal,
  toggleModal,
  purchaseRequestId,
  purchaseRequestNo,
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
          title={`Add Payment Details for ${purchaseRequestNo}`}
          handleModalClose={toggleModal}
        />
      </Modal.Header>
      <Modal.Body>
        <PaymentForm
          defaultValues={{
            purchase_request_id: purchaseRequestId,
            paid_by: null,
            po_number: null,
          }}
          toggleModal={toggleModal}
        />
      </Modal.Body>
    </Modal>
  );
};

export default AddPaymentModal;
