import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { debounce } from 'lodash';
import apiReferrer from '../../../../helpers/api/referrer';
import { ReferrerQuery } from '../../../../types/referrer/referrerList';

const useReferrerList = () => {
  const [pageNumber, setPageNumber] = useState(0);
  const [search, setSearch] = useState('');

  const fetchReferrers = () => {
    const params: ReferrerQuery = { page: pageNumber + 1 };
    if (search) {
      params.search = search;
    }
    return apiReferrer.fetchReferrers(params);
  };

  const { data, isFetching, isError } = useQuery(
    ['referrers', search, pageNumber],
    fetchReferrers,
    { refetchOnWindowFocus: false }
  );

  const handlePageChange = (e: any): void => {
    setPageNumber(e.selected);
  };

  const handleSearchOnChange = debounce((e): void => {
    setSearch(e.target.value);
    setPageNumber(0);
  }, 300);

  return {
    data,
    isFetching,
    isError,
    pageNumber,
    search,
    handlePageChange,
    handleSearchOnChange,
    setSearch,
  };
};

export default useReferrerList;
