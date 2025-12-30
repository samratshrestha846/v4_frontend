import { useEffect, useState } from 'react';
import { debounce } from 'lodash';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getLocalStorageData } from '../../../helpers';
import apiDashboard from '../../../helpers/api/dashboard';
import DashboardQueryParams from '../../../types/dashboard/dashboard';
import { Site } from '../../../types/site';

export default function useFetchUdoseDashboardData() {
  const localStorageData = getLocalStorageData('filterParameters');

  const [search, setSearch] = useState<string | undefined>(
    localStorageData.search || undefined
  );
  const [filter, setFilter] = useState<number | undefined>(
    localStorageData.filter !== undefined && localStorageData.filter !== null
      ? localStorageData.filter
      : undefined
  );
  const [sort, setSort] = useState<string | undefined>(
    localStorageData.sort || undefined
  );
  const [property, setProperty] = useState<number | undefined>(
    localStorageData.property || undefined
  );
  const [user, setUser] = useState<number | undefined>(
    localStorageData.user || undefined
  );

  const prepareQueryParams = (pageParam: number) => {
    const params: DashboardQueryParams = {
      page: pageParam,
    };

    if (filter !== undefined && filter !== null) {
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

    if (user) {
      params.assigned_to_me = !!user;
    }

    return params;
  };

  const fetchDashboardData = async ({ pageParam = 1 }): Promise<any> => {
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

  const updateLocalStorage = () => {
    const filterParameters = {
      search,
      sort,
      filter,
      property,
      user,
    };
    localStorage.setItem('filterParameters', JSON.stringify(filterParameters));
  };

  const { data, hasNextPage, fetchNextPage, isLoading } = useInfiniteQuery({
    queryKey: ['udose-dashboard', search, sort, filter, property, user],
    queryFn: fetchDashboardData,
    getNextPageParam: (lastPage) => getNextPageParam(lastPage),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    updateLocalStorage();
  }, [search, sort, filter, property, user]);

  const handleSearchOnChange = debounce((e) => {
    setSearch(e.target.value);
  }, 300);

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
    setUser,
    search,
    filter,
    sort,
    property,
    user,
    handleSearchOnChange,
  };
}
