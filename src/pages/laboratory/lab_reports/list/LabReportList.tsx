import React from 'react';
import { Card } from 'react-bootstrap';
import PageTitle from '../../../../components/PageTitle';
import LabReportListTable from './LabReportListTable';
import useLabReportList from '../hooks/useLabReportList';
import { LAB_REPORT_LIST } from '../../../../constants/path';
import ErrorMessage from '../../../../components/ErrorMessage';
import FilterLabReport from './FilterLabReport';

const LabSampleList: React.FC = () => {
  const {
    data,
    isFetching,
    isError,
    refetch,
    pageNumber,
    search,
    handlePageChange,
    handleSearchOnChange,
    status,
    setStatus,
    setSearch,
  } = useLabReportList();

  if (isError) {
    return <ErrorMessage />;
  }

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: 'Lab Reports', path: LAB_REPORT_LIST, active: true },
        ]}
        title="Lab Reports"
      />

      <Card>
        <Card.Body>
          <FilterLabReport
            search={search}
            handleSearchOnChange={handleSearchOnChange}
            setSearch={setSearch}
            status={status}
            setStatus={setStatus}
          />

          <LabReportListTable
            isFetching={isFetching}
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

export default LabSampleList;
