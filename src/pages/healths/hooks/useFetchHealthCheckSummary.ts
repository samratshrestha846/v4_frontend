import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { debounce } from 'lodash';
import siteHealthCheckSummary from '../../../helpers/api/siteHealthCheckSummary';
import { SiteHealthCheckSumamryQueryParams } from '../../../types/siteHealthCheck';

export default function useFetchHealthCheckSummary() {
  const [property, setProperty] = useState<number>();
  const [pageNumber, setPageNumber] = useState(0);
  const [search, setSearch] = useState('');

  const fetchSiteHealthCheckSummary = () => {
    const params: SiteHealthCheckSumamryQueryParams = { page: pageNumber + 1 };

    if (search) {
      params.search = search;
    }

    if (property) {
      params.property_id = property;
    }

    return siteHealthCheckSummary.fetchSiteHealthCheckSummary(params);
  };

  const { data, isError, isFetching } = useQuery({
    queryKey: ['site-health-check-summary', search, pageNumber, property],
    queryFn: fetchSiteHealthCheckSummary,
    refetchOnWindowFocus: false,
  });

  const handlePageChange = (e: any): void => {
    setPageNumber(e.selected);
  };

  const handleSearchOnChange = debounce((e): void => {
    setSearch(e.target.value);
    setPageNumber(0);
  }, 300);

  return {
    data,
    isError,
    isFetching,
    handlePageChange,
    handleSearchOnChange,
    search,
    pageNumber,
    property,
    setProperty,
    setSearch,
  };
}
