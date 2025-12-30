import React from 'react';
import { Button } from 'react-bootstrap';
import useDelete from '../hooks/useDelete';

type Props = {
  title: string;
  endpoint: string;
  refetchKey: string;
  toggleModal: () => void;
};

const DeleteModal: React.FC<Props> = ({
  title,
  endpoint,
  refetchKey,
  toggleModal,
}) => {
  const { deleteRecord } = useDelete({
    title,
    endpoint,
    refetchKey,
    toggleModal,
  });

  return (
    <>
      <div className="d-flex align-items-center gap-1">
        <p className="fw-semibold text-secondary-color">
          Are you sure you want to delete {title} ?
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
          variant="secondary"
          className="btn btn-secondary"
          onClick={deleteRecord}>
          <i className="bx bx-trash me-1" />
          Ok
        </Button>
      </div>
    </>
  );
};

export default DeleteModal;
