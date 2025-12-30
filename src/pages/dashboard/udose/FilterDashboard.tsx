import React, { SetStateAction, useRef } from 'react';
import SearchBox from '../../../components/SearchBox';
import { DropdownFilterItem } from '../../../types/common';
import FilterDropdownSection from '../../../components/FilterDropdownSection';
import useAuth from '../../../hooks/useAuth';
import usePropertiesDropdown from '../../../hooks/dropdown/usePropertiesDropdown';
import {
  ASSIGNED_TO_ME,
  filterOptions,
  sortOptions,
} from '../../../constants/dashboardConstants';

type Props = {
  search: any;
  // eslint-disable-next-line no-unused-vars
  handleSearchOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setSearch: React.Dispatch<SetStateAction<string | undefined>>;
  filter?: number;
  setFilter: React.Dispatch<SetStateAction<number | undefined>>;
  sort?: string;
  setSort: React.Dispatch<SetStateAction<string | undefined>>;
  property?: number;
  setProperty: React.Dispatch<SetStateAction<number | undefined>>;
  user?: number;
  setUser: React.Dispatch<SetStateAction<number | undefined>>;
};

const FilterDashboard: React.FC<Props> = ({
  search,
  handleSearchOnChange,
  setSearch,
  filter,
  setFilter,
  sort,
  setSort,
  property,
  setProperty,
  user,
  setUser,
}) => {
  const { isSuperAdmin, isAdmin, isCustomer, isManager, isStationManager } =
    useAuth();

  const { data: propertiesOptions } = usePropertiesDropdown(
    isSuperAdmin || isAdmin
  );

  const assignedToMetions = [
    { label: 'Assigned to Me', value: ASSIGNED_TO_ME },
  ];

  // Search Ref
  const searchRef = useRef<HTMLInputElement>(null);

  const clearAll = () => {
    setSearch(undefined);
    setFilter(undefined);
    setSort(undefined);
    setProperty(undefined);
    setUser(undefined);

    if (searchRef.current) {
      searchRef.current.value = '';
    }
  };

  const checkNoData = !(
    search ||
    (filter !== undefined && filter !== null) ||
    sort ||
    property ||
    user
  );

  const filterFields: DropdownFilterItem[] = [
    {
      filterType: 'Status',
      setFilterData: setFilter,
      dataOptions: filterOptions,
      isMulti: false,
      data: filter,
    },
    {
      filterType: 'Sort By',
      setFilterData: setSort,
      dataOptions: sortOptions,
      isMulti: false,
      data: sort,
    },
  ];

  if (!(isCustomer || isStationManager)) {
    filterFields.push({
      filterType: 'Property',
      setFilterData: setProperty,
      dataOptions: propertiesOptions,
      isMulti: false,
      data: property,
    });
  }

  if (isAdmin || isManager) {
    filterFields.push({
      filterType: 'User',
      setFilterData: setUser,
      dataOptions: assignedToMetions,
      isMulti: false,
      data: user,
    });
  }

  return (
    <div className="d-flex justify-content-between align-items-center gap-1 flex-wrap mb-2 mt-2">
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

export default FilterDashboard;
