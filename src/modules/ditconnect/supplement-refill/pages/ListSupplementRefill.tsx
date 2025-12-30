import React from 'react';
import { Card } from 'react-bootstrap';
import PageTitle from '@uhub/components/PageTitle';
import { DropdownFilterItem, LabelNumericValue } from '@uhub/types/common';
import ErrorMessage from '@uhub/components/ErrorMessage';
import useFetchList from '../../hooks/useFetchList';
import {
  SupplementRefillListResponse,
  SupplementRefillParams,
} from '../types/SupplementRefill';
import {
  SUPPLEMENT_REFILL,
  SUPPLEMENT_REFILL_LIST,
} from '../constants/constant';
import useUrlFilters from '../../hooks/useUrlFilters';
import SupplementRefillTable from './SupplementRefillTable';
import { FilterConfigItem } from '../../types/ditConnect';
import FilterSection from '../../components/FilterSection';
import useDitConnectLocationDropDown from '../../hooks/useDitConnectLocationDropDown';
import useDropDown from '../../hooks/useDropDown';
import { DROPDOWN_SUPPLEMENT } from '../../constants/apiUrls';
import { SUPPLEMENT_STATUS_OPTIONS } from '../../supplement-transfer/constants/constant';

const ListSupplementRefill: React.FC = () => {
  const title: string = 'Delivery';
  const [filters, setFilters] = useUrlFilters<SupplementRefillParams>();

  const {
    data,
    isFetching: isFetchingSupplementRefill,
    isError: isErrorSupplementRefill,
  } = useFetchList<SupplementRefillListResponse>(SUPPLEMENT_REFILL, filters);

  const { locationOptions, isFetchingLocationOptions, isErrorLocationOptions } =
    useDitConnectLocationDropDown();

  const {
    data: supplmentOptions,
    isFetching: isFetchingSupplementOptions,
    isError: isErrorSupplementOptions,
  } = useDropDown<LabelNumericValue[]>(DROPDOWN_SUPPLEMENT);

  const filterConfig: FilterConfigItem<SupplementRefillParams>[] = [
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
    isFetchingSupplementRefill;

  const isError =
    isErrorLocationOptions ||
    isErrorSupplementOptions ||
    isErrorSupplementRefill;

  if (isError) return <ErrorMessage />;

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          {
            label: `${title} List`,
            path: SUPPLEMENT_REFILL_LIST,
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
          <SupplementRefillTable
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

export default ListSupplementRefill;
