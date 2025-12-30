import React, { SetStateAction, useRef } from 'react';
import FilterDropdownSection from '../../components/FilterDropdownSection';
import { DropdownFilterItem } from '../../types/common';
import {
  BASE_TYPE_OPTIONS,
  MODEL_TYPE_OPTIONS,
} from '../../constants/logsContants';
import { SITE } from '../../constants/constants';
import SearchBox from '../../components/SearchBox';

type Props = {
  search?: string;
  // eslint-disable-next-line no-unused-vars
  handleSearchOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setSearch: React.Dispatch<SetStateAction<string | undefined>>;
  modelType?: string;
  setModelType: React.Dispatch<SetStateAction<string | undefined>>;
  type?: string;
  setType: React.Dispatch<SetStateAction<string | undefined>>;
  modelId?: string;
  setModelId: React.Dispatch<SetStateAction<string | undefined>>;
  userId?: number;
  setUserId: React.Dispatch<SetStateAction<number | undefined>>;
  modelIdOptions: any[];
  userOptions: any[];
};

const LogsFilter: React.FC<Props> = ({
  search,
  handleSearchOnChange,
  setSearch,
  modelType,
  setModelType,
  type,
  setType,
  modelId,
  setModelId,
  userId,
  setUserId,
  modelIdOptions,
  userOptions,
}) => {
  // Search Ref
  const searchRef = useRef<HTMLInputElement>(null);

  const getTypeOptions = () => {
    if (modelType === SITE) {
      return [
        ...BASE_TYPE_OPTIONS,
        { value: 'satellite_communication', label: 'Satellite Communication' },
      ];
    }
    return BASE_TYPE_OPTIONS;
  };

  const clearAll = () => {
    setSearch('');
    setModelType(undefined);
    setModelId(undefined);
    setType(undefined);
    setUserId(undefined);

    if (searchRef.current) {
      searchRef.current.value = '';
    }
  };

  const checkNoData = !(search || modelType || modelId || type || userId);

  // Filter Fields
  const filterFields: DropdownFilterItem[] = [
    {
      filterType: 'Model Type',
      setFilterData: setModelType,
      dataOptions: MODEL_TYPE_OPTIONS,
      isMulti: false,
      data: modelType,
    },
    {
      filterType: 'Model Id',
      setFilterData: setModelId,
      dataOptions: modelIdOptions,
      isMulti: false,
      data: modelId,
    },
    {
      filterType: 'Type',
      setFilterData: setType,
      dataOptions: getTypeOptions(),
      isMulti: false,
      data: type,
    },
    {
      filterType: 'User',
      setFilterData: setUserId,
      dataOptions: userOptions,
      isMulti: false,
      data: userId,
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

export default LogsFilter;
