import React, { SetStateAction, useRef } from 'react';
import { CREATE_FERTILIZER } from '../../../../constants/permissions';
import { FERTILIZER_ADD } from '../../../../constants/path';
import { can } from '../../../../helpers/checkPermission';
import { DropdownFilterItem } from '../../../../types/common';
import { STATUS_OPTIONS } from '../../../../constants/statusOptions';
import SearchBox from '../../../../components/SearchBox';
import FilterDropdownSection from '../../../../components/FilterDropdownSection';
import AddNewRecord from '../../../../components/AddNewRecord';

type Props = {
  search: any;
  // eslint-disable-next-line no-unused-vars
  handleSearchOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setSearch: React.Dispatch<SetStateAction<string>>;
  status?: number;
  setStatus: React.Dispatch<SetStateAction<number | undefined>>;
};

const FilterFertilizer: React.FC<Props> = ({
  search,
  handleSearchOnChange,
  setSearch,
  status,
  setStatus,
}) => {
  const canCreateFertilizer = can(CREATE_FERTILIZER);

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
        {canCreateFertilizer && (
          <AddNewRecord url={FERTILIZER_ADD} title="Add Fertilizer" />
        )}
      </div>
    </div>
  );
};

export default FilterFertilizer;
