import { useEffect, useState } from 'react';
import { debounce } from 'lodash';
import { useInfiniteQuery } from '@tanstack/react-query';
import apiDashboard from '../../../helpers/api/dashboard';
import DashboardQueryParams from '../../../types/dashboard/dashboard';
import { getLocalStorageData } from '../../../helpers';
import { Site } from '../../../types/site';

export default function useFetchUbotDashboardData() {
  const localStorageData = getLocalStorageData('ubotFilterParameters');

  const [search, setSearch] = useState<string>(
    localStorageData.search || undefined
  );
  const [filter, setFilter] = useState(localStorageData.filter || undefined);
  const [sort, setSort] = useState(localStorageData.sort || undefined);
  const [property, setProperty] = useState<number | undefined>(
    localStorageData.property || undefined
  );

  const prepareQueryParams = (pageParam: number) => {
    const params: DashboardQueryParams = {
      type: 'dashboard',
      page: pageParam,
    };

    if (filter) {
      params.filter = filter;
    }

    if (search) {
      params.search = search;
    }

    if (sort) {
      params.sort = sort;
    }

    if (property) {
      params.customer_property_id = property;
    }

    return params;
  };

  const fetchUbotDashboardData = async ({ pageParam = 1 }): Promise<any> => {
    const params = prepareQueryParams(pageParam);
    const response = await apiDashboard.getUdoseSites(params);
    return { ...response, prevOffset: pageParam };
  };

  const getNextPageParam = (lastPage: any) => {
    const currentPage = lastPage.current_page;
    const lastPageNumber = lastPage.last_page;
    if (currentPage < lastPageNumber) {
      return currentPage + 1;
    }
    return null;
  };

  const { data, hasNextPage, fetchNextPage, isLoading } = useInfiniteQuery({
    queryKey: ['ubot-dashboard', search, sort, filter, property],
    queryFn: fetchUbotDashboardData,
    getNextPageParam: (lastPage) => getNextPageParam(lastPage),
  });

  const updateLocalStorage = () => {
    const filterParameters = {
      search,
      sort,
      filter,
      property,
    };
    localStorage.setItem(
      'ubotFilterParameters',
      JSON.stringify(filterParameters)
    );
  };

  useEffect(() => {
    updateLocalStorage();
  }, [search, sort, filter, property]);

  const debouncedSearch = debounce((value) => setSearch(value), 300);
  const dashboardData: Site[] | undefined = data?.pages
    ?.map((page: any) => page.data)
    .flat();

  return {
    data,
    hasNextPage,
    fetchNextPage,
    isLoading,
    debouncedSearch,
    dashboardData,
    setSearch,
    setFilter,
    setSort,
    setProperty,
  };
}
