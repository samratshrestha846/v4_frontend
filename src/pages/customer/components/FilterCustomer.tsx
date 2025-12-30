import React, { SetStateAction, useRef } from 'react';
import SearchBox from '../../../components/SearchBox';
import { can } from '../../../helpers/checkPermission';
import { CREATE_CUSTOMER } from '../../../constants/permissions';
import BOOLEAN_OPTIONS from '../../../constants/booleanOptions';
import { DropdownFilterItem } from '../../../types/common';
import FilterDropdownSection from '../../../components/FilterDropdownSection';
import AddNewRecord from '../../../components/AddNewRecord';
import { CUSTOMER_ONBOARDING } from '../../../constants/path';

type Props = {
  search: any;
  setSearch: React.Dispatch<SetStateAction<string>>;
  // eslint-disable-next-line no-unused-vars
  handleSearchOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  status: string;
  setStatus: React.Dispatch<SetStateAction<string>>;
};

const FilterCustomer: React.FC<Props> = ({
  search,
  setSearch,
  handleSearchOnChange,
  status,
  setStatus,
}) => {
  const canCreateCustomer = can(CREATE_CUSTOMER);
  const searchRef = useRef<HTMLInputElement>(null);

  const clearAll = () => {
    setSearch('');
    setStatus('');

    if (searchRef.current) {
      searchRef.current.value = '';
    }
  };

  const checkNoData = !(
    search ||
    (status !== undefined && status !== null && status !== '')
  );

  const filterFields: DropdownFilterItem[] = [
    {
      filterType: 'Status',
      setFilterData: setStatus,
      dataOptions: BOOLEAN_OPTIONS,
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
        {canCreateCustomer && (
          <AddNewRecord url={CUSTOMER_ONBOARDING} title="Add Customer" />
        )}
      </div>
    </div>
  );
};

export default FilterCustomer;
