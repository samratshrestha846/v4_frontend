import React, { SetStateAction, useRef } from 'react';
import SearchBox from '../../../components/SearchBox';
import { can } from '../../../helpers/checkPermission';
import { CREATE_SUPPLEMENT } from '../../../constants/permissions';
import { DropdownFilterItem } from '../../../types/common';
import FilterDropdownSection from '../../../components/FilterDropdownSection';
import AddNewRecord from '../../../components/AddNewRecord';
import { SUPPLEMENT_ADD } from '../../../constants/path';
import { STATUS_OPTIONS } from '../../../constants/statusOptions';

type Props = {
  search: any;
  // eslint-disable-next-line no-unused-vars
  handleSearchOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setSearch: React.Dispatch<SetStateAction<string>>;
  status?: number;
  setStatus: React.Dispatch<SetStateAction<number | undefined>>;
};

const FilterSupplements: React.FC<Props> = ({
  search,
  handleSearchOnChange,
  setSearch,
  status,
  setStatus,
}) => {
  const canCreateSupplement = can(CREATE_SUPPLEMENT);

  // Search Ref
  const searchRef = useRef<HTMLInputElement>(null);

  const clearAll = () => {
    setSearch('');
    setStatus(undefined);

    if (searchRef.current) {
      searchRef.current.value = '';
    }
  };

  const checkNoData = !(search || (status !== undefined && status != null));

  // Filter Fields
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
        {canCreateSupplement && (
          <AddNewRecord title="Add Supplement" url={SUPPLEMENT_ADD} />
        )}
      </div>
    </div>
  );
};

export default FilterSupplements;
