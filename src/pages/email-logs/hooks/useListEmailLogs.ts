import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { EmailLogsQueryParams } from '../../../types/email-logs/emailLogs';
import emailLogs from '../../../helpers/api/emailLogs';

export default function useListEmailLogs() {
  const [pageNumber, setPageNumber] = useState(0);

  const listEmailLogs = () => {
    const params: EmailLogsQueryParams = { page: pageNumber + 1 };
    return emailLogs.listDeviceLogs(params);
  };

  const { data, isFetching, isError } = useQuery(
    ['list-email-logs', pageNumber],
    listEmailLogs,
    { refetchOnWindowFocus: false }
  );

  const handlePageChange = (e: any): void => {
    setPageNumber(e.selected);
  };

  return {
    data,
    isFetching,
    isError,
    pageNumber,
    handlePageChange,
  };
}
