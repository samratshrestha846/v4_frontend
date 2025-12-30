import React from 'react';
import { Button } from 'react-bootstrap';
import CancelButton from '@uhub/components/Form/CancelButton';
import { ResponseSetResponse } from '../types/ResponseSet';
import useDeleteResponseSet from '../hooks/useDeleteResponseSet';

type Props = {
  toggleModal?: () => void;
  responseSet?: ResponseSetResponse;
};

const DeleteResponseSet: React.FC<Props> = ({ toggleModal, responseSet }) => {
  const { handleDelete } = useDeleteResponseSet({
    id: responseSet?.id,
    toggleModal,
  });

  return (
    <>
      <div className="d-flex align-items-center">
        <p className="fw-semibold text-secondary-color">
          {`Are you sure you want to delete `}
          <span className="fst-italic text-primary-color">
            {responseSet?.name ?? ''}
          </span>
          {` response set ? `}
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

export default DeleteResponseSet;
