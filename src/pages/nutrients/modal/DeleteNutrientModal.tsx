import React from 'react';
import { Button } from 'react-bootstrap';
import useDeleteSupplementNutrient from '../hooks/useDeleteSupplementNutrient';

type Props = {
  nutrientId: number;

  methaneRefetch: () => void;
  nonMethaneRefetch: () => void;
  toggleModal?: () => void;
};
const DeleteNutrientModal: React.FC<Props> = ({
  nutrientId,
  methaneRefetch,
  nonMethaneRefetch,
  toggleModal,
}) => {
  const { handleDelete } = useDeleteSupplementNutrient({
    nutrientId,
    methaneRefetch,
    nonMethaneRefetch,
  });

  return (
    <>
      <div className="d-flex align-items-center">
        <p className="text-muted">
          Are you sure you want to delete this supplement nutrient ?
        </p>
      </div>

      <div className="button-list float-end">
        <Button variant="outline" className="btn-ghost" onClick={toggleModal}>
          <i className="bx bx-x me-1" />
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          <i className="bx bx-trash me-1" />
          Delete
        </Button>
      </div>
    </>
  );
};

export default DeleteNutrientModal;
