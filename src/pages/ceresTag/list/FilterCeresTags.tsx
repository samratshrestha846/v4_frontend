import React, { SetStateAction, useRef } from 'react';
import SearchBox from '../../../components/SearchBox';
import { DropdownFilterItem, LabelValueDropdown } from '../../../types/common';
import FilterDropdownSection from '../../../components/FilterDropdownSection';

type Props = {
  property?: number;
  setProperty: React.Dispatch<SetStateAction<number | undefined>>;
  propertiesOptions: LabelValueDropdown[];
  // eslint-disable-next-line no-unused-vars
  handleSearchOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  search: string;
  setSearch: React.Dispatch<SetStateAction<string>>;
};

const FilterCeresTags: React.FC<Props> = ({
  search,
  handleSearchOnChange,
  property,
  setProperty,
  propertiesOptions,
  setSearch,
}) => {
  // Search Ref
  const searchRef = useRef<HTMLInputElement>(null);

  const clearAll = () => {
    setProperty(undefined);
    setSearch('');

    if (searchRef.current) {
      searchRef.current.value = '';
    }
  };

  const checkNoData = !(search || property);

  // Filter Fields
  const filterFields: DropdownFilterItem[] = [
    {
      filterType: 'Property',
      setFilterData: setProperty,
      dataOptions: propertiesOptions,
      isMulti: false,
      data: property,
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
    </div>
  );
};

export default FilterCeresTags;
