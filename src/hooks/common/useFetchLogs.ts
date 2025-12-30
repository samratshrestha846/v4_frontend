/* eslint-disable camelcase */
import { useQuery } from '@tanstack/react-query';
import { LogFilterParams } from '../../types/log/logList';
import logs from '../../helpers/api/logs';

export default function useFetchLogs({
  model_type,
  model_id,
  type,
  page_size,
}: LogFilterParams) {
  const fetchLogs = () => {
    const params: LogFilterParams = { model_type, model_id, type, page_size };
    return logs.fetchLogs(params);
  };

  const { data, isFetching, isError, refetch } = useQuery({
    queryKey: ['fetch-logs'],
    queryFn: fetchLogs,
    refetchOnWindowFocus: false,
  });

  return {
    data,
    isFetching,
    refetch,
    isError,
  };
}
