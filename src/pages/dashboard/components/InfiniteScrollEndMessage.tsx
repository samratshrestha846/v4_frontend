import React, { FC } from 'react';
import { Alert } from 'react-bootstrap';

type Props = {
  dashboardData?: any;
};

const InfiniteScrollEndMessage: FC<Props> = ({ dashboardData }) => {
  return (
    <Alert
      key="info"
      variant="light"
      style={{ textAlign: 'center', fontStyle: 'italic' }}>
      <h5>
        <i className="mdi mdi-counter" />
        {`Showing ${dashboardData ? dashboardData.length : 0} records.`}
      </h5>
    </Alert>
  );
};

export default InfiniteScrollEndMessage;
