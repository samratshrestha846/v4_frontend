import React, { SetStateAction, useRef } from 'react';
import { can } from '../../../../helpers/checkPermission';
import { CREATE_SALE } from '../../../../constants/permissions';
import SearchBox from '../../../../components/SearchBox';
import FilterDropdownSection from '../../../../components/FilterDropdownSection';
import AddNewRecord from '../../../../components/AddNewRecord';
import { SALE_ADD } from '../../../../constants/path';
import { DropdownFilterItem } from '../../../../types/common';

type Props = {
  search: any;
  // eslint-disable-next-line no-unused-vars
  handleSearchOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setSearch: React.Dispatch<SetStateAction<string>>;
  customer: number | undefined;
  setCustomer: React.Dispatch<SetStateAction<number | undefined>>;
  referrer: number | undefined;
  setReferrer: React.Dispatch<SetStateAction<number | undefined>>;
  customersOptions: any;
  referrersOptions: any;
};

const SalesFilterSection: React.FC<Props> = ({
  search,
  handleSearchOnChange,
  setSearch,
  customer,
  setCustomer,
  referrer,
  setReferrer,
  customersOptions,
  referrersOptions,
}) => {
  const canCreateSale = can(CREATE_SALE);

  // Search Ref
  const searchRef = useRef<HTMLInputElement>(null);

  const clearAll = () => {
    setCustomer(undefined);
    setReferrer(undefined);
    setSearch('');

    if (searchRef.current) {
      searchRef.current.value = '';
    }
  };

  const checkNoData = !(search || customer || referrer);

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
      filterType: 'Referrer',
      setFilterData: setReferrer,
      dataOptions: referrersOptions,
      isMulti: false,
      data: referrer,
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
        {canCreateSale && <AddNewRecord url={SALE_ADD} title="Add Sale" />}
      </div>
    </div>
  );
};

export default SalesFilterSection;
