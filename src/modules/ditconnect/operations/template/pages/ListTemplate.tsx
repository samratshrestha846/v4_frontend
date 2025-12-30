import React from 'react';
import { Card } from 'react-bootstrap';
import PageTitle from '@uhub/components/PageTitle';
import { can } from '@uhub/helpers/checkPermission';
import { DropdownFilterItem } from '@uhub/types/common';
import useUserDropDownByPlatform from '@uhub/hooks/dropdown/useUserDropDownByPlatform';
import useFetchList from '../../../hooks/useFetchList';
import { TemplateListResponse, TemplateParams } from '../types/Template';
import {
  TEMPLATE,
  CREATE_TEMPLATE,
  TEMPLATE_ADD,
  TEMPLATE_LIST,
} from '../constants/constant';
import useUrlFilters from '../../../hooks/useUrlFilters';
import TemplateTable from './TemplateTable';
import { FilterConfigItem } from '../../../types/ditConnect';
import FilterSection from '../../../components/FilterSection';
import { DIT_CONNECT_PLATFORM } from '../../../constants/authKey';

const ListTemplate: React.FC = () => {
  const title: string = 'Template';
  const canCreate = can(CREATE_TEMPLATE);
  const [filters, setFilters] = useUrlFilters<TemplateParams>();
  const {
    data: userOptions,
    isFetching: isFetchingUserOptions,
    isError: isErrorFetchingUserOptions,
  } = useUserDropDownByPlatform({ platform: DIT_CONNECT_PLATFORM });
  const { data, isFetching, isError } = useFetchList<TemplateListResponse>(
    TEMPLATE,
    filters
  );

  const filterConfig: FilterConfigItem<TemplateParams>[] = [
    {
      filterType: 'User',
      key: 'user_id',
      isMulti: false,
      dataOptions: userOptions ?? [],
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
            path: TEMPLATE_LIST,
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
            createPath={TEMPLATE_ADD}
            title={title}
          />
          <TemplateTable
            isFetching={isFetching || isFetchingUserOptions}
            isError={isError || isErrorFetchingUserOptions}
            data={data}
            filters={filters}
            setFilters={setFilters}
          />
        </Card.Body>
      </Card>
    </>
  );
};

export default ListTemplate;
