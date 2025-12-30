import React from 'react';
import { Button } from 'react-bootstrap';
import useDeleteCropable from './hooks/useDeleteCropable';
import { Cropable } from '../../../../types/horticulture/cropable';

type Props = {
  toggleModal: () => void;
  refetchBlocks?: () => void;
  refetchSubBlocks?: () => void;
  cropableDetail?: Cropable;
};

const DeleteCropable: React.FC<Props> = ({
  toggleModal,
  refetchBlocks,
  refetchSubBlocks,
  cropableDetail,
}) => {
  const { handleDelete } = useDeleteCropable({
    refetchBlocks,
    refetchSubBlocks,
    toggleModal,
    id: cropableDetail?.id,
  });

  return (
    <>
      <div className="d-flex align-items-center">
        <p className="fw-semibold text-secondary-color">
          Are you sure you want to delete this assigned crop ?
        </p>
      </div>

      <div className="float-end button-list mt-2">
        <Button
          variant="outline"
          className="btn btn-ghost"
          onClick={toggleModal}>
          <i className="bx bx-x" />
          Cancel
        </Button>
        <Button
          variant="danger"
          className="btn btn-danger"
          onClick={handleDelete}>
          <i className="bx bx-trash" />
          Delete
        </Button>
      </div>
    </>
  );
};

export default DeleteCropable;
