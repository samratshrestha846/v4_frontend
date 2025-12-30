import React from 'react';
import { Card } from 'react-bootstrap';
import PageTitle from '@uhub/components/PageTitle';
import { can } from '@uhub/helpers/checkPermission';
import { DropdownFilterItem } from '@uhub/types/common';
import useFetchList from '../../hooks/useFetchList';
import {
  MessageListResponse,
  MessageParams,
  messageTypeOptions,
} from '../types/Message';
import {
  MESSAGE,
  CREATE_MESSAGE,
  MESSAGE_ADD,
  MESSAGE_LIST,
} from '../constants/constant';
import useUrlFilters from '../../hooks/useUrlFilters';
import MessageTable from './MessageTable';
import { FilterConfigItem } from '../../types/ditConnect';
import FilterSection from '../../components/FilterSection';
import { STATUS_OPTIONS_STRING } from '../../constants/common';

const ListMessage: React.FC = () => {
  const title: string = 'Message';
  const canCreate = can(CREATE_MESSAGE);
  const [filters, setFilters] = useUrlFilters<MessageParams>();

  const { data, isFetching } = useFetchList<MessageListResponse>(
    MESSAGE,
    filters
  );

  const filterConfig: FilterConfigItem<MessageParams>[] = [
    {
      filterType: 'Status',
      key: 'status',
      isMulti: false,
      dataOptions: STATUS_OPTIONS_STRING ?? [],
    },
    {
      filterType: 'Type',
      key: 'type',
      isMulti: false,
      dataOptions: messageTypeOptions ?? [],
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
            path: MESSAGE_LIST,
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
            createPath={MESSAGE_ADD}
            title={title}
          />
          <MessageTable
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

export default ListMessage;
