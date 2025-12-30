import React from 'react';
import { Card } from 'react-bootstrap';
import PageTitle from '../../../components/PageTitle';
import useCustomerList from '../hooks/useCustomerList';
import CustomerListTable from './CustomerListTable';
import ErrorMessage from '../../../components/ErrorMessage';
import FilterCustomer from '../components/FilterCustomer';

const CustomerList: React.FC = () => {
  const {
    isFetching,
    isError,
    data,
    search,
    handlePageChange,
    pageNumber,
    handleSearchOnChange,
    status,
    setStatus,
    setSearch,
    refetch,
  } = useCustomerList();

  if (isError) {
    return <ErrorMessage />;
  }

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: 'Customers', path: '/customers/list', active: true },
        ]}
        title="Customers"
      />

      <Card>
        <Card.Body>
          <FilterCustomer
            search={search}
            setSearch={setSearch}
            handleSearchOnChange={handleSearchOnChange}
            status={status}
            setStatus={setStatus}
          />
          <CustomerListTable
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

export default CustomerList;
