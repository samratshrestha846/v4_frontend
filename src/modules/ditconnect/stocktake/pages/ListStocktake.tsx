import React from 'react';
import { Card } from 'react-bootstrap';
import PageTitle from '@uhub/components/PageTitle';
import { can } from '@uhub/helpers/checkPermission';
import { DropdownFilterItem } from '@uhub/types/common';
import ErrorMessage from '@uhub/components/ErrorMessage';
import useUserDropDownByPlatform from '@uhub/hooks/dropdown/useUserDropDownByPlatform';
import useFetchList from '../../hooks/useFetchList';
import { StocktakeListResponse, StocktakeParams } from '../types/Stocktake';
import {
  STOCKTAKE,
  CREATE_STOCKTAKE,
  STOCKTAKE_ADD,
  STOCKTAKE_LIST,
  STOCKTAKE_STATUS,
} from '../constants/constant';
import useUrlFilters from '../../hooks/useUrlFilters';
import StocktakeTable from './StocktakeTable';
import { FilterConfigItem } from '../../types/ditConnect';
import FilterSection from '../../components/FilterSection';
import useDitConnectLocationDropDown from '../../hooks/useDitConnectLocationDropDown';

import { DIT_CONNECT_PLATFORM } from '../../constants/authKey';

const ListStocktake: React.FC = () => {
  const title: string = 'Stocktake';
  const canCreate = can(CREATE_STOCKTAKE);
  const [filters, setFilters] = useUrlFilters<StocktakeParams>();

  const {
    data,
    isFetching: isFetchingStocktake,
    isError: isErrorStocktake,
  } = useFetchList<StocktakeListResponse>(STOCKTAKE, filters);

  const { locationOptions, isFetchingLocationOptions, isErrorLocationOptions } =
    useDitConnectLocationDropDown();

  const {
    data: userOptions,
    isFetching: isFetchingUserOptions,
    isError: isErrorUserOptions,
  } = useUserDropDownByPlatform({
    platform: DIT_CONNECT_PLATFORM,
  });

  const filterConfig: FilterConfigItem<StocktakeParams>[] = [
    {
      filterType: 'Location',
      key: 'location_id',
      isMulti: false,
      dataOptions: locationOptions ?? [],
    },
    {
      filterType: 'User',
      key: 'user_id',
      isMulti: false,
      dataOptions: userOptions ?? [],
    },
    {
      filterType: 'Status',
      key: 'status',
      isMulti: false,
      dataOptions: STOCKTAKE_STATUS,
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
    isFetchingStocktake || isFetchingLocationOptions || isFetchingUserOptions;

  const isError =
    isErrorStocktake || isErrorLocationOptions || isErrorUserOptions;

  if (isError) return <ErrorMessage />;

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          {
            label: `${title} List`,
            path: STOCKTAKE_LIST,
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
            createPath={STOCKTAKE_ADD}
            title={title}
          />
          <StocktakeTable
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

export default ListStocktake;
