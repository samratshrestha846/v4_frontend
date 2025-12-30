import React from 'react';
import { Card } from 'react-bootstrap';
import PageTitle from '@uhub/components/PageTitle';
import { can } from '@uhub/helpers/checkPermission';
import { DropdownFilterItem } from '@uhub/types/common';
import useFetchList from '../../hooks/useFetchList';
import { RoleListResponse, RoleParams } from '../types/Role';
import { ROLE, ROLE_ADD, ROLE_LIST, ACCESS_ROLE } from '../constants/constant';
import useUrlFilters from '../../hooks/useUrlFilters';
import RoleTable from './RoleTable';
import { FilterConfigItem } from '../../types/ditConnect';
import FilterSection from '../../components/FilterSection';

const ListRole: React.FC = () => {
  const title: string = 'Role';
  const canCreate = can(ACCESS_ROLE);
  const [filters, setFilters] = useUrlFilters<RoleParams>();

  const { data, isFetching } = useFetchList<RoleListResponse>(ROLE, filters);

  const filterConfig: FilterConfigItem<RoleParams>[] = [];

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
            path: ROLE_LIST,
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
            createPath={ROLE_ADD}
            title={title}
          />
          <RoleTable
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

export default ListRole;
