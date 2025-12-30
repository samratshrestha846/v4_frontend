import React from 'react';
import { Card } from 'react-bootstrap';
import PageTitle from '../../../components/PageTitle';
import CustomLoader from '../../../components/CustomLoader';
import ErrorMessage from '../../../components/ErrorMessage';
import UdoseListTable from '../udose/list/UdoseListTable';
import useUdoseList from '../udose/hooks/useUdoseList';
import SearchTestSites from './SearchTestSites';

const ListTestSites: React.FC = () => {
  const {
    data,
    isFetching,
    isError,
    pageNumber,
    search,
    handlePageChange,
    handleSearchOnChange,
    sort,
    direction,
    handleTabeDataSorting,
    setSearch,
  } = useUdoseList(true); // send true params to get udose test site list

  if (isError) return <ErrorMessage />;

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: 'Test Sites', path: '/sites/list', active: true },
        ]}
        title="uDose Test Sites"
      />
      <Card>
        <Card.Body>
          <SearchTestSites
            search={search}
            setSearch={setSearch}
            handleSearchOnChange={handleSearchOnChange}
          />

          {isFetching ? (
            <CustomLoader />
          ) : (
            <UdoseListTable
              isFetching={isFetching}
              data={data}
              handlePageChange={handlePageChange}
              pageNumber={pageNumber}
              sort={sort}
              direction={direction}
              handleTabeDataSorting={handleTabeDataSorting}
              isTestSiteList
            />
          )}
        </Card.Body>
      </Card>
    </>
  );
};

export default ListTestSites;
