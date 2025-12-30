import React from 'react';
import { Row, Col } from 'react-bootstrap';
import PageTitle from '../../../../components/PageTitle';
import useListFertilizers from '../hooks/useListFertilizers';
import CustomLoader from '../../../../components/CustomLoader';
import ErrorMessage from '../../../../components/ErrorMessage';
import FertilizerCard from '../components/FertilizerCard';
import { FERTILIZER_LIST } from '../../../../constants/path';
import NoDataAvailable from '../../../../components/NoDataAvailable';
import FilterFertilizer from './FilterFertilizer';

const ListFertilizer: React.FC = () => {
  const {
    data,
    isFetching,
    isError,
    handleSearchOnChange,
    search,
    status,
    setStatus,
    setSearch,
  } = useListFertilizers();

  if (isError) return <ErrorMessage />;

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: 'All Fertilizers', path: FERTILIZER_LIST, active: true },
        ]}
        title="Fertilizers"
      />

      <FilterFertilizer
        search={search}
        handleSearchOnChange={handleSearchOnChange}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
      />

      {isFetching ? (
        <CustomLoader />
      ) : (
        <>
          {data && data.length === 0 && <NoDataAvailable />}
          <Row className="g-2">
            {data &&
              data.length > 0 &&
              data?.map((fertilizer) => (
                <Col lg={3} md={4} sm={6} key={fertilizer.id}>
                  <FertilizerCard fertilizer={fertilizer} />
                </Col>
              ))}
          </Row>
        </>
      )}
    </>
  );
};

export default ListFertilizer;
