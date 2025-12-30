import React from 'react';
import { Alert, Col, Row } from 'react-bootstrap';

type Props = {
  message?: string;
};

const ErrorMessage: React.FC<Props> = ({ message }) => {
  return (
    <Row className="mt-3">
      <Col>
        <Alert variant="danger">
          <i className="bx bx-error-alt" />
          {message ||
            `Oops something went wrong! Please
          try again later.`}
        </Alert>
      </Col>
    </Row>
  );
};

export default ErrorMessage;
