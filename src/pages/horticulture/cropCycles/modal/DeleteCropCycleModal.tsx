import React from 'react';
import { Button } from 'react-bootstrap';
import useDeleteCropCycle from '../hooks/useDeleteCropCycle';

type Props = {
  toggleModal?: () => void;
  refetch: () => void;
  cropCycleId: number;
};

const DeleteCropCycleModal: React.FC<Props> = ({
  toggleModal,
  refetch,
  cropCycleId,
}) => {
  const { handleDelete } = useDeleteCropCycle({ cropCycleId, refetch });
  return (
    <>
      <div className="d-flex align-items-center gap-1">
        <p className="fw-semibold text-secondary-color">
          Are you sure you want to delete this Crop Cycle?
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

export default DeleteCropCycleModal;
