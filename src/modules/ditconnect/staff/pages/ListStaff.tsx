import React from 'react';
import { Card } from 'react-bootstrap';
import PageTitle from '@uhub/components/PageTitle';
import { DropdownFilterItem } from '@uhub/types/common';
import useFetchList from '../../hooks/useFetchList';
import {
  departmentOptions,
  StaffListResponse,
  StaffParams,
} from '../types/Staff';
import { STAFF, STAFF_LIST } from '../constants/constant';
import useUrlFilters from '../../hooks/useUrlFilters';
import StaffTable from './StaffTable';
import { FilterConfigItem } from '../../types/ditConnect';
import FilterSection from '../../components/FilterSection';
import { STATUS_OPTIONS } from '../../../../constants/statusOptions';
import useRolesDropdown from '../../hooks/useRolesDropdown';

const ListStaff: React.FC = () => {
  const title: string = 'Staff';
  const [filters, setFilters] = useUrlFilters<StaffParams>();

  const { data, isFetching } = useFetchList<StaffListResponse>(STAFF, filters);
  const { data: rolesOptions } = useRolesDropdown();

  const filterConfig: FilterConfigItem<StaffParams>[] = [
    {
      filterType: 'Status',
      key: 'status',
      isMulti: false,
      dataOptions: STATUS_OPTIONS ?? [],
    },
    {
      filterType: 'Role',
      key: 'role',
      isMulti: false,
      dataOptions: rolesOptions ?? [],
    },
    {
      filterType: 'Department',
      key: 'department',
      isMulti: false,
      dataOptions: departmentOptions ?? [],
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

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          {
            label: `${title} List`,
            path: STAFF_LIST,
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
            title={title}
          />
          <StaffTable
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

export default ListStaff;
