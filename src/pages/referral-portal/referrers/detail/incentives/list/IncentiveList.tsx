import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import CustomLoader from '../../../../../../components/CustomLoader';
import IncentiveListTable from './IncentiveListTable';
import useReferrerIncentivesList from '../../../hooks/useReferrerIncentivesList';
import ErrorMessage from '../../../../../../components/ErrorMessage';
import SearchBox from '../../../../../../components/SearchBox';

const IncentiveList: React.FC = () => {
  const {
    isFetching,
    isError,
    data,
    pageNumber,
    search,
    handlePageChange,
    handleSearchOnChange,
  } = useReferrerIncentivesList();

  if (isError) {
    return <ErrorMessage />;
  }

  return (
    <Card>
      <Card.Header as="h5" className="text-primary-color">
        Incentives
      </Card.Header>
      <Card.Body>
        <SearchSection
          handleSearchOnChange={handleSearchOnChange}
          search={search}
        />
        {isFetching ? (
          <CustomLoader />
        ) : (
          <IncentiveListTable
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

export default IncentiveList;

const SearchSection = ({ handleSearchOnChange, search }: any) => {
  return (
    <Row className="mb-1">
      <Col xl={4} md={6} className="mb-1">
        <SearchBox
          search={search}
          handleSearchOnChange={handleSearchOnChange}
        />
      </Col>
    </Row>
  );
};
