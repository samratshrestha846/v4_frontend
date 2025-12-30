import React from 'react';
import { Card } from 'react-bootstrap';
import PageTitle from '@uhub/components/PageTitle';
import { DropdownFilterItem, LabelValue } from '@uhub/types/common';
import useDropDown from '../../hooks/useDropDown';
import FilterSection from '../../components/FilterSection';
import ListTable from './ListTable';
import useFetchList from '../../hooks/useFetchList';
import {
  ProductionRequestListResponse,
  ProductionRequestQueryParam,
} from './types/productionRequest';
import { DROPDOWN_SUPPLEMENT } from '../../constants/apiUrls';
import useUrlFilters from '../../hooks/useUrlFilters';
import { FilterConfigItem } from '../../types/ditConnect';
import { productionFacilityOptions } from './types/filter';
import {
  PRODUCTION_REQUEST,
  PRODUCTION_REQUEST_LIST,
} from './constants/constant';
import useDitConnectLocationDropDown from '../../hooks/useDitConnectLocationDropDown';

const ProdutionRequestList: React.FC = () => {
  const title: string = 'Production Request';

  const { locationOptions, isFetchingLocationOptions, isErrorLocationOptions } =
    useDitConnectLocationDropDown();
  const { data: supplmentOptions, isFetching: isFetchingSupplementOptions } =
    useDropDown<LabelValue[]>(DROPDOWN_SUPPLEMENT);
  const [filters, setFilters] = useUrlFilters<ProductionRequestQueryParam>();

  const filterConfig: FilterConfigItem<ProductionRequestQueryParam>[] = [
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
      dataOptions: productionFacilityOptions,
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

  const { data, isFetching, isError } =
    useFetchList<ProductionRequestListResponse>(PRODUCTION_REQUEST, filters);
  return (
    <>
      <PageTitle
        breadCrumbItems={[
          {
            label: `${title} List`,
            path: PRODUCTION_REQUEST_LIST,
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
          />
          <ListTable
            isError={isError || isErrorLocationOptions}
            isFetching={
              isFetching ||
              isFetchingLocationOptions ||
              isFetchingSupplementOptions
            }
            data={data}
            filters={filters}
            setFilters={setFilters}
          />
        </Card.Body>
      </Card>
    </>
  );
};

export default ProdutionRequestList;
