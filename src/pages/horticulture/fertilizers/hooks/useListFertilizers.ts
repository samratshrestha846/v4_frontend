import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { debounce } from 'lodash';
import fertilizer from '../../../../helpers/api/horticulture/fertilizer';
import { FertilizerQueryParams } from '../../../../types/horticulture/fertilizer';

export default function useListFertilizers() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<number>();

  const listFertilizers = () => {
    const params: FertilizerQueryParams = {};

    if (search) {
      params.name = search;
    }

    if (status !== undefined && status !== null) {
      params.status = status;
    }

    return fertilizer.listFertilizers(params);
  };

  const { data, isFetching, isError, refetch } = useQuery(
    ['list-fertilizers', search, status],
    listFertilizers,
    { refetchOnWindowFocus: false }
  );

  const handleSearchOnChange = debounce((e): void => {
    setSearch(e.target.value);
  }, 300);

  return {
    data,
    isFetching,
    isError,
    refetch,
    handleSearchOnChange,
    search,
    setSearch,
    status,
    setStatus,
  };
}
