import React, { SetStateAction, useRef } from 'react';
import { Button, Col } from 'react-bootstrap';
import SearchBox from '../../components/SearchBox';

type Props = {
  // eslint-disable-next-line no-unused-vars
  handleSearchOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  search: string;
  setSearch: React.Dispatch<SetStateAction<string>>;
};

const FilterTransportEmission: React.FC<Props> = ({
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

  return (
    <div className="d-flex justify-content-start align-items-center gap-1 flex-wrap mb-2">
      <SearchBox
        search={search}
        handleSearchOnChange={handleSearchOnChange}
        searchRef={searchRef}
      />
      {search && (
        <Col className="col-auto d-flex justify-content-center align-items-center">
          <Button
            variant="link"
            className="font-10 fw-bold clear-filter-btn"
            onClick={clearAll}>
            Clear Filter
          </Button>
        </Col>
      )}
    </div>
  );
};

export default FilterTransportEmission;
