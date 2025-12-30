import React, { SetStateAction, useRef } from 'react';
import SearchBox from '../../../components/SearchBox';
import {
  isAlarmedOptions,
  isRunningOptions,
  STATUS_OPTIONS,
} from '../../../constants/statusOptions';
import { can } from '../../../helpers/checkPermission';
import { CREATE_UDOSE_AG } from '../../../constants/permissions';
import { UDOSE_AG_ADD } from '../../../constants/path';
import { DropdownFilterItem } from '../../../types/common';
import AddNewRecord from '../../../components/AddNewRecord';
import FilterDropdownSection from '../../../components/FilterDropdownSection';

type Props = {
  search: string;
  // eslint-disable-next-line no-unused-vars
  handleSearchOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setSearch: React.Dispatch<SetStateAction<string>>;
  status: number | null;
  alarmed: number | null;
  running: number | null;
  setStatus: React.Dispatch<SetStateAction<number | null>>;
  setAlarmed: React.Dispatch<SetStateAction<number | null>>;
  setRunning: React.Dispatch<SetStateAction<number | null>>;
};

const FilterUdoseAg: React.FC<Props> = ({
  search,
  handleSearchOnChange,
  setSearch,
  status,
  alarmed,
  running,
  setStatus,
  setAlarmed,
  setRunning,
}) => {
  const canCreateUdoseAg = can(CREATE_UDOSE_AG);
  const searchRef = useRef<HTMLInputElement>(null);

  const clearAll = () => {
    setStatus(null);
    setAlarmed(null);
    setRunning(null);
    setSearch('');

    if (searchRef.current) {
      searchRef.current.value = '';
    }
  };

  const checkNoData = !(
    search ||
    status != null ||
    alarmed != null ||
    running != null
  );

  // Filter Fields
  const filterFields: DropdownFilterItem[] = [
    {
      filterType: 'Status',
      setFilterData: setStatus,
      dataOptions: STATUS_OPTIONS,
      isMulti: false,
      data: status,
    },
    {
      filterType: 'Is Alarmed',
      setFilterData: setAlarmed,
      dataOptions: isAlarmedOptions,
      isMulti: false,
      data: alarmed,
    },
    {
      filterType: 'Is Running',
      setFilterData: setRunning,
      dataOptions: isRunningOptions,
      isMulti: false,
      data: running,
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
        {canCreateUdoseAg && (
          <AddNewRecord url={UDOSE_AG_ADD} title="Add uDose Ag" />
        )}
      </div>
    </div>
  );
};

export default FilterUdoseAg;
