import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { debounce } from 'lodash';
import siteLocation from '../../../../helpers/api/siteLocation';
import { SiteWithLocationQueryParams } from '../../../../types/siteMap';

export default function useFetchSitesWithLocation() {
  const [search, setSearch] = useState<string>();

  const fetchSitesWithLocation = () => {
    const params: SiteWithLocationQueryParams = {
      type: 'map',
    };

    if (search) {
      params.search = search;
    }

    return siteLocation.fetchSitesWithLocation(params);
  };

  const { data, isFetching, isError, isSuccess } = useQuery(
    ['fetch-sites-with-location', search],
    fetchSitesWithLocation,
    { refetchOnWindowFocus: false }
  );

  const handleSearchOnChange = debounce((e): void => {
    setSearch(e.target.value);
  }, 300);

  return {
    data,
    isFetching,
    isSuccess,
    isError,
    search,
    setSearch,
    handleSearchOnChange,
  };
}
