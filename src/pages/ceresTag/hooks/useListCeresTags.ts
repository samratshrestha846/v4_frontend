import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { debounce } from 'lodash';
import ceresTagAPI from '../../../helpers/api/ceresTagAPI';
import { CeresTagQueryParams } from '../../../types/ceresTag/ceresTag';

export default function useListCeresTags() {
  const [pageNumber, setPageNumber] = useState(0);
  const [search, setSearch] = useState('');

  const [property, setProperty] = useState<number>();

  const prepareQueryParams = () => {
    const params: CeresTagQueryParams = { page: pageNumber + 1 };
    if (search) {
      params.search = search;
    }

    if (property) {
      params.customer_property_id = property;
    }

    return params;
  };

  const fetchCeresTags = () => {
    const params: CeresTagQueryParams = prepareQueryParams();
    return ceresTagAPI.fetchCeresTags(params);
  };

  const { data, isFetching, isError, refetch } = useQuery(
    ['list-ceres-tags', search, pageNumber, property],
    fetchCeresTags,
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
    refetch,
    pageNumber,
    search,
    handlePageChange,
    handleSearchOnChange,
    property,
    setProperty,
    setSearch,
  };
}
