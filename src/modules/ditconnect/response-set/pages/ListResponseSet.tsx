import React from 'react';
import { Card } from 'react-bootstrap';
import PageTitle from '@uhub/components/PageTitle';
import { can } from '@uhub/helpers/checkPermission';
import { DropdownFilterItem } from '@uhub/types/common';
import useFetchList from '../../hooks/useFetchList';
import {
  ResponseSetListResponse,
  ResponseSetParams,
} from '../types/ResponseSet';
import {
  RESPONSE_SET,
  CREATE_RESPONSE_SET,
  RESPONSE_SET_ADD,
  RESPONSE_SET_LIST,
} from '../constants/constant';
import useUrlFilters from '../../hooks/useUrlFilters';
import ResponseSetTable from './ResponseSetTable';
import { FilterConfigItem } from '../../types/ditConnect';
import FilterSection from '../../components/FilterSection';

const ListResponseSet: React.FC = () => {
  const title: string = 'Response Set';
  const canCreate = can(CREATE_RESPONSE_SET);
  const [filters, setFilters] = useUrlFilters<ResponseSetParams>();

  const { data, isFetching } = useFetchList<ResponseSetListResponse>(
    RESPONSE_SET,
    filters
  );

  const filterConfig: FilterConfigItem<ResponseSetParams>[] = [];

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
            label: `${title} List`,
            path: RESPONSE_SET_LIST,
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
            createPath={RESPONSE_SET_ADD}
            title={title}
          />
          <ResponseSetTable
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

export default ListResponseSet;
