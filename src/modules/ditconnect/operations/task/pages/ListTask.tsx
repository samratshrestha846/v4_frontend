import React from 'react';
import useUserDropDownByPlatform from '@uhub/hooks/dropdown/useUserDropDownByPlatform';
import { Card } from 'react-bootstrap';
import PageTitle from '@uhub/components/PageTitle';
import { can } from '@uhub/helpers/checkPermission';
import { DropdownFilterItem } from '@uhub/types/common';
import useFetchList from '../../../hooks/useFetchList';
import { TaskListResponse, TaskParams, taskStatusOptions } from '../types/Task';
import { TASK, CREATE_TASK, TASK_ADD, TASK_LIST } from '../constants/constant';
import useUrlFilters from '../../../hooks/useUrlFilters';
import TaskTable from './TaskTable';
import { FilterConfigItem } from '../../../types/ditConnect';
import FilterSection from '../../../components/FilterSection';
import { DIT_CONNECT_PLATFORM } from '../../../constants/authKey';

const ListTask: React.FC = () => {
  const title: string = 'Task';
  const canCreate = can(CREATE_TASK);
  const [filters, setFilters] = useUrlFilters<TaskParams>();
  const {
    data: userOptions,
    isFetching: isFetchingUserOptions,
    isError: isErrorFetchingUserOptions,
  } = useUserDropDownByPlatform({ platform: DIT_CONNECT_PLATFORM });
  const { data, isFetching } = useFetchList<TaskListResponse>(TASK, filters);

  const filterConfig: FilterConfigItem<TaskParams>[] = [
    {
      filterType: 'Created By',
      key: 'created_by',
      isMulti: false,
      dataOptions: userOptions ?? [],
    },
    {
      filterType: 'Assigned To',
      key: 'assigned_to',
      isMulti: false,
      dataOptions: userOptions ?? [],
    },
    {
      filterType: 'Status',
      key: 'status',
      isMulti: false,
      dataOptions: taskStatusOptions ?? [],
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
            path: TASK_LIST,
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
            createPath={TASK_ADD}
            title={title}
          />
          <TaskTable
            isError={isErrorFetchingUserOptions}
            isFetching={isFetching || isFetchingUserOptions}
            data={data}
            filters={filters}
            setFilters={setFilters}
          />
        </Card.Body>
      </Card>
    </>
  );
};

export default ListTask;
