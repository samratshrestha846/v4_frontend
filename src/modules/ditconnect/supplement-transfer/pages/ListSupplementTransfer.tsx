import React from 'react';
import { Card } from 'react-bootstrap';
import PageTitle from '@uhub/components/PageTitle';
import { DropdownFilterItem, LabelValueDropdown } from '@uhub/types/common';
import ErrorMessage from '@uhub/components/ErrorMessage';
import useFetchList from '../../hooks/useFetchList';
import {
  SupplementTransferListResponse,
  SupplementTransferParams,
} from '../types/SupplementTransfer';
import {
  SUPPLEMENT_TRANSFER,
  SUPPLEMENT_TRANSFER_LIST,
  SUPPLEMENT_STATUS_OPTIONS,
} from '../constants/constant';
import useUrlFilters from '../../hooks/useUrlFilters';
import SupplementTransferTable from './SupplementTransferTable';
import { FilterConfigItem } from '../../types/ditConnect';
import FilterSection from '../../components/FilterSection';
import useDitConnectLocationDropDown from '../../hooks/useDitConnectLocationDropDown';
import useDropDown from '../../hooks/useDropDown';
import { DROPDOWN_SUPPLEMENT } from '../../constants/apiUrls';

const ListSupplementTransfer: React.FC = () => {
  const title: string = 'Transfer';
  const [filters, setFilters] = useUrlFilters<SupplementTransferParams>();

  const {
    data,
    isFetching: isFetchingSupplementTransfer,
    isError: isErrorSupplementTransfer,
  } = useFetchList<SupplementTransferListResponse>(
    SUPPLEMENT_TRANSFER,
    filters
  );

  const { locationOptions, isFetchingLocationOptions, isErrorLocationOptions } =
    useDitConnectLocationDropDown();
  const {
    data: supplmentOptions,
    isFetching: isFetchingSupplementOptions,
    isError: isErrorSupplementOptions,
  } = useDropDown<LabelValueDropdown[]>(DROPDOWN_SUPPLEMENT);

  const filterConfig: FilterConfigItem<SupplementTransferParams>[] = [
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
    isFetchingSupplementTransfer;

  const isError =
    isErrorLocationOptions ||
    isErrorSupplementOptions ||
    isErrorSupplementTransfer;

  if (isError) return <ErrorMessage />;

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          {
            label: `${title} List`,
            path: SUPPLEMENT_TRANSFER_LIST,
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
          <SupplementTransferTable
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

export default ListSupplementTransfer;
