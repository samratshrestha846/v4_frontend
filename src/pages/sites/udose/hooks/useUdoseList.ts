import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { debounce } from 'lodash';
import udose from '../../../../helpers/api/udose';
import EXTRA_FILTER_COLUMNS from '../constants/filterColumns';

const useUdoseList = (isTestSiteList = false) => {
  const [pageNumber, setPageNumber] = useState(0);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');
  const [direction, setDirection] = useState('');

  const [appliedFilters, setAppliedFilters] = useState<any[]>([]);
  const [extraFilters, setExtraFilters] = useState<any[]>([]);

  const [filters, setFilters] = useState({});

  useEffect(() => {
    if (appliedFilters.length === 0) {
      setExtraFilters(EXTRA_FILTER_COLUMNS);
    }
  }, [appliedFilters]);

  const prepareQueryParamsForExtraFilters = () => {
    const preparedQuery: any = {};
    extraFilters?.forEach((item: any) => {
      const selectedFilters = item.filters.filter((val: any) => val.isSelected);
      if (selectedFilters.length > 0) {
        preparedQuery[`filterable[${item.key}]`] = selectedFilters
          .map((val: any) => val.value)
          .join(',');
      }
    });
    return preparedQuery;
  };

  const prepareQueryParams = () => {
    let params: any = { page: pageNumber + 1 };

    if (isTestSiteList) {
      params['filterable[status]'] = 2;
    }

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

    if (appliedFilters.length > 0) {
      params = {
        ...params,
        ...prepareQueryParamsForExtraFilters(),
      };
    }
    return params;
  };

  const fetchUdoses = () => {
    const params = prepareQueryParams();
    return udose.fetchUdoses(params);
  };

  const { data, isFetching, isError } = useQuery(
    ['udoses', search, sort, direction, pageNumber, filters, appliedFilters],
    fetchUdoses,
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
    pageNumber,
    search,
    handlePageChange,
    handleSearchOnChange,
    sort,
    setSort,
    direction,
    setDirection,
    handleTabeDataSorting,
    appliedFilters,
    setAppliedFilters,
    extraFilters,
    setExtraFilters,
    filters,
    setFilters,
    setSearch,
  };
};

export default useUdoseList;
