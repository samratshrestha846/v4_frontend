import { useState } from 'react';
import { debounce } from 'lodash';
import { useQuery } from '@tanstack/react-query';
import { TagQueryParams } from '../../../types/tag';
import tag from '../../../helpers/api/tag';

export default function useListTags() {
  // pagination variable
  const [pageNumber, setPageNumber] = useState(0);

  // search Variable
  const [search, setSearch] = useState('');

  // filter variables
  const [type, setType] = useState('');

  const fetchTags = async () => {
    const params: TagQueryParams = { page: pageNumber + 1 };
    if (search) {
      params.search = search;
    }

    if (type) {
      params.type = type;
    }

    return tag.fetchTags(params);
  };

  const { data, isFetching, isError, refetch } = useQuery({
    refetchOnWindowFocus: false,
    queryFn: fetchTags,
    queryKey: ['tags', search, pageNumber, type],
  });

  const handlePageChange = (e: any): void => {
    setPageNumber(e.selected);
  };

  const handleSearchOnChange = debounce((e): void => {
    setSearch(e.target.value);
    setPageNumber(0);
  }, 300);

  return {
    pageNumber,
    search,
    data,
    isFetching,
    isError,
    handlePageChange,
    handleSearchOnChange,
    refetch,
    setSearch,
    type,
    setType,
  };
}
