import React from 'react';
import { Card } from 'react-bootstrap';
import ReferrerPaymentListTable from './ReferrerPaymentListTable';
import useReferrerPaymentList from '../../../hooks/useReferrerPaymentList';
import CustomLoader from '../../../../../../components/CustomLoader';
import ErrorMessage from '../../../../../../components/ErrorMessage';

const ReferrerPaymentList: React.FC = () => {
  const { isFetching, data, pageNumber, handlePageChange, isError } =
    useReferrerPaymentList();

  if (isError) return <ErrorMessage />;

  return (
    <Card>
      <Card.Header as="h5" className="text-primary-color">
        Payments
      </Card.Header>
      <Card.Body>
        {isFetching ? (
          <CustomLoader />
        ) : (
          <ReferrerPaymentListTable
            isFetching={isFetching}
            data={data}
            handlePageChange={handlePageChange}
            pageNumber={pageNumber}
          />
        )}
      </Card.Body>
    </Card>
  );
};

export default ReferrerPaymentList;
