import React from 'react';
import { Card } from 'react-bootstrap';
import PageTitle from '@uhub/components/PageTitle';
import { can } from '@uhub/helpers/checkPermission';
import { DropdownFilterItem } from '@uhub/types/common';
import useFetchList from '../../hooks/useFetchList';
import { PolicyListResponse, PolicyParams } from '../types/Policy';
import {
  POLICY,
  CREATE_POLICY,
  POLICY_ADD,
  POLICY_LIST,
} from '../constants/constant';
import useUrlFilters from '../../hooks/useUrlFilters';
import PolicyTable from './PolicyTable';
import { FilterConfigItem } from '../../types/ditConnect';
import FilterSection from '../../components/FilterSection';

const ListPolicy: React.FC = () => {
  const title: string = 'Policy';
  const canCreate = can(CREATE_POLICY);
  const [filters, setFilters] = useUrlFilters<PolicyParams>();

  const { data, isFetching } = useFetchList<PolicyListResponse>(
    POLICY,
    filters
  );

  const filterConfig: FilterConfigItem<PolicyParams>[] = [];

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
            path: POLICY_LIST,
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
            createPath={POLICY_ADD}
            title={title}
          />
          <PolicyTable
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

export default ListPolicy;
