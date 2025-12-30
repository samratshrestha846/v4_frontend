import React from 'react';
import { Button } from 'react-bootstrap';

interface SubmitButtonProps {
  disable: boolean;
}

const SubmitButton = ({ disable }: SubmitButtonProps) => {
  return (
    <Button
      variant="secondary"
      className="btn btn-secondary"
      type="submit"
      disabled={disable}>
      <i className="bx bx-save me-1" />
      Save
    </Button>
  );
};

export default SubmitButton;
