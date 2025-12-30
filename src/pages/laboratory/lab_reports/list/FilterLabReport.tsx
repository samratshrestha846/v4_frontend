import React, { SetStateAction, useRef } from 'react';
import { LAB_REPORT_OPTIONS } from '../../../../constants/labConstants';
import { LAB_REPORT_ADD } from '../../../../constants/path';
import { CREATE_LAB_REPORT } from '../../../../constants/permissions';
import { can } from '../../../../helpers/checkPermission';
import SearchBox from '../../../../components/SearchBox';
import { DropdownFilterItem } from '../../../../types/common';
import FilterDropdownSection from '../../../../components/FilterDropdownSection';
import AddNewRecord from '../../../../components/AddNewRecord';

type Props = {
  search: any;
  // eslint-disable-next-line no-unused-vars
  handleSearchOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setSearch: React.Dispatch<SetStateAction<string>>;
  status?: string;
  setStatus: React.Dispatch<SetStateAction<string | undefined>>;
};

const FilterLabReport: React.FC<Props> = ({
  search,
  handleSearchOnChange,
  setSearch,
  status,
  setStatus,
}) => {
  const canCreateLabReport = can(CREATE_LAB_REPORT);

  // Search Ref
  const searchRef = useRef<HTMLInputElement>(null);

  const clearAll = () => {
    setStatus(undefined);
    setSearch('');

    if (searchRef.current) {
      searchRef.current.value = '';
    }
  };

  const checkNoData = !(search || status);

  // Filter Fields
  const filterFields: DropdownFilterItem[] = [
    {
      filterType: 'Status',
      setFilterData: setStatus,
      dataOptions: LAB_REPORT_OPTIONS,
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
        {canCreateLabReport && (
          <AddNewRecord url={LAB_REPORT_ADD} title="Add Lab Report" />
        )}
      </div>
    </div>
  );
};

export default FilterLabReport;
