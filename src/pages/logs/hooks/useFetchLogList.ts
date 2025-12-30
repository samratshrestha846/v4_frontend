import { useQuery } from '@tanstack/react-query';
import { debounce } from 'lodash';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import apiLogs from '../../../helpers/api/logs';
import { LogFilterParams } from '../../../types/log/logList';

export default function useFetchLogList() {
  const [searchParams] = useSearchParams();

  const [pageNumber, setPageNumber] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>();
  const [search, setSearch] = useState<string>();

  const [modelType, setModelType] = useState<string | undefined>(
    searchParams.get('model_type') ?? undefined
  );
  const [modelId, setModelId] = useState<string | undefined>(
    searchParams.get('model_id') ?? undefined
  );
  const [type, setType] = useState<string | undefined>(
    searchParams.get('type') ?? undefined
  );
  const [userId, setUserId] = useState<number>();

  const fetchLogs = () => {
    const params = prepareQueryParams();
    return apiLogs.fetchLogs(params);
  };

  const prepareQueryParams = () => {
    const params: LogFilterParams = { page: pageNumber + 1 };

    if (search) {
      params.search = search;
    }

    if (modelType) {
      params.model_type = modelType;
    }

    if (modelId) {
      params.model_id = modelId;
    }

    if (type) {
      params.type = type;
    }

    if (userId) {
      params.user_id = userId;
    }

    if (pageSize) {
      params.page_size = pageSize;
    }

    return params;
  };

  const { data, isFetching, isError, refetch } = useQuery({
    refetchOnWindowFocus: false,
    queryFn: fetchLogs,
    queryKey: ['logs', search, pageNumber, modelType, modelId, type, userId],
  });

  const handlePageChange = (e: any): void => {
    setPageNumber(e.selected);
  };

  const handleSearch = debounce((e): void => {
    setSearch(e.target.value);
    setPageNumber(0);
  }, 300);

  return {
    data,
    isFetching,
    isError,
    pageNumber,
    handlePageChange,
    search,
    handleSearch,
    modelId,
    setModelId,
    modelType,
    setModelType,
    type,
    setType,
    userId,
    setUserId,
    pageSize,
    setPageSize,
    refetch,
    setSearch,
  };
}
