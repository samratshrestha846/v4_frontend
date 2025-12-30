import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import PageTitle from '../../../../components/PageTitle';
import usePaymentList from '../hooks/usePaymentList';
import PaymentListTable from './PaymentListTable';
import { CREATE_PAYMENT } from '../../../../constants/permissions';
import { can } from '../../../../helpers/checkPermission';
import ErrorMessage from '../../../../components/ErrorMessage';
import AddNewRecord from '../../../../components/AddNewRecord';
import { PAYMENT_ADD, PAYMENT_LIST } from '../../../../constants/path';

const PaymentList: React.FC = () => {
  const canCreatePayment = can(CREATE_PAYMENT);

  const { isFetching, isError, data, pageNumber, refetch, handlePageChange } =
    usePaymentList();

  if (isError) {
    return <ErrorMessage />;
  }

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: 'Payments', path: PAYMENT_LIST, active: true },
        ]}
        title="Payments"
      />

      <Card>
        <Card.Body>
          <AddSection canCreatePayment={canCreatePayment} />
          <PaymentListTable
            isFetching={isFetching}
            data={data}
            handlePageChange={handlePageChange}
            pageNumber={pageNumber}
            refetch={refetch}
          />
        </Card.Body>
      </Card>
    </>
  );
};

export default PaymentList;

const AddSection = ({ canCreatePayment }: any) => {
  return (
    <Row>
      <Col>
        {canCreatePayment && (
          <AddNewRecord
            url={PAYMENT_ADD}
            title="Add Payment"
            containerClass="mb-2"
          />
        )}
      </Col>
    </Row>
  );
};
