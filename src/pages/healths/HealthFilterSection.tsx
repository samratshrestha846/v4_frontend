import React, { SetStateAction, useRef } from 'react';
import SearchBox from '../../components/SearchBox';
import FilterDropdownSection from '../../components/FilterDropdownSection';
import { DropdownFilterItem } from '../../types/common';

type Props = {
  search: any;
  // eslint-disable-next-line no-unused-vars
  handleSearchOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setSearch: React.Dispatch<SetStateAction<string>>;
  property: number | undefined;
  setProperty: React.Dispatch<SetStateAction<number | undefined>>;
  propertiesOptions: any;
};

const HealthFilterSection: React.FC<Props> = ({
  search,
  handleSearchOnChange,
  setSearch,
  property,
  setProperty,
  propertiesOptions,
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

export default HealthFilterSection;
