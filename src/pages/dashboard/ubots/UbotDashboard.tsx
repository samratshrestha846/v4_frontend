import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import CustomLoader from '../../../components/CustomLoader';
import InfiniteScrollEndMessage from '../components/InfiniteScrollEndMessage';
import useFetchUbotDashboardData from '../hooks/useFetchUbotDashboardData';
import UbotDashboardFilter from './UbotDashboardFilter';
import UbotIndex from '../../sites/cards/ubot/UbotIndex';

const UbotDashboard: React.FC = () => {
  const {
    hasNextPage,
    fetchNextPage,
    isLoading,
    debouncedSearch,
    dashboardData,
    setFilter,
    setSort,
    setProperty,
  } = useFetchUbotDashboardData();

  return (
    <>
      <UbotDashboardFilter
        setFilter={setFilter}
        setSearch={(value) => debouncedSearch(value)}
        setSort={setSort}
        setProperty={setProperty}
      />

      {isLoading && <CustomLoader />}

      <InfiniteScroll
        next={() => fetchNextPage()}
        hasMore={!!hasNextPage}
        loader={<h3>Loading...</h3>}
        dataLength={dashboardData ? dashboardData.length : 0}
        endMessage={<InfiniteScrollEndMessage dashboardData={dashboardData} />}>
        {dashboardData?.map((item) => {
          return <UbotIndex key={item.id} ubotDetail={item} />;
        })}
      </InfiniteScroll>
    </>
  );
};
export default UbotDashboard;
