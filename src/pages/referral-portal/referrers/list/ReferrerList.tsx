import React, { useRef } from 'react';
import { Card, Button } from 'react-bootstrap';
import ReferrerListTable from './ReferrerListTable';
import useReferrerList from '../hooks/useReferrerList';
import PageTitle from '../../../../components/PageTitle';
import { CREATE_REFERRER } from '../../../../constants/permissions';
import { can } from '../../../../helpers/checkPermission';
import SearchBox from '../../../../components/SearchBox';
import ErrorMessage from '../../../../components/ErrorMessage';
import AddNewRecord from '../../../../components/AddNewRecord';
import { REFERRER_ADD } from '../../../../constants/path';

const ReferrerList: React.FC = () => {
  const canCreateReferrer = can(CREATE_REFERRER);

  const {
    isFetching,
    isError,
    data,
    pageNumber,
    search,
    handlePageChange,
    handleSearchOnChange,
    setSearch,
  } = useReferrerList();

  if (isError) return <ErrorMessage />;

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: 'Referrers', path: '/referrers/list', active: true },
        ]}
        title="Referrers"
      />

      <Card>
        <Card.Body>
          <SearchSection
            handleSearchOnChange={handleSearchOnChange}
            search={search}
            canCreateReferrer={canCreateReferrer}
            setSearch={setSearch}
          />

          <ReferrerListTable
            isFetching={isFetching}
            data={data}
            handlePageChange={handlePageChange}
            pageNumber={pageNumber}
          />
        </Card.Body>
      </Card>
    </>
  );
};

export default ReferrerList;

const SearchSection = ({
  handleSearchOnChange,
  search,
  canCreateReferrer,
  setSearch,
}: any) => {
  const searchRef = useRef<HTMLInputElement>(null);

  const clearAll = () => {
    setSearch('');

    if (searchRef.current) {
      searchRef.current.value = '';
    }
  };

  return (
    <div className="d-flex justify-content-between align-items-center gap-1 flex-wrap mb-2">
      <div className="d-flex justify-content-start align-items-center gap-1 flex-wrap">
        <SearchBox
          search={search}
          handleSearchOnChange={handleSearchOnChange}
          searchRef={searchRef}
        />
        {search && (
          <Button
            variant="link"
            className="font-10 fw-bold clear-filter-btn"
            onClick={clearAll}>
            Clear Filter
          </Button>
        )}
      </div>

      <div className="d-flex justify-content-end align-items-center flex-grow-1 gap-1">
        {canCreateReferrer && (
          <AddNewRecord url={REFERRER_ADD} title="Add Referrer" />
        )}
      </div>
    </div>
  );
};
