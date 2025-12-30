import React, { useRef } from 'react';
import SearchBox from '@uhub/components/SearchBox';
import FilterDropdownSection from '@uhub/components/FilterDropdownSection';
import { CustomDropdownMenuItem, DropdownFilterItem } from '@uhub/types/common';
import AddNewRecord from '@uhub/components/AddNewRecord';
import { debounce } from 'lodash';

import ActionDropdown from '@uhub/components/ActionDropdown';
import cleanedParams from '../helper';

type FilterSectionProps = {
  filterFields: DropdownFilterItem[];
  filters: any;
  setFilters: any;
  canCreate: boolean;
  createPath?: string;
  title?: string;
  actionDropdownItems?: CustomDropdownMenuItem[];
  customAction?: React.ReactNode;
};

const FilterSection = ({
  filterFields,
  filters,
  setFilters,
  canCreate,
  createPath,
  title,
  actionDropdownItems,
  customAction,
}: FilterSectionProps) => {
  // Search Ref
  const searchRef = useRef<HTMLInputElement>(null);
  const checkNoData = Object.keys(cleanedParams(filters)).length === 0;

  const clearAll = () => {
    if (searchRef.current) {
      searchRef.current.value = '';
    }

    setFilters({});
  };
  const handleSearchOnChange = debounce((e): void => {
    setFilters((prev: any) => ({
      ...prev,
      search: e.target.value,
      page: 1,
    }));
  }, 300);

  return (
    <div className="d-flex justify-content-between align-items-center gap-1 flex-wrap mb-2">
      <div className="d-flex justify-content-start align-items-center gap-1 flex-wrap">
        <SearchBox
          search={filters.search}
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
        {canCreate && createPath && (
          <AddNewRecord url={createPath} title={`Add ${title}`} />
        )}
        {customAction}
        {actionDropdownItems && (
          <ActionDropdown
            icon="bx bx-dots-vertical-rounded"
            iconColorClass="font-14 text-muted"
            containerClass="export-dropdown d-flex align-items-center justify-content-between text-white"
            menuItems={actionDropdownItems}
            toggleBtnClass="export-toggle-btn border-light-gray"
            dropdownMenuclass="mt-1"
          />
        )}
      </div>
    </div>
  );
};
export default FilterSection;
