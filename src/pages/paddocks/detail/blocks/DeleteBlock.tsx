import React from 'react';
import { Button } from 'react-bootstrap';
import useDeleteBlock from './hooks/useDeleteBlock';
import { Block } from '../../../../types/horticulture/block';

type Props = {
  toggleModal: () => void;
  refetchBlocks?: () => void;
  blockDetail?: Block;
};

const DeleteBlock: React.FC<Props> = ({
  toggleModal,
  refetchBlocks,
  blockDetail,
}) => {
  const { handleDelete } = useDeleteBlock({
    refetchBlocks,
    toggleModal,
    blockId: blockDetail?.id,
  });

  return (
    <>
      <div className="d-flex align-items-center gap-1">
        <p className="fw-semibold text-secondary-color">
          Are you sure you want to delete this Block ?
        </p>
      </div>

      <div className="float-end button-list mt-2">
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

export default DeleteBlock;
