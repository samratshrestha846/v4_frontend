import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import apiLogs from '../../../../../../../helpers/api/logs';
import { LogFilterParams } from '../../../../../../../types/log/logList';

export default function useListSiteLogs(id: any) {
  const [pageNumber, setPageNumber] = useState<number>(0);

  const fetchLogs = () => {
    const params = prepareQueryParams();
    return apiLogs.fetchLogs(params);
  };

  const prepareQueryParams = () => {
    const params: LogFilterParams = { page: pageNumber + 1 };

    params.model_type = 'site';

    if (id) {
      params.model_id = id;
    }

    return params;
  };

  const { data, isFetching, isError } = useQuery({
    refetchOnWindowFocus: false,
    queryFn: fetchLogs,
    queryKey: ['logs', pageNumber, id],
  });

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
