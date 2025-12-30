import React from 'react';
import { Button } from 'react-bootstrap';

interface CancelButtonProps {
  redirectOnClick: () => void;
}

const CancelButton = ({ redirectOnClick }: CancelButtonProps) => {
  return (
    <Button
      className="btn btn-ghost"
      variant="outline"
      onClick={redirectOnClick}>
      <i className="bx bx-x me-1" />
      Cancel
    </Button>
  );
};

export default CancelButton;
