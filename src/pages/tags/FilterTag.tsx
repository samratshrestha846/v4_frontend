import React, { SetStateAction, useRef } from 'react';
import SearchBox from '../../components/SearchBox';
import { DropdownFilterItem, LabelValueDropdown } from '../../types/common';
import FilterDropdownSection from '../../components/FilterDropdownSection';

type Props = {
  search: any;
  // eslint-disable-next-line no-unused-vars
  handleSearchOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setSearch: React.Dispatch<SetStateAction<string>>;
  type?: string;
  setType: React.Dispatch<SetStateAction<string>>;
  tagtypesOptions: LabelValueDropdown[];
};

const FilterTag: React.FC<Props> = ({
  search,
  handleSearchOnChange,
  setSearch,
  type,
  setType,
  tagtypesOptions,
}) => {
  // Search Ref
  const searchRef = useRef<HTMLInputElement>(null);

  const clearAll = () => {
    setType('');
    setSearch('');

    if (searchRef.current) {
      searchRef.current.value = '';
    }
  };

  const checkNoData = !(search || type);

  // Filter Fields
  const filterFields: DropdownFilterItem[] = [
    {
      filterType: 'Type',
      setFilterData: setType,
      dataOptions: tagtypesOptions ?? [],
      data: type,
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

export default FilterTag;
