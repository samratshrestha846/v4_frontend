import React from 'react';
import { Card } from 'react-bootstrap';
import PageTitle from '@uhub/components/PageTitle';
import { can } from '@uhub/helpers/checkPermission';
import { DropdownFilterItem } from '@uhub/types/common';
import useFetchList from '../../../hooks/useFetchList';
import {
  FOLDERS,
  CREATE_FOLDER,
  FOLDER_ADD,
  FOLDER_LIST,
} from '../../constants/constant';
import useUrlFilters from '../../../hooks/useUrlFilters';
import { FilterConfigItem } from '../../../types/ditConnect';
import FilterSection from '../../../components/FilterSection';
import FolderTable from './FolderTable';
import { FolderListResponse, FolderParams } from '../../types/Document';

const ListFolder: React.FC = () => {
  const title: string = 'Folder';
  const canCreate = can(CREATE_FOLDER);
  const [filters, setFilters] = useUrlFilters<FolderParams>();

  const { data, isFetching } = useFetchList<FolderListResponse>(
    FOLDERS,
    filters
  );

  const filterConfig: FilterConfigItem<FolderParams>[] = [];

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
            label: `${title}'s List`,
            path: FOLDER_LIST,
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
            createPath={FOLDER_ADD}
            title={title}
          />
          <FolderTable
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

export default ListFolder;
