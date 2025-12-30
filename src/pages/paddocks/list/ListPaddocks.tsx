import React from 'react';
import { Card } from 'react-bootstrap';
import ListPaddocksTable from './ListPaddocksTable';
import useListPaddocks from '../hooks/useListPaddocks';
import ErrorMessage from '../../../components/ErrorMessage';
import PageTitle from '../../../components/PageTitle';
import { PADDOCK_LIST } from '../../../constants/path';
import FilterPaddocks from './FilterPaddocks';
import useAuth from '../../../hooks/useAuth';

const ListPaddocks: React.FC = () => {
  const { isAdmin, isSuperAdmin, isManager } = useAuth();

  const {
    data,
    isFetching,
    isError,
    refetch,
    pageNumber,
    search,
    handlePageChange,
    handleSearchOnChange,
    customer,
    setCustomer,
    property,
    setProperty,
    setSearch,
  } = useListPaddocks();

  if (isError) {
    return <ErrorMessage />;
  }

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: 'Paddocks', path: PADDOCK_LIST, active: true },
        ]}
        title="Paddocks"
      />
      <Card>
        <Card.Body>
          {(isSuperAdmin || isAdmin || isManager) && (
            <FilterPaddocks
              search={search}
              setSearch={setSearch}
              handleSearchOnChange={handleSearchOnChange}
              customer={customer}
              setCustomer={setCustomer}
              property={property}
              setProperty={setProperty}
            />
          )}

          <ListPaddocksTable
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

export default ListPaddocks;
