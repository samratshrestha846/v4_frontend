import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import ReferredCustomerListTable from './ReferredCustomerListTable';
import useReferredCustomerList from '../../../hooks/useReferredCustomerList';
import CustomLoader from '../../../../../../components/CustomLoader';
import ErrorMessage from '../../../../../../components/ErrorMessage';
import SearchBox from '../../../../../../components/SearchBox';

const ReferredCustomerList: React.FC = () => {
  const {
    isFetching,
    isError,
    data,
    search,
    handlePageChange,
    pageNumber,
    handleSearchOnChange,
  } = useReferredCustomerList();

  if (isError) {
    return <ErrorMessage />;
  }

  return (
    <Card>
      <Card.Header as="h5" className="text-primary-color">
        Referred Customers
      </Card.Header>
      <Card.Body>
        <SearchSection
          handleSearchOnChange={handleSearchOnChange}
          search={search}
        />
        {isFetching ? (
          <CustomLoader />
        ) : (
          <ReferredCustomerListTable
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

export default ReferredCustomerList;

const SearchSection = ({ handleSearchOnChange, search }: any) => {
  return (
    <Row>
      <Col xl={4} md={6} className="mb-2">
        <SearchBox
          search={search}
          handleSearchOnChange={handleSearchOnChange}
        />
      </Col>
    </Row>
  );
};
