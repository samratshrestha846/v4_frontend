import React from 'react';
import { Button } from 'react-bootstrap';
import CancelButton from '@uhub/components/Form/CancelButton';
import useDeleteSupplier from '../hooks/useDeleteSupplier';
import { SupplierResponse } from '../types/Supplier';

type Props = {
  toggleModal?: () => void;
  supplier?: SupplierResponse;
};

const DeleteSupplier: React.FC<Props> = ({ toggleModal, supplier }) => {
  const { handleDelete } = useDeleteSupplier({
    id: supplier?.id,
    toggleModal,
  });

  return (
    <>
      <div className="d-flex align-items-center">
        <p className="fw-semibold text-secondary-color">
          Are you sure you want to delete?
          <span className="fst-italic text-primary-color">
            {supplier?.name ?? ''}
          </span>
          {` Supplier ? `}
        </p>
      </div>

      <div className="button-list float-end mt-3">
        <CancelButton redirectOnClick={toggleModal || (() => {})} />

        <Button variant="danger" onClick={handleDelete}>
          <i className="bx bx-trash me-1 font-18" />
          Delete
        </Button>
      </div>
    </>
  );
};

export default DeleteSupplier;
