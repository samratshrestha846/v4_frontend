import React, { SetStateAction, useRef } from 'react';
import { Button } from 'react-bootstrap';
import SearchBox from '../../../../components/SearchBox';
import FilterDropdownSection from '../../../../components/FilterDropdownSection';
import {
  DropdownFilterItem,
  LabelValueDropdown,
} from '../../../../types/common';
import useCustomersDropdown from '../../../../hooks/dropdown/useCustomersDropdown';
import usePropertiesDropdown from '../../../../hooks/dropdown/usePropertiesDropdown';
import useUdoseSitesDropdown from '../../../../hooks/dropdown/useUdoseSitesDropdown';

type Props = {
  search: any;
  // eslint-disable-next-line no-unused-vars
  handleSearchOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setSearch: React.Dispatch<SetStateAction<string>>;
  customer: number | undefined;
  setCustomer: React.Dispatch<SetStateAction<number | undefined>>;
  property: number | undefined;
  setProperty: React.Dispatch<SetStateAction<number | undefined>>;
  sampleType: number | undefined;
  setSampleType: React.Dispatch<SetStateAction<number | undefined>>;
  site: number | undefined;
  setSite: React.Dispatch<SetStateAction<number | undefined>>;
  labSampleTypesOptions: LabelValueDropdown[];
  handleExportReport: () => void;
};

const LabSampleFilterSection: React.FC<Props> = ({
  search,
  handleSearchOnChange,
  setSearch,
  customer,
  setCustomer,
  property,
  setProperty,
  sampleType,
  setSampleType,
  site,
  setSite,

  labSampleTypesOptions,
  handleExportReport,
}) => {
  // Search Ref
  const searchRef = useRef<HTMLInputElement>(null);

  const { customersDropdown: customersOptions } = useCustomersDropdown();
  const { data: propertiesOptions } = usePropertiesDropdown(true, customer);
  const { data: sitesOptions } = useUdoseSitesDropdown(property);

  const clearAll = () => {
    setSampleType(undefined);
    setCustomer(undefined);
    setProperty(undefined);
    setSite(undefined);
    setSearch('');

    if (searchRef.current) {
      searchRef.current.value = '';
    }
  };

  const checkNoData = !(search || sampleType || customer || property || site);

  // Filter Fields
  const filterFields: DropdownFilterItem[] = [
    {
      filterType: 'Sample Type',
      setFilterData: setSampleType,
      dataOptions: labSampleTypesOptions,
      isMulti: false,
      data: sampleType,
    },
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
      filterType: 'Site',
      setFilterData: setSite,
      dataOptions: sitesOptions,
      isMulti: false,
      data: site,
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
        <Button
          variant="outline"
          onClick={handleExportReport}
          className="mb-1 btn btn-sm btn-outline-secondary m-0">
          <i className="bx bxs-file-export me-1" />
          Export
        </Button>
      </div>
    </div>
  );
};

export default LabSampleFilterSection;
