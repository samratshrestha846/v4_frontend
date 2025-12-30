import React from 'react';
import { Card } from 'react-bootstrap';
import PageTitle from '@uhub/components/PageTitle';
import { can } from '@uhub/helpers/checkPermission';
import { DropdownFilterItem } from '@uhub/types/common';
import { useParams } from 'react-router-dom';
import { prepareDynamicUrl } from '@uhub/helpers';
import useFetchList from '../../../hooks/useFetchList';
import { FileListResponse, FileParams } from '../../types/Document';
import {
  CREATE_FILE,
  FILE_ADD,
  FILE_LIST,
  FOLDER_LIST,
  FOLDER_VIEW,
} from '../../constants/constant';
import useUrlFilters from '../../../hooks/useUrlFilters';
import { FilterConfigItem } from '../../../types/ditConnect';
import FilterSection from '../../../components/FilterSection';
import FileTable from './FileTable';

const ListFiles: React.FC = () => {
  const title: string = 'File';
  const canCreate = can(CREATE_FILE);
  const { id } = useParams();
  const [filters, setFilters] = useUrlFilters<FileParams>();
  const { data, isFetching } = useFetchList<FileListResponse>(
    prepareDynamicUrl(FILE_LIST, id),
    filters
  );

  const filterConfig: FilterConfigItem<FileParams>[] = [];

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
            label: `Folder's List`,
            path: FOLDER_LIST,
            active: false,
          },
          {
            label: `${title}'s List`,
            path: prepareDynamicUrl(FOLDER_VIEW, id),
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
            createPath={prepareDynamicUrl(FILE_ADD, id)}
            title={title}
          />
          <FileTable
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

export default ListFiles;
