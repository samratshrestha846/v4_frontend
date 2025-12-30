import React from 'react';
import { Card } from 'react-bootstrap';
import PageTitle from '../../../components/PageTitle';
import usePropertyList from '../hooks/usePropertyList';
import PropertyListTable from './PropertyListTable';
import PropertyAddModal from '../modal/PropertyAddModal';
import ErrorMessage from '../../../components/ErrorMessage';
import FilterProperty from './FilterProperty';

const PropertyList: React.FC = () => {
  const {
    isFetching,
    isError,
    data,
    search,
    sort,
    direction,
    handlePageChange,
    pageNumber,
    showModal,
    handleSearchOnChange,
    toggleModal,
    refetch,
    handleTabeDataSorting,
    status,
    setStatus,
    setSearch,
  } = usePropertyList();

  if (isError) {
    return <ErrorMessage />;
  }

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: 'Properties', path: '/properties/list', active: true },
        ]}
        title="Properties"
      />

      <Card>
        <Card.Body>
          <FilterProperty
            search={search}
            setSearch={setSearch}
            handleSearchOnChange={handleSearchOnChange}
            status={status}
            setStatus={setStatus}
            toggleModal={toggleModal}
          />
          <PropertyListTable
            refetch={refetch}
            isFetching={isFetching}
            data={data}
            sort={sort}
            direction={direction}
            handlePageChange={handlePageChange}
            handleTabeDataSorting={handleTabeDataSorting}
            pageNumber={pageNumber}
          />
          <PropertyAddModal
            toggleModal={toggleModal}
            showModal={showModal}
            refetch={refetch}
          />
        </Card.Body>
      </Card>
    </>
  );
};

export default PropertyList;
