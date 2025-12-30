import classNames from 'classnames';
import React from 'react';
import { Alert } from 'react-bootstrap';

type Props = {
  wrapperClass?: string;
  message?: string | null;
};

const NoDataAvailable: React.FC<Props> = ({ message, wrapperClass }) => {
  return (
    <Alert
      variant={classNames(
        'default d-flex justify-content-center align-items-center text-center',
        wrapperClass ?? ''
      )}>
      <i className="bx bx-info-circle me-1" />
      {message ?? 'No Data Available !'}
    </Alert>
  );
};

export default NoDataAvailable;
