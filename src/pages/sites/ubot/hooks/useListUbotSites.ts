import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { debounce } from 'lodash';
import ubot from '../../../../helpers/api/ubot';
import { UbotSiteQueryParams } from '../../../../types/ubot';

const useListUbotSites = () => {
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [search, setSearch] = useState<string>('');
  const [sort, setSort] = useState<string>('');
  const [direction, setDirection] = useState<string>('');

  const [filters, setFilters] = useState({});

  const prepareQueryParams = () => {
    let params: UbotSiteQueryParams = { page: pageNumber + 1 };

    if (search) {
      params.search = search;
    }
    if (sort) {
      params.sort = sort;
    }
    if (direction) {
      params.direction = direction;
    }

    if (Object.keys(filters).length > 0) {
      params = { ...params, ...filters };
    }

    return params;
  };

  const fetchUbotSites = () => {
    const params = prepareQueryParams();
    return ubot.fetchUbotSites(params);
  };

  const { data, isFetching, isError, isSuccess } = useQuery(
    ['ubot-sites', search, sort, direction, pageNumber, filters],
    fetchUbotSites,
    { refetchOnWindowFocus: false }
  );

  const handlePageChange = (e: any): void => {
    setPageNumber(e.selected);
  };

  const handleSearchOnChange = debounce((e): void => {
    setSearch(e.target.value);
    setPageNumber(0);
  }, 300);

  const handleTabeDataSorting = (clickedColumn: string) => {
    setDirection(direction === 'asc' ? 'desc' : 'asc');
    setSort(clickedColumn);
    setPageNumber(0);
  };

  return {
    data,
    isFetching,
    isError,
    isSuccess,
    pageNumber,
    search,
    setSearch,
    handlePageChange,
    handleSearchOnChange,
    sort,
    setSort,
    direction,
    setDirection,
    handleTabeDataSorting,
    filters,
    setFilters,
  };
};

export default useListUbotSites;
