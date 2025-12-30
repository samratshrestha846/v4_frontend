import { useState } from 'react';
import { debounce } from 'lodash';
import { useQuery } from '@tanstack/react-query';
import udoseAgs from '../../../helpers/api/udoseAgs';
import { UdoseAgsQueryParams } from '../../../types/udoseAgs/udoseAgs';

const useFetchUdoseAgsList = () => {
  const [search, setSearch] = useState('');

  const [pageNumber, setPageNumber] = useState(0);

  const [status, setStatus] = useState<number | null>(null);
  const [alarmed, setAlarmed] = useState<number | null>(null);
  const [running, setRunning] = useState<number | null>(null);

  const prepareQueryParameters = () => {
    const params: UdoseAgsQueryParams = { page: pageNumber + 1 };

    if (search) {
      params.search = search;
    }

    if (status != null) {
      params.status = status;
    }

    if (alarmed != null) {
      params.is_alarmed = alarmed;
    }

    if (running != null) {
      params.is_running = running;
    }

    return params;
  };

  const fetchUdoseAgs = () => {
    const params = prepareQueryParameters();
    return udoseAgs.fetchUdoseAgs(params);
  };

  const handleSearchOnChange = debounce((e) => {
    setSearch(e.target.value);
    setPageNumber(0);
  }, 300);

  const handlePageChange = (e: any) => {
    setPageNumber(e.selected);
  };

  const { data, isFetching, isError, refetch } = useQuery({
    queryKey: ['fetch-udose-ags', search, pageNumber, status, alarmed, running],
    queryFn: fetchUdoseAgs,
    refetchOnWindowFocus: false,
  });

  return {
    data,
    search,
    isFetching,
    isError,
    refetch,
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
  };
};

export default useFetchUdoseAgsList;
