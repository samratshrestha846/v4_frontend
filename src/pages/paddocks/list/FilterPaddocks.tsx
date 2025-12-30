import React, { SetStateAction, useRef } from 'react';
import SearchBox from '../../../components/SearchBox';
import { can } from '../../../helpers/checkPermission';
import { CREATE_PADDOCK } from '../../../constants/permissions';
import { DropdownFilterItem } from '../../../types/common';
import useCustomersDropdown from '../../../hooks/dropdown/useCustomersDropdown';
import AddNewRecord from '../../../components/AddNewRecord';
import { PADDOCK_ADD } from '../../../constants/path';
import usePropertiesDropdown from '../../../hooks/dropdown/usePropertiesDropdown';
import FilterDropdownSection from '../../../components/FilterDropdownSection';

type Props = {
  search: any;
  setSearch: React.Dispatch<SetStateAction<string>>;
  // eslint-disable-next-line no-unused-vars
  handleSearchOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  customer?: number;
  setCustomer: React.Dispatch<SetStateAction<number | undefined>>;
  property?: number;
  setProperty: React.Dispatch<SetStateAction<number | undefined>>;
};

const FilterPaddocks: React.FC<Props> = ({
  search,
  setSearch,
  handleSearchOnChange,
  customer,
  setCustomer,
  property,
  setProperty,
}) => {
  const canCreatePaddock = can(CREATE_PADDOCK);
  const searchRef = useRef<HTMLInputElement>(null);

  const { customersDropdown: customersOptions } = useCustomersDropdown();
  const { data: propertiesOptions } = usePropertiesDropdown(true, customer);

  const clearAll = () => {
    setSearch('');
    setCustomer(undefined);
    setProperty(undefined);

    if (searchRef.current) {
      searchRef.current.value = '';
    }
  };

  const checkNoData = !(search || customer || property);

  // Filter Fields
  const filterFields: DropdownFilterItem[] = [
    {
      filterType: 'Customer',
      setFilterData: setCustomer,
      dataOptions: customersOptions,
      isMulti: false,
      data: customer,
    },
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

      <div className="d-flex justify-content-end align-items-center flex-grow-1 gap-1">
        {canCreatePaddock && (
          <AddNewRecord url={PADDOCK_ADD} title="Add Paddock" />
        )}
      </div>
    </div>
  );
};

export default FilterPaddocks;
