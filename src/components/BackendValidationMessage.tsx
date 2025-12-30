import React, { Dispatch, SetStateAction } from 'react';
import { Alert } from 'react-bootstrap';

type Props = {
  errorMessage?: string;
  setServerValidationError: Dispatch<SetStateAction<boolean>>;
};

const BackendValidationMessage: React.FC<Props> = ({
  errorMessage,
  setServerValidationError,
}) => {
  return (
    <Alert
      variant="danger"
      onClose={() => setServerValidationError(false)}
      dismissible>
      <strong>Validation Failed - </strong>
      {errorMessage || 'Please fix validation errors and try again'}
    </Alert>
  );
};

export default BackendValidationMessage;
