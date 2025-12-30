import React from 'react';
import { Card } from 'react-bootstrap';
import PageTitle from '../../../components/PageTitle';
import { CERES_TAGS_LIST } from '../../../constants/path';
import ErrorMessage from '../../../components/ErrorMessage';
import useListCeresTags from '../hooks/useListCeresTags';
import ListCeresTagsTable from './ListCeresTagsTable';
import usePropertiesDropdown from '../../../hooks/dropdown/usePropertiesDropdown';
import FilterCeresTags from './FilterCeresTags';

const ListCeresTags: React.FC = () => {
  const {
    data,
    isFetching,
    isError,
    pageNumber,
    search,
    handlePageChange,
    handleSearchOnChange,
    property,
    setProperty,
    refetch,
    setSearch,
  } = useListCeresTags();

  const {
    data: propertiesOptions,
    isError: isErrorPropertiesOptions,
    isFetching: isFetchingPropertiesOptions,
  } = usePropertiesDropdown();

  if (isError || isErrorPropertiesOptions) {
    return <ErrorMessage />;
  }

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: 'Ceres Tags', path: CERES_TAGS_LIST, active: true },
        ]}
        title="Ceres Tags"
      />
      <Card>
        <Card.Body>
          <FilterCeresTags
            property={property}
            setProperty={setProperty}
            propertiesOptions={propertiesOptions}
            handleSearchOnChange={handleSearchOnChange}
            search={search}
            setSearch={setSearch}
          />
          <ListCeresTagsTable
            isFetching={isFetching}
            isFetchingPropertiesOptions={isFetchingPropertiesOptions}
            data={data}
            handlePageChange={handlePageChange}
            pageNumber={pageNumber}
            refetch={refetch}
          />
        </Card.Body>
      </Card>
    </>
  );
};

export default ListCeresTags;
