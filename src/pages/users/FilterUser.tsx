import React, { SetStateAction, useRef } from 'react';
import SearchBox from '../../components/SearchBox';
import { DropdownFilterItem, LabelNumericValue } from '../../types/common';
import FilterDropdownSection from '../../components/FilterDropdownSection';
import { STATUS_OPTIONS } from '../../constants/statusOptions';

type Props = {
  search: any;
  // eslint-disable-next-line no-unused-vars
  handleSearchOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setSearch: React.Dispatch<SetStateAction<string>>;
  role?: number;
  setRole: React.Dispatch<SetStateAction<number | undefined>>;
  roleOptions?: LabelNumericValue[];
  status?: string;
  setStatus: React.Dispatch<SetStateAction<string>>;
};

const FilterUser: React.FC<Props> = ({
  search,
  handleSearchOnChange,
  setSearch,
  role,
  setRole,
  roleOptions,
  status,
  setStatus,
}) => {
  // Search Ref
  const searchRef = useRef<HTMLInputElement>(null);

  const clearAll = () => {
    setRole(undefined);
    setSearch('');
    setStatus('');

    if (searchRef.current) {
      searchRef.current.value = '';
    }
  };

  const checkNoData = !(
    search ||
    role ||
    status !== null ||
    status !== undefined ||
    status !== ''
  );

  // Filter Fields
  const filterFields: DropdownFilterItem[] = [
    {
      filterType: 'Role',
      setFilterData: setRole,
      dataOptions: roleOptions ?? [],
      data: role,
    },
    {
      filterType: 'Status',
      setFilterData: setStatus,
      dataOptions: STATUS_OPTIONS,
      data: status,
    },
  ];

  return (
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
  );
};

export default FilterUser;
