import React from 'react';
import { useParams } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { prepareDynamicUrl } from '@uhub/helpers';
import PageTitle from '@uhub/components/PageTitle';
import { DropdownFilterItem, LabelValue } from '@uhub/types/common';
import useFetchList from '../../../hooks/useFetchList';

import { GROUP_SUMMARY, SUMMARY_LIST } from '../constants/constant';

import useUrlFilters from '../../../hooks/useUrlFilters';
import { FilterConfigItem } from '../../../types/ditConnect';
import FilterSection from '../../../components/FilterSection';
import { DROPDOWN_LOCATION } from '../../../constants/apiUrls';
import useDropDown from '../../../hooks/useDropDown';
import GroupSummaryTable from './GroupSummaryTable';
import {
  GroupSummaryListResponse,
  GroupSummaryParams,
} from '../types/GroupSummary';

const ListGroupSummary: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const title: string = id ?? '';
  const { data: locationOptions, isFetching: isFetchingLocationOptions } =
    useDropDown<LabelValue[]>(DROPDOWN_LOCATION);

  const [filters, setFilters] = useUrlFilters<GroupSummaryParams>();

  const { data, isFetching } = useFetchList<GroupSummaryListResponse>(
    prepareDynamicUrl(GROUP_SUMMARY, id),
    filters
  );

  const filterConfig: FilterConfigItem<GroupSummaryParams>[] = [
    {
      filterType: 'Locations',
      key: 'location_id',
      isMulti: false,
      dataOptions: locationOptions,
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
    <>
      <PageTitle
        breadCrumbItems={[
          {
            label: `Stock Availability`,
            path: SUMMARY_LIST,
            active: false,
          },
          {
            label: `${title}`,
            path: SUMMARY_LIST,
            active: true,
          },
        ]}
        title={title}
      />

      <Card>
        <Card.Body>
          <FilterSection
            filterFields={filterFields}
            filters={filters}
            setFilters={setFilters}
            canCreate={false}
            title={title}
          />
          <GroupSummaryTable
            isFetching={isFetching || isFetchingLocationOptions}
            data={data}
            filters={filters}
            setFilters={setFilters}
          />
        </Card.Body>
      </Card>
    </>
  );
};

export default ListGroupSummary;
