import React from 'react';
import { Card } from 'react-bootstrap';
import PageTitle from '@uhub/components/PageTitle';
import { can } from '@uhub/helpers/checkPermission';
import { DropdownFilterItem, LabelNumericValue } from '@uhub/types/common';
import ErrorMessage from '@uhub/components/ErrorMessage';
import useFetchList from '../../hooks/useFetchList';
import { ProductionListResponse, ProductionParams } from '../types/Production';
import {
  PRODUCTION,
  CREATE_PRODUCTION,
  PRODUCTION_ADD,
  PRODUCTION_LIST,
} from '../constants/constant';
import useUrlFilters from '../../hooks/useUrlFilters';
import ProductionTable from './ProductionTable';
import { FilterConfigItem } from '../../types/ditConnect';
import FilterSection from '../../components/FilterSection';
import useDitConnectLocationDropDown from '../../hooks/useDitConnectLocationDropDown';
import useDropDown from '../../hooks/useDropDown';
import { DROPDOWN_SUPPLEMENT } from '../../constants/apiUrls';

const ListProduction: React.FC = () => {
  const title: string = 'Production';
  const canCreate = can(CREATE_PRODUCTION);
  const [filters, setFilters] = useUrlFilters<ProductionParams>();

  const {
    data,
    isFetching: isFetchingSupplementProduction,
    isError: isErrorSupplementProduction,
  } = useFetchList<ProductionListResponse>(PRODUCTION, filters);

  const { locationOptions, isFetchingLocationOptions, isErrorLocationOptions } =
    useDitConnectLocationDropDown();

  const {
    data: supplmentOptions,
    isFetching: isFetchingSupplementOptions,
    isError: isErrorSupplementOptions,
  } = useDropDown<LabelNumericValue[]>(DROPDOWN_SUPPLEMENT);

  const filterConfig: FilterConfigItem<ProductionParams>[] = [
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
    isFetchingSupplementProduction;

  const isError =
    isErrorLocationOptions ||
    isErrorSupplementOptions ||
    isErrorSupplementProduction;

  if (isError) return <ErrorMessage />;

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          {
            label: `${title} List`,
            path: PRODUCTION_LIST,
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
            canCreate={canCreate}
            createPath={PRODUCTION_ADD}
            title={title}
          />
          <ProductionTable
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

export default ListProduction;
