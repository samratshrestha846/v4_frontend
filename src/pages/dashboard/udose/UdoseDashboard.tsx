import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { DEVICE_CONFIGURATION_TYPE_UDOSE } from '../../../constants/constants';
import CustomLoader from '../../../components/CustomLoader';
import useFetchUdoseDashboardData from '../hooks/useFetchUdoseDashboardData';
import InfiniteScrollEndMessage from '../components/InfiniteScrollEndMessage';
import UdoseCard from '../../sites/cards/udose/UdoseCard';
import FilterDashboard from './FilterDashboard';

const UdoseDashboard: React.FC = () => {
  const {
    hasNextPage,
    fetchNextPage,
    isLoading,
    dashboardData,
    setSearch,
    setFilter,
    setSort,
    setProperty,
    setUser,
    search,
    filter,
    sort,
    property,
    user,
    handleSearchOnChange,
  } = useFetchUdoseDashboardData();

  return (
    <>
      <FilterDashboard
        search={search}
        handleSearchOnChange={handleSearchOnChange}
        setSearch={setSearch}
        filter={filter}
        setFilter={setFilter}
        sort={sort}
        setSort={setSort}
        property={property}
        setProperty={setProperty}
        user={user}
        setUser={setUser}
      />

      {isLoading && <CustomLoader />}

      <InfiniteScroll
        next={() => fetchNextPage()}
        hasMore={!!hasNextPage}
        loader={<h3>Loading...</h3>}
        dataLength={dashboardData ? dashboardData.length : 0}
        endMessage={<InfiniteScrollEndMessage dashboardData={dashboardData} />}>
        {dashboardData?.map((item) => {
          const type = item?.device?.device_configuration.type;
          if (type === DEVICE_CONFIGURATION_TYPE_UDOSE) {
            return <UdoseCard key={item.id} siteDetail={item} />;
          }
          return null;
        })}
      </InfiniteScroll>
    </>
  );
};
export default UdoseDashboard;
