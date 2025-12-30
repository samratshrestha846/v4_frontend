import React from 'react';
import { Card } from 'react-bootstrap';
import PageTitle from '../../../../components/PageTitle';
import useLabSampleList from '../hooks/useLabSampleList';
import LabSampleListTable from './LabSampleListTable';
import ErrorMessage from '../../../../components/ErrorMessage';
import LabSampleFilterSection from './LabSampleFilterSection';

const LabSampleList: React.FC = () => {
  const {
    data,
    isFetching,
    isError,
    pageNumber,
    search,
    handlePageChange,
    handleSearchOnChange,
    customer,
    setCustomer,
    property,
    setProperty,
    site,
    setSite,
    sampleType,
    setSampleType,
    labSampleTypesOptions,
    handleExportReport,
    isFetchingReport,
    setSearch,
  } = useLabSampleList();

  if (isError) {
    return <ErrorMessage />;
  }

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: 'Lab Samples', path: '/lab-samples/list', active: true },
        ]}
        title="Lab Samples"
      />

      <Card>
        <Card.Body>
          <LabSampleFilterSection
            search={search}
            handleSearchOnChange={handleSearchOnChange}
            setSearch={setSearch}
            customer={customer}
            setCustomer={setCustomer}
            property={property}
            setProperty={setProperty}
            site={site}
            setSite={setSite}
            sampleType={sampleType}
            setSampleType={setSampleType}
            labSampleTypesOptions={labSampleTypesOptions}
            handleExportReport={handleExportReport}
          />

          <LabSampleListTable
            isFetching={isFetching}
            isFetchingReport={isFetchingReport}
            data={data}
            handlePageChange={handlePageChange}
            pageNumber={pageNumber}
          />
        </Card.Body>
      </Card>
    </>
  );
};

export default LabSampleList;
