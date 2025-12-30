import React from 'react';
import { Card } from 'react-bootstrap';
import PageTitle from '@uhub/components/PageTitle';
import { can } from '@uhub/helpers/checkPermission';
import { DropdownFilterItem } from '@uhub/types/common';
import useFetchList from '../../hooks/useFetchList';
import {
  SupplementListResponse,
  SupplementParams,
  supplementTagsOptions,
} from '../types/Supplement';
import {
  SUPPLEMENT,
  CREATE_SUPPLEMENT,
  SUPPLEMENT_ADD,
  SUPPLEMENT_LIST,
} from '../constants/constant';
import useUrlFilters from '../../hooks/useUrlFilters';
import SupplementTable from './SupplementTable';
import { FilterConfigItem } from '../../types/ditConnect';
import FilterSection from '../../components/FilterSection';

const ListSupplement: React.FC = () => {
  const title: string = 'Supplement';
  const canCreate = can(CREATE_SUPPLEMENT);
  const [filters, setFilters] = useUrlFilters<SupplementParams>();

  const { data, isFetching } = useFetchList<SupplementListResponse>(
    SUPPLEMENT,
    filters
  );

  const filterConfig: FilterConfigItem<SupplementParams>[] = [
    {
      filterType: 'Tags',
      key: 'tags',
      isMulti: false,
      dataOptions: supplementTagsOptions ?? [],
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
            path: SUPPLEMENT_LIST,
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
            createPath={SUPPLEMENT_ADD}
            title={title}
          />
          <SupplementTable
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

export default ListSupplement;
