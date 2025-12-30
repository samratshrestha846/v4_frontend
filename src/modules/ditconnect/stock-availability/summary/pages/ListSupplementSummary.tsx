import React from 'react';
import { useParams } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { prepareDynamicUrl } from '@uhub/helpers';
import PageTitle from '@uhub/components/PageTitle';
import { DropdownFilterItem, LabelValue } from '@uhub/types/common';
import useFetchList from '../../../hooks/useFetchList';

import {
  GROUP_SUMMARY_LIST,
  SUMMARY_LIST,
  SUPPLEMENT_SUMMARY,
  SUPPLEMENT_SUMMARY_LIST,
} from '../constants/constant';

import useUrlFilters from '../../../hooks/useUrlFilters';
import { FilterConfigItem } from '../../../types/ditConnect';
import FilterSection from '../../../components/FilterSection';
import { DROPDOWN_LOCATION } from '../../../constants/apiUrls';
import useDropDown from '../../../hooks/useDropDown';
import {
  SupplementSummaryListResponse,
  SupplementSummaryParams,
} from '../types/SupplementSummary';
import SupplementSummaryTable from './SupplementSummaryTable';

const ListSupplementSummary: React.FC = () => {
  const { id } = useParams();
  const { data: locationOptions, isFetching: isFetchingLocationOptions } =
    useDropDown<LabelValue[]>(DROPDOWN_LOCATION);

  const [filters, setFilters] = useUrlFilters<SupplementSummaryParams>();

  const { data, isFetching } = useFetchList<SupplementSummaryListResponse>(
    prepareDynamicUrl(SUPPLEMENT_SUMMARY, id),
    filters
  );
  const supplement = data?.data[0]?.supplement;
  const title = supplement?.name ?? 'Stock Availability Summary';

  const filterConfig: FilterConfigItem<SupplementSummaryParams>[] = [
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
            label: supplement?.group ?? 'Group',
            path: prepareDynamicUrl(GROUP_SUMMARY_LIST, supplement?.group),
            active: false,
          },
          {
            label: `${title}`,
            path: SUPPLEMENT_SUMMARY_LIST,
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
          <SupplementSummaryTable
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

export default ListSupplementSummary;
