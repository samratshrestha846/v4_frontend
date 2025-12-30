/* eslint-disable no-shadow */
import { useState } from 'react';
import { debounce } from 'lodash';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import apiCustomer from '../../../../helpers/api/customer';

type CustomerQuery = {
  page: number;
  search?: string;
};

export default function useReferredCustomerList() {
  const [pageNumber, setPageNumber] = useState(0);
  const [search, setSearch] = useState('');

  const { id } = useParams();

  const getCustomersByReferrerId = (id: any) => {
    const params: CustomerQuery = { page: pageNumber + 1 };
    if (search) {
      params.search = search;
    }
    return apiCustomer.getCustomersByReferrerId(params, id);
  };

  const { data, isFetching, isError } = useQuery({
    queryKey: ['customers-by-referrer-id', search, pageNumber],
    queryFn: () => getCustomersByReferrerId(id),
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
    pageNumber,
    search,
    data,
    isFetching,
    isError,
    handlePageChange,
    handleSearchOnChange,
  };
}
