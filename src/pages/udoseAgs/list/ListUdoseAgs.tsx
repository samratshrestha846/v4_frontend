import React from 'react';
import { Card } from 'react-bootstrap';
import PageTitle from '../../../components/PageTitle';
import UdoseAgTable from './UdoseAgTable';
import useFetchUdoseAgsList from '../hooks/useFetchUdoseAgsList';
import CustomLoader from '../../../components/CustomLoader';
import ErrorMessage from '../../../components/ErrorMessage';
import FilterUdoseAg from '../components/FilterUdoseAg';

const ListUdoseAgs: React.FC = () => {
  const {
    data,
    isFetching,
    isError,
    refetch,
    search,
    pageNumber,
    handlePageChange,
    handleSearchOnChange,
    status,
    alarmed,
    running,
    setStatus,
    setAlarmed,
    setRunning,
    setSearch,
  } = useFetchUdoseAgsList();

  if (isError) return <ErrorMessage />;

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: 'All uDoseAgs', path: '/udoseags/list', active: true },
        ]}
        title="uDose Ags"
      />

      <Card>
        <Card.Body>
          <FilterUdoseAg
            search={search}
            handleSearchOnChange={handleSearchOnChange}
            setSearch={setSearch}
            setStatus={setStatus}
            setAlarmed={setAlarmed}
            setRunning={setRunning}
            status={status}
            alarmed={alarmed}
            running={running}
          />

          {isFetching ? (
            <CustomLoader />
          ) : (
            <UdoseAgTable
              data={data}
              pageNumber={pageNumber}
              handlePageChange={handlePageChange}
              refetch={refetch}
            />
          )}
        </Card.Body>
      </Card>
    </>
  );
};

export default ListUdoseAgs;
