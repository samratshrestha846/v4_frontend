import React from 'react';
import { Card } from 'react-bootstrap';
import PageTitle from '../../../../components/PageTitle';
import useUdoseList from '../hooks/useUdoseList';
import useExtraFilter from '../hooks/useExtraFilter';
import useCheckProductSubscription from '../hooks/useCheckProductSubscription';
import UdoseInfo from '../components/UdoseInfo';
import UdoseListTable from './UdoseListTable';
import useExportUdoseList from '../hooks/useExportUdoseList';
import Loader from '../../../../components/Loader';
import ErrorMessage from '../../../../components/ErrorMessage';
import FilterUdose from './FilterUdose';
import useAuth from '../../../../hooks/useAuth';

const UdoseList: React.FC = () => {
  const { isAdmin, isSuperAdmin, isManager } = useAuth();

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
    appliedFilters,
    setAppliedFilters,
    extraFilters,
    setExtraFilters,
    filters,
    setFilters,
    setSearch,
  } = useUdoseList();

  const {
    dropdownOpen,
    toggleDropdown,
    handleFilterApply,
    handleCheckBoxChange,
  } = useExtraFilter({
    setAppliedFilters,
    extraFilters,
    setExtraFilters,
  });

  const { handleExportList, isExportingList } = useExportUdoseList({
    filters,
  });

  const { isSubscribed } = useCheckProductSubscription();

  if (!isSubscribed) {
    return <UdoseInfo />;
  }

  if (isError) {
    return <ErrorMessage />;
  }

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: 'All uDose Sites', path: '/sites/udose/list', active: true },
        ]}
        title="uDoses"
      />

      {isExportingList && <Loader />}

      <Card>
        <Card.Body>
          {(isSuperAdmin || isAdmin || isManager) && (
            <FilterUdose
              search={search}
              handleSearchOnChange={handleSearchOnChange}
              setFilters={setFilters}
              setSearch={setSearch}
              handleExportList={handleExportList}
              extraFilters={extraFilters}
              dropdownOpen={dropdownOpen}
              toggleDropdown={toggleDropdown}
              handleFilterApply={handleFilterApply}
              handleCheckBoxChange={handleCheckBoxChange}
              appliedFilters={appliedFilters}
              setAppliedFilters={setAppliedFilters}
            />
          )}

          <UdoseListTable
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

export default UdoseList;
