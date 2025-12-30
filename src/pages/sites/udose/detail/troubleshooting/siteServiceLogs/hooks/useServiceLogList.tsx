import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import udose from '../../../../../../../helpers/api/udose';

export default function useServiceLogList() {
  const [pageNumber, setPageNumber] = useState(0);
  const { id } = useParams();
  const prepareQueryParams = () => {
    const params: any = { page: pageNumber + 1 };
    return params;
  };

  const fetchServiceLogs = () => {
    const params = prepareQueryParams();
    return udose.getServiceLogs(id, params);
  };

  const { data, isFetching, isError, refetch } = useQuery(
    ['get-service-logs', id, pageNumber],
    fetchServiceLogs,
    { refetchOnWindowFocus: false }
  );

  const handlePageChange = (e: any): void => {
    setPageNumber(e.selected);
  };

  return {
    data,
    isFetching,
    isError,
    refetch,
    pageNumber,
    handlePageChange,
  };
}
