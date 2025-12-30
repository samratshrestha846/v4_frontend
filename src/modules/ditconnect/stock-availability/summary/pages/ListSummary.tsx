import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import { DropdownFilterItem, LabelValue } from '@uhub/types/common';
import useFetchList from '../../../hooks/useFetchList';

import { SUMMARY } from '../constants/constant';

import { FilterConfigItem } from '../../../types/ditConnect';
import FilterSection from '../../../components/FilterSection';
import { DROPDOWN_LOCATION } from '../../../constants/apiUrls';
import useDropDown from '../../../hooks/useDropDown';
import supplementGroupOptions from '../types/filter';
import { SummaryListResponse, SummaryParams } from '../types/Summary';
import SummaryTable from './SummaryTable';

const ListSummary: React.FC = () => {
  const title: string = 'Stock Availability';
  const {
    data: locationOptions,
    isFetching: isFetchingLocationOptions,
    isError: isErrorLocationOptions,
  } = useDropDown<LabelValue[]>(DROPDOWN_LOCATION);

  // use state variable for the page with tabs and no params set on url
  const [filters, setFilters] = useState<Record<string, any>>({});

  const { data, isFetching } = useFetchList<SummaryListResponse>(
    SUMMARY,
    filters
  );

  const filterConfig: FilterConfigItem<SummaryParams>[] = [
    {
      filterType: 'Locations',
      key: 'location_id',
      isMulti: false,
      dataOptions: locationOptions,
    },
    {
      filterType: 'Group',
      key: 'group',
      isMulti: false,
      dataOptions: supplementGroupOptions,
    },
  ];

  const filterFields: DropdownFilterItem[] = filterConfig.map((f) => ({
    filterType: f.filterType,
    dataOptions: f.dataOptions,
    isMulti: f.isMulti,
    data: filters[f.key],
    setFilterData: (val: any) =>
      setFilters({
        ...filters,
        [f.key]: val,
      }),
  }));

  return (
    <Card>
      <Card.Body>
        <FilterSection
          filterFields={filterFields}
          filters={filters}
          setFilters={setFilters}
          canCreate={false}
          title={title}
        />
        <SummaryTable
          isFetching={isFetching || isFetchingLocationOptions}
          isError={isErrorLocationOptions}
          data={data}
          filters={filters}
          setFilters={setFilters}
        />
      </Card.Body>
    </Card>
  );
};

export default ListSummary;
