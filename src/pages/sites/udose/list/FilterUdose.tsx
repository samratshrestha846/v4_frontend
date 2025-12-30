/* eslint-disable no-unused-vars */
import React, { SetStateAction, useRef } from 'react';
import useUdoseFilter from '../hooks/useUdoseFilter';
import { STATUS_OPTIONS } from '../../../../constants/statusOptions';
import { DOSING_MODE_OPTIONS } from '../../../../constants/udoseSettings';
import ExtraFilter from './ExtraFilter';
import { CREATE_UDOSE } from '../../../../constants/permissions';
import useAuth from '../../../../hooks/useAuth';
import { UDOSE_ADD, UDOSE_VIEW } from '../../../../constants/path';
import AddNewRecord from '../../../../components/AddNewRecord';
import ExportAssetUsageReport from './ExportAssetUsageReport';
import { can } from '../../../../helpers/checkPermission';
import {
  CustomDropdownMenuItem,
  DropdownFilterItem,
} from '../../../../types/common';
import SearchBox from '../../../../components/SearchBox';
import FilterDropdownSection from '../../../../components/FilterDropdownSection';
import ViewAppliedFilters from '../components/ViewAppliedFilters';
import useExtraFilter from '../hooks/useExtraFilter';
import usePropertiesDropdown from '../../../../hooks/dropdown/usePropertiesDropdown';
import ActionDropdown from '../../../../components/ActionDropdown';

type Props = {
  search: any;
  handleSearchOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setFilters: React.Dispatch<SetStateAction<any>>;
  setSearch: React.Dispatch<SetStateAction<string>>;
  handleExportList: any;
  extraFilters: any[];
  dropdownOpen: boolean;
  toggleDropdown: () => void;
  handleFilterApply: () => void;
  handleCheckBoxChange: (e: any, columnKey: string) => void;
  appliedFilters: any[];
  setAppliedFilters: any;
};

const FilterUdose: React.FC<Props> = ({
  search,
  handleSearchOnChange,
  setFilters,
  setSearch,
  handleExportList,
  extraFilters,
  dropdownOpen,
  toggleDropdown,
  handleFilterApply,
  handleCheckBoxChange,
  appliedFilters,
  setAppliedFilters,
}) => {
  const canCreateUdose = can(CREATE_UDOSE);

  const { isSuperAdmin, isAdmin, isManager } = useAuth();

  const { handleResetAppliedFilters } = useExtraFilter({
    appliedFilters,
    setAppliedFilters,
  });

  const {
    customer,
    setCustomer,
    property,
    setProperty,
    region,
    setRegion,
    status,
    setStatus,
    serviceType,
    setServiceType,
    dosingMode,
    setDosingMode,
    customersOptions,
    regionsOptions,
    serviceTypesOptions,
  } = useUdoseFilter({ setFilters });

  const { data: propertiesOptions } = usePropertiesDropdown(true, customer);

  // Search Ref
  const searchRef = useRef<HTMLInputElement>(null);

  const clearAll = () => {
    setSearch('');
    setCustomer(undefined);
    setProperty(undefined);
    setRegion(undefined);
    setStatus('');
    setServiceType('');
    setDosingMode('');

    if (searchRef.current) {
      searchRef.current.value = '';
    }
    handleResetAppliedFilters();
  };

  const checkNoData = !(
    search ||
    customer ||
    property ||
    region ||
    (status != null && status !== '') ||
    (serviceType != null && serviceType !== '') ||
    (dosingMode != null && dosingMode !== '') ||
    appliedFilters.length > 0
  );

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
    {
      filterType: 'Region',
      setFilterData: setRegion,
      dataOptions: regionsOptions,
      isMulti: false,
      data: region,
    },
    {
      filterType: 'Status',
      setFilterData: setStatus,
      dataOptions: STATUS_OPTIONS,
      isMulti: false,
      data: status,
    },
    {
      filterType: 'Service Type',
      setFilterData: setServiceType,
      dataOptions: serviceTypesOptions,
      isMulti: false,
      data: serviceType,
    },
    {
      filterType: 'Dosing Mode',
      setFilterData: setDosingMode,
      dataOptions: DOSING_MODE_OPTIONS,
      isMulti: false,
      data: dosingMode,
    },
  ];

  const menuItems: CustomDropdownMenuItem[] = [
    {
      label: 'Export uDose List',
      icon: 'bx bx-export',
      actionMethod: handleExportList,
      permission: UDOSE_VIEW,
    },
  ];

  return (
    <>
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
          <div className="d-flex gap-1 justify-content-end flex-wrap">
            <div className="float-end ">
              <ExtraFilter
                extraFilters={extraFilters}
                dropdownOpen={dropdownOpen}
                toggleDropdown={toggleDropdown}
                handleFilterApply={handleFilterApply}
                handleCheckBoxChange={handleCheckBoxChange}
              />
            </div>

            {canCreateUdose && (
              <AddNewRecord url={UDOSE_ADD} title="Add uDOSE site" />
            )}
            <ActionDropdown
              icon="bx bx-dots-vertical-rounded"
              iconColorClass="font-14 text-muted"
              containerClass="export-dropdown d-flex align-items-center justify-content-between text-white"
              menuItems={menuItems}
              toggleBtnClass="export-toggle-btn border-light-gray"
              dropdownMenuclass="mt-1">
              {(isAdmin || isSuperAdmin) && <ExportAssetUsageReport />}
            </ActionDropdown>
          </div>
        </div>
      </div>

      {appliedFilters.length > 0 && (
        <ViewAppliedFilters appliedFilters={appliedFilters} />
      )}
    </>
  );
};

export default FilterUdose;
