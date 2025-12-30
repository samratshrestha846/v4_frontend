import React, { SetStateAction, useRef } from 'react';
import { Button } from 'react-bootstrap';
import SearchBox from '../../../components/SearchBox';

type Props = {
  search: any;
  // eslint-disable-next-line no-unused-vars
  handleSearchOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setSearch: React.Dispatch<SetStateAction<string>>;
};

const SearchTestSites: React.FC<Props> = ({
  search,
  handleSearchOnChange,
  setSearch,
}) => {
  // Search Ref
  const searchRef = useRef<HTMLInputElement>(null);

  const clearAll = () => {
    setSearch('');

    if (searchRef.current) {
      searchRef.current.value = '';
    }
  };

  const checkNoData = !search;

  return (
    <div className="d-flex justify-content-start align-items-center gap-1 flex-wrap mb-2">
      <SearchBox
        search={search}
        handleSearchOnChange={handleSearchOnChange}
        searchRef={searchRef}
      />

      {!checkNoData && (
        <div className="col-auto d-flex justify-content-center align-items-center">
          <Button
            variant="link"
            className="font-10 fw-bold clear-filter-btn"
            onClick={clearAll}>
            Clear Filter
          </Button>
        </div>
      )}
    </div>
  );
};

export default SearchTestSites;
