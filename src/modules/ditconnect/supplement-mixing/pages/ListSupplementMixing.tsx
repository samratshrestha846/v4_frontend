import React from 'react';
import { Card } from 'react-bootstrap';
import PageTitle from '@uhub/components/PageTitle';
import { DropdownFilterItem, LabelValueDropdown } from '@uhub/types/common';
import ErrorMessage from '@uhub/components/ErrorMessage';
import useFetchList from '../../hooks/useFetchList';
import {
  SupplementMixingListResponse,
  SupplementMixingParams,
} from '../types/SupplementMixing';
import {
  SUPPLEMENT_MIXING,
  SUPPLEMENT_MIXING_LIST,
} from '../constants/constant';
import useUrlFilters from '../../hooks/useUrlFilters';
import SupplementMixingTable from './SupplementMixingTable';
import { FilterConfigItem } from '../../types/ditConnect';
import FilterSection from '../../components/FilterSection';
import useDitConnectLocationDropDown from '../../hooks/useDitConnectLocationDropDown';
import useDropDown from '../../hooks/useDropDown';
import { DROPDOWN_SUPPLEMENT } from '../../constants/apiUrls';
import { SUPPLEMENT_STATUS_OPTIONS } from '../../supplement-transfer/constants/constant';

const ListSupplementMixing: React.FC = () => {
  const title: string = 'Mixing';
  const [filters, setFilters] = useUrlFilters<SupplementMixingParams>();

  const {
    data,
    isFetching: isFetchingSupplementMixing,
    isError: isErrorSupplementMixing,
  } = useFetchList<SupplementMixingListResponse>(SUPPLEMENT_MIXING, filters);

  const { locationOptions, isFetchingLocationOptions, isErrorLocationOptions } =
    useDitConnectLocationDropDown();

  const {
    data: supplmentOptions,
    isFetching: isFetchingSupplementOptions,
    isError: isErrorSupplementOptions,
  } = useDropDown<LabelValueDropdown[]>(DROPDOWN_SUPPLEMENT);

  const filterConfig: FilterConfigItem<SupplementMixingParams>[] = [
    {
      filterType: 'Locations',
      key: 'location_id',
      isMulti: false,
      dataOptions: locationOptions,
    },
    {
      filterType: 'Supplements',
      key: 'supplement_id',
      isMulti: false,
      dataOptions: supplmentOptions,
    },
    {
      filterType: 'Status',
      key: 'status',
      isMulti: false,
      dataOptions: SUPPLEMENT_STATUS_OPTIONS,
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

  const isFetching =
    isFetchingLocationOptions ||
    isFetchingSupplementOptions ||
    isFetchingSupplementMixing;

  const isError =
    isErrorLocationOptions ||
    isErrorSupplementOptions ||
    isErrorSupplementMixing;

  if (isError) return <ErrorMessage />;

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          {
            label: `${title} List`,
            path: SUPPLEMENT_MIXING_LIST,
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
            createPath={undefined}
            title={title}
          />
          <SupplementMixingTable
            isFetching={isFetching}
            data={data}
            filters={filters}
            setFilters={setFilters}
          />
        </Card.Body>
      </Card>
    </>
  );
};

export default ListSupplementMixing;
