/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { Card } from 'react-bootstrap';
import SaleListTable from './SaleListTable';
import PageTitle from '../../../../components/PageTitle';
import useSaleList from '../hooks/useSaleList';
import useReferredCustomersDropdown from '../../../../hooks/dropdown/useReferredCustomersDropdown';
import useReferrersDropdown from '../../../../hooks/dropdown/useReferrersDropdown';
import CustomLoader from '../../../../components/CustomLoader';
import ErrorMessage from '../../../../components/ErrorMessage';
import SalesFilterSection from './SalesFilterSection';

const SaleList: React.FC = () => {
  const {
    data: customersOptions,
    isFetching: isFetchingCustomersOptions,
    isError: isErrorCustomersOptions,
  } = useReferredCustomersDropdown();

  const {
    data: referrersOptions,
    isFetching: isFetchingReferrersOptions,
    isError: isErrorReferrersOptions,
  } = useReferrersDropdown();

  const {
    isFetching,
    isError,
    data,
    pageNumber,
    search,
    handlePageChange,
    handleSearchOnChange,
    customer,
    setCustomer,
    referrer,
    setReferrer,
    setSearch,
  } = useSaleList();

  if (isError || isErrorCustomersOptions || isErrorReferrersOptions) {
    return <ErrorMessage />;
  }

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: 'Sales', path: '/sales/list', active: true },
        ]}
        title="Sales"
      />

      <Card>
        <Card.Body>
          <SalesFilterSection
            search={search}
            handleSearchOnChange={handleSearchOnChange}
            setSearch={setSearch}
            customer={customer}
            setCustomer={setCustomer}
            referrer={referrer}
            setReferrer={setReferrer}
            customersOptions={customersOptions}
            referrersOptions={referrersOptions}
          />
          {isFetching ||
          isFetchingCustomersOptions ||
          isFetchingReferrersOptions ? (
            <CustomLoader />
          ) : (
            <SaleListTable
              isFetching={isFetching}
              data={data}
              handlePageChange={handlePageChange}
              pageNumber={pageNumber}
            />
          )}
        </Card.Body>
      </Card>
    </>
  );
};

export default SaleList;
