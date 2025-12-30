import React from 'react';
import { Card } from 'react-bootstrap';
import PageTitle from '@uhub/components/PageTitle';
import { DropdownFilterItem, LabelNumericValue } from '@uhub/types/common';
import ErrorMessage from '@uhub/components/ErrorMessage';
import useFetchList from '../../hooks/useFetchList';
import {
  SupplementSaleListResponse,
  SupplementSaleParams,
} from '../types/SupplementSale';
import { SUPPLEMENT_SALE, SUPPLEMENT_SALE_LIST } from '../constants/constant';
import useUrlFilters from '../../hooks/useUrlFilters';
import SupplementSaleTable from './SupplementSaleTable';
import { FilterConfigItem } from '../../types/ditConnect';
import FilterSection from '../../components/FilterSection';
import useDitConnectLocationDropDown from '../../hooks/useDitConnectLocationDropDown';
import useDropDown from '../../hooks/useDropDown';
import { DROPDOWN_SUPPLEMENT } from '../../constants/apiUrls';
import { SUPPLEMENT_STATUS_OPTIONS } from '../../supplement-transfer/constants/constant';

const ListSupplementSale: React.FC = () => {
  const title: string = 'Sales PAYG';
  const [filters, setFilters] = useUrlFilters<SupplementSaleParams>();

  const {
    data,
    isFetching: isFetchingSupplementSale,
    isError: isErrorSupplementSale,
  } = useFetchList<SupplementSaleListResponse>(SUPPLEMENT_SALE, filters);

  const { locationOptions, isFetchingLocationOptions, isErrorLocationOptions } =
    useDitConnectLocationDropDown();

  const {
    data: supplmentOptions,
    isFetching: isFetchingSupplementOptions,
    isError: isErrorSupplementOptions,
  } = useDropDown<LabelNumericValue[]>(DROPDOWN_SUPPLEMENT);

  const filterConfig: FilterConfigItem<SupplementSaleParams>[] = [
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
    isFetchingSupplementSale;

  const isError =
    isErrorLocationOptions || isErrorSupplementOptions || isErrorSupplementSale;

  if (isError) return <ErrorMessage />;

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          {
            label: `${title} List`,
            path: SUPPLEMENT_SALE_LIST,
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
          <SupplementSaleTable
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

export default ListSupplementSale;
