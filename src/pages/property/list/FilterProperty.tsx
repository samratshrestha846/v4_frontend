import React, { SetStateAction, useRef } from 'react';
import { Button } from 'react-bootstrap';
import SearchBox from '../../../components/SearchBox';
import { can } from '../../../helpers/checkPermission';
import { CREATE_CUSTOMER_PROPERTY } from '../../../constants/permissions';
import { STATUS_OPTIONS } from '../../../constants/statusOptions';
import { DropdownFilterItem } from '../../../types/common';
import FilterDropdownSection from '../../../components/FilterDropdownSection';

type Props = {
  search: string;
  setSearch: React.Dispatch<SetStateAction<string>>;
  // eslint-disable-next-line no-unused-vars
  handleSearchOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  status?: number;
  setStatus: React.Dispatch<SetStateAction<number | undefined>>;
  toggleModal: () => void;
};

const FilterProperty: React.FC<Props> = ({
  search,
  setSearch,
  handleSearchOnChange,
  status,
  setStatus,
  toggleModal,
}) => {
  const canCreateProperty = can(CREATE_CUSTOMER_PROPERTY);
  const searchRef = useRef<HTMLInputElement>(null);

  const clearAll = () => {
    setSearch('');
    setStatus(undefined);

    if (searchRef.current) {
      searchRef.current.value = '';
    }
  };

  const checkNoData = !(search || (status !== undefined && status != null));

  const filterFields: DropdownFilterItem[] = [
    {
      filterType: 'Status',
      setFilterData: setStatus,
      dataOptions: STATUS_OPTIONS,
      isMulti: false,
      data: status,
    },
  ];

  return (
    <div className="d-flex justify-content-between align-items-center gap-1 flex-wrap mb-2">
      <div className="d-flex justify-content-start align-items-center gap-1 flex-wrap">
        <SearchBox
          search={search}
          handleSearchOnChange={handleSearchOnChange}
          searchRef={searchRef}
        />
        <FilterDropdownSection
          filterFields={filterFields}
          checkNoData={checkNoData}
          clearAll={clearAll}
        />
      </div>

      <div className="d-flex justify-content-end align-items-center flex-grow-1 gap-1">
        {canCreateProperty && (
          <Button
            variant="secondary"
            className="mb-1 btn btn-secondary btn-sm"
            onClick={toggleModal}>
            <i className="bx bx-user-plus me-1 font-18" /> Add Property
          </Button>
        )}
      </div>
    </div>
  );
};

export default FilterProperty;
