import React from 'react';
import { Button } from 'react-bootstrap';
import CancelButton from '@uhub/components/Form/CancelButton';
import { StorageTankResponse } from '../types/StorageTank';
import useDeleteStorageTank from '../hooks/useDeleteStorageTank';

type Props = {
  toggleModal?: () => void;
  storageTank?: StorageTankResponse;
};

const DeleteStorageTank: React.FC<Props> = ({ toggleModal, storageTank }) => {
  const { handleDelete } = useDeleteStorageTank({
    id: storageTank?.id,
    toggleModal,
  });

  return (
    <>
      <div className="d-flex align-items-center">
        <p className="fw-semibold text-secondary-color">
          {`Are you sure you want to delete `}
          <span className="fst-italic text-primary-color">
            {storageTank?.name ?? ''}
          </span>
          {` storage tank ? `}
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

export default DeleteStorageTank;
