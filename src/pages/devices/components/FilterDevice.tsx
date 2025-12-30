import React, { SetStateAction, useRef } from 'react';
import SearchBox from '../../../components/SearchBox';
import TELEMETRY_OPTIONS from '../../../constants/telemetryTypes';
import { can } from '../../../helpers/checkPermission';
import { CREATE_DEVICE } from '../../../constants/permissions';
import ExportDevice from '../list/ExportDevice';
import {
  DropdownFilterItem,
  LabelNumericValueDropdown,
} from '../../../types/common';
import FilterDropdownSection from '../../../components/FilterDropdownSection';
import AddNewRecord from '../../../components/AddNewRecord';
import { DEVICE_ADD } from '../../../constants/path';

type TagIds = {
  label: string;
  value: string;
};

type Props = {
  search: any;
  // eslint-disable-next-line no-unused-vars
  handleSearchOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setDeviceConfiguration: React.Dispatch<SetStateAction<string>>;
  configurationsOptions: LabelNumericValueDropdown[];
  setStockType: React.Dispatch<SetStateAction<string>>;
  stockTypesOptions: LabelNumericValueDropdown[];
  setTelemetry: React.Dispatch<SetStateAction<string>>;
  setTagIds: React.Dispatch<SetStateAction<TagIds[] | []>>;
  tagsOptions: LabelNumericValueDropdown[];
  asOfDate: Date | null;
  setAsOfDate: React.Dispatch<SetStateAction<Date | null>>;
  handleExportReport: () => void;
  setIsToggled: React.Dispatch<SetStateAction<boolean>>;
  isToggled: boolean;
  setSearch: React.Dispatch<SetStateAction<string>>;
  deviceConfiguration: string;
  stockType: string;
  telemetry: string;
  tagIds: TagIds[];
};

const FilterDevice: React.FC<Props> = ({
  search,
  handleSearchOnChange,
  setDeviceConfiguration,
  configurationsOptions,
  setStockType,
  stockTypesOptions,
  setTelemetry,
  setTagIds,
  tagsOptions,
  asOfDate,
  setAsOfDate,
  handleExportReport,
  setIsToggled,
  isToggled,
  setSearch,
  deviceConfiguration,
  stockType,
  telemetry,
  tagIds,
}) => {
  const canCreateDevice = can(CREATE_DEVICE);

  // Search Ref
  const searchRef = useRef<HTMLInputElement>(null);

  const clearAll = () => {
    setDeviceConfiguration('');
    setStockType('');
    setTelemetry('');
    setTagIds([]);
    setSearch('');

    if (searchRef.current) {
      searchRef.current.value = '';
    }
  };

  const checkNoData = !(
    search ||
    tagIds.length > 0 ||
    telemetry ||
    stockType ||
    deviceConfiguration
  );

  // Filter Fields
  const filterFields: DropdownFilterItem[] = [
    {
      filterType: 'Device Configuration',
      setFilterData: setDeviceConfiguration,
      dataOptions: configurationsOptions,
      isMulti: false,
      data: deviceConfiguration,
    },
    {
      filterType: 'Stock Type',
      setFilterData: setStockType,
      dataOptions: stockTypesOptions,
      isMulti: false,
      data: stockType,
    },
    {
      filterType: 'Telemetry Type',
      setFilterData: setTelemetry,
      dataOptions: TELEMETRY_OPTIONS,
      isMulti: false,
      data: telemetry,
    },
    {
      filterType: 'Label',
      setFilterData: setTagIds,
      dataOptions: tagsOptions,
      isMulti: true,
      data: tagIds,
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
        {canCreateDevice && (
          <AddNewRecord url={DEVICE_ADD} title="Add Device" />
        )}

        <ExportDevice
          asOfDate={asOfDate}
          setAsOfDate={setAsOfDate}
          handleExportReport={handleExportReport}
          setIsToggled={setIsToggled}
          isToggled={isToggled}
        />
      </div>
    </div>
  );
};

export default FilterDevice;
