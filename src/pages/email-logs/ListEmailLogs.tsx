import React from 'react';
import { Card } from 'react-bootstrap';
import PageTitle from '../../components/PageTitle';
import CustomLoader from '../../components/CustomLoader';
import useListEmailLogs from './hooks/useListEmailLogs';

import ErrorMessage from '../../components/ErrorMessage';
import EmailLogsTable from './EmailLogsTable';

const ListEmailLogs: React.FC = () => {
  const { data, isFetching, isError, pageNumber, handlePageChange } =
    useListEmailLogs();

  if (isError) {
    return <ErrorMessage />;
  }

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: 'Email Logs', path: '/email-logs', active: true },
        ]}
        title="Email Logs"
      />

      <Card>
        <Card.Body>
          {isFetching ? (
            <CustomLoader />
          ) : (
            <EmailLogsTable
              data={data}
              pageNumber={pageNumber}
              handlePageChange={handlePageChange}
            />
          )}
        </Card.Body>
      </Card>
    </>
  );
};

export default ListEmailLogs;
