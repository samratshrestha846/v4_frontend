import React from 'react';
import { Form } from 'react-bootstrap';

type FormErrorMessageProps = {
  error?: { message?: string };
};

const FormErrorMessage: React.FC<FormErrorMessageProps> = ({ error }) => {
  if (!error) return null;

  return (
    <Form.Control.Feedback type="invalid" className="d-block">
      {error.message}
    </Form.Control.Feedback>
  );
};

export default FormErrorMessage;
