/* eslint-disable no-unused-vars */
import React, { Dispatch, SetStateAction, useRef } from 'react';
import { STATUS_OPTIONS } from '../../../../constants/statusOptions';
import useFilterUbotSites from '../hooks/useFilterUbotSites';
import ErrorMessage from '../../../../components/ErrorMessage';
import SearchBox from '../../../../components/SearchBox';
import FilterDropdownSection from '../../../../components/FilterDropdownSection';
import { DropdownFilterItem } from '../../../../types/common';
import { can } from '../../../../helpers/checkPermission';
import useAuth from '../../../../hooks/useAuth';
import { CREATE_UBOT } from '../../../../constants/permissions';
import AddNewRecord from '../../../../components/AddNewRecord';
import { UBOT_ADD } from '../../../../constants/path';

type Props = {
  setFilters: any;
  search?: string;
  setSearch: Dispatch<SetStateAction<string>>;
  handleSearchOnChange: (e: any) => void;
};

const UbotFilter: React.FC<Props> = ({
  setFilters,
  search,
  setSearch,
  handleSearchOnChange,
}) => {
  const canCreateUbot = can(CREATE_UBOT);

  const { isSuperAdmin, isAdmin, isManager } = useAuth();

  const {
    customer,
    setCustomer,
    property,
    setProperty,
    status,
    setStatus,
    customersOptions,
    isErrorCustomersOptions,
    propertiesOptions,
    isErrorPropertiesDropdown,
  } = useFilterUbotSites({ setFilters });

  // Search Ref
  const searchRef = useRef<HTMLInputElement>(null);

  const clearAll = () => {
    setCustomer(undefined);
    setProperty(undefined);
    setSearch('');
    setStatus(undefined);
    if (searchRef.current) {
      searchRef.current.value = '';
    }
  };

  const checkNoData = !(search || customer || property || status);

  // Filter Fields
  const filterFields: DropdownFilterItem[] = [
    {
      filterType: 'Customer',
      setFilterData: setCustomer,
      dataOptions: customersOptions,
      data: customer,
    },
    {
      filterType: 'Property',
      setFilterData: setProperty,
      dataOptions: propertiesOptions,
      data: property,
    },

    {
      filterType: 'Status',
      setFilterData: setStatus,
      dataOptions: STATUS_OPTIONS,
      data: status,
    },
  ];

  if (isErrorCustomersOptions || isErrorPropertiesDropdown) {
    return <ErrorMessage />;
  }

  return (
    <div className="d-flex justify-content-between align-items-center gap-1 flex-wrap mb-2">
      <div className="d-flex justify-content-start align-items-center gap-1 flex-wrap">
        <SearchBox
          search={search}
          handleSearchOnChange={handleSearchOnChange}
          searchRef={searchRef}
        />
        {(isSuperAdmin || isAdmin || isManager) && (
          <FilterDropdownSection
            filterFields={filterFields}
            checkNoData={checkNoData}
            clearAll={clearAll}
          />
        )}
      </div>

      <div className="d-flex justify-content-end align-items-center flex-grow-1 gap-1">
        {canCreateUbot && <AddNewRecord url={UBOT_ADD} title="Add uBot Site" />}
      </div>
    </div>
  );
};

export default UbotFilter;
