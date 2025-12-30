import React from 'react';
import { Button } from 'react-bootstrap';

interface DeleteButtonProps {
  handleDelete: () => void;
  btnText?: string;
}

const DeleteButton = ({ handleDelete, btnText }: DeleteButtonProps) => {
  return (
    <Button variant="danger" onClick={handleDelete}>
      <i className="bx bx-trash me-1" />
      {btnText ?? 'Delete'}
    </Button>
  );
};

export default DeleteButton;
