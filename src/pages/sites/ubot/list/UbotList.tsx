import React from 'react';
import { Card } from 'react-bootstrap';
import PageTitle from '../../../../components/PageTitle';
import { UBOT_LIST } from '../../../../constants/path';
import useListUbotSites from '../hooks/useListUbotSites';
import UbotFilter from './UbotFilter';
import UbotListTable from './UbotListTable';
import ErrorMessage from '../../../../components/ErrorMessage';

const UbotList: React.FC = () => {
  const {
    data,
    isFetching,
    isError,
    pageNumber,
    search,
    setSearch,
    handlePageChange,
    handleSearchOnChange,
    sort,
    direction,
    handleTabeDataSorting,
    setFilters,
  } = useListUbotSites();

  if (isError) {
    return <ErrorMessage />;
  }

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: 'All uBot Sites', path: UBOT_LIST, active: true },
        ]}
        title="uBots"
      />
      <Card>
        <Card.Body>
          <UbotFilter
            setFilters={setFilters}
            setSearch={setSearch}
            search={search}
            handleSearchOnChange={handleSearchOnChange}
          />

          <UbotListTable
            isFetching={isFetching}
            data={data}
            handlePageChange={handlePageChange}
            pageNumber={pageNumber}
            sort={sort}
            direction={direction}
            handleTabeDataSorting={handleTabeDataSorting}
          />
        </Card.Body>
      </Card>
    </>
  );
};

export default UbotList;
