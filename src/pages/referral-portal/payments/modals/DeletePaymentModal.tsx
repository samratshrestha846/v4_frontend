import React from 'react';
import { Button } from 'react-bootstrap';
import useDeletePayment from '../hooks/useDeletePayment';
import { Payment } from '../../../../types/payment/paymentList';

type Props = {
  toggleModal?: () => void;
  refetch: any;
  payment: Payment;
};

const DeletePaymentModal: React.FC<Props> = ({
  toggleModal,
  payment,
  refetch,
}) => {
  const { handleDelete } = useDeletePayment({
    toggleModal,
    id: payment.id,
    refetch,
  });

  return (
    <>
      <div className="d-flex align-items-center gap-1">
        <p className="fw-semibold text-secondary-color">
          {` Are you sure you want to delete $${payment.amount.toFixed(4)} payment?`}
        </p>
      </div>
      <div className="button-list float-end">
        <Button
          variant="outline"
          className="btn btn-ghost"
          onClick={toggleModal}>
          <i className="bx bx-x me-1" />
          Cancel
        </Button>
        <Button
          variant="danger"
          className="btn btn-danger"
          onClick={handleDelete}>
          <i className="bx bx-trash me-1" />
          Delete
        </Button>
      </div>
    </>
  );
};

export default DeletePaymentModal;
