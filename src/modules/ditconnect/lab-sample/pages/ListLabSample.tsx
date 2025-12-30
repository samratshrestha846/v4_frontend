import React from 'react';
import { Card } from 'react-bootstrap';
import PageTitle from '@uhub/components/PageTitle';
import { can } from '@uhub/helpers/checkPermission';
import { DropdownFilterItem } from '@uhub/types/common';
import ErrorMessage from '@uhub/components/ErrorMessage';
import useLabSampleTypesDropdown from '@uhub/hooks/dropdown/useLabSampleTypesDropdown';
import useFetchList from '../../hooks/useFetchList';
import { LabSampleListResponse, LabSampleParams } from '../types/LabSample';
import {
  LAB_SAMPLE,
  CREATE_LAB_SAMPLE,
  LAB_SAMPLE_ADD,
  LAB_SAMPLE_LIST,
  LAB_SAMPLE_STATUS_OPTIONS,
} from '../constants/constant';
import useUrlFilters from '../../hooks/useUrlFilters';
import LabSampleTable from './LabSampleTable';
import { FilterConfigItem } from '../../types/ditConnect';
import FilterSection from '../../components/FilterSection';

const ListLabSample: React.FC = () => {
  const title: string = 'Lab Sample';
  const canCreate = can(CREATE_LAB_SAMPLE);
  const [filters, setFilters] = useUrlFilters<LabSampleParams>();

  const {
    data,
    isFetching: isFetchingLabSample,
    isError: isErrorLabSample,
  } = useFetchList<LabSampleListResponse>(LAB_SAMPLE, filters);

  const {
    data: supplmentOptions,
    isFetching: isFetchingSupplementOptions,
    isError: isErrorSupplementOptions,
  } = useLabSampleTypesDropdown();

  const filterConfig: FilterConfigItem<LabSampleParams>[] = [
    {
      filterType: 'Sample Types',
      key: 'sample_type_id',
      isMulti: false,
      dataOptions: supplmentOptions,
    },
    {
      filterType: 'Status',
      key: 'status',
      isMulti: false,
      dataOptions: LAB_SAMPLE_STATUS_OPTIONS,
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

  const isFetching = isFetchingLabSample || isFetchingSupplementOptions;

  const isError = isErrorLabSample || isErrorSupplementOptions;

  if (isError) return <ErrorMessage />;

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          {
            label: `${title} List`,
            path: LAB_SAMPLE_LIST,
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
            createPath={LAB_SAMPLE_ADD}
            title={title}
          />
          <LabSampleTable
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

export default ListLabSample;
