import React from 'react';
import { Col, Row } from 'react-bootstrap';
import PageTitle from '../../../components/PageTitle';
import SupplementCard from './SupplementCard';
import useListSupplements from '../hooks/useListSupplements';
import CustomLoader from '../../../components/CustomLoader';
import ErrorMessage from '../../../components/ErrorMessage';
import Pagination from '../../../components/Pagination';
import { PAGINATION_DEFAULT } from '../../../constants/constants';
import FilterSupplements from './FilterSupplements';

const SupplementList: React.FC = () => {
  const {
    data,
    isFetching,
    isError,
    status,
    setStatus,
    pageNumber,
    handlePageChange,
    perPage,
    handlePerPageChange,
    search,
    handleSearchOnChange,
    setSearch,
  } = useListSupplements();

  if (isError) return <ErrorMessage />;

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: 'Supplements', path: '/supplements/list', active: true },
        ]}
        title="Supplements"
      />

      <FilterSupplements
        search={search}
        handleSearchOnChange={handleSearchOnChange}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
      />

      {isFetching ? (
        <CustomLoader />
      ) : (
        <Row className="g-2">
          {data?.body?.map((supplement) => (
            <Col lg={3} md={4} sm={6} key={supplement.id}>
              <SupplementCard supplement={supplement} />
            </Col>
          ))}
        </Row>
      )}

      <Pagination
        pageNumber={pageNumber}
        handlePageChange={handlePageChange}
        data={data?.meta_data?.pagination || PAGINATION_DEFAULT}
        showPerPageDropdown
        perPage={perPage}
        handlePerPageChange={handlePerPageChange}
        customPerPageOptions={[
          { label: 8, value: 8 },
          { label: 12, value: 12 },
          { label: 16, value: 16 },
          { label: 20, value: 20 },
        ]}
        showPerPageLabel
      />
    </>
  );
};
export default SupplementList;
