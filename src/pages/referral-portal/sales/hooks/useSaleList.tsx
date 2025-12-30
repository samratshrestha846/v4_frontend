import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { debounce } from 'lodash';
import { useNavigate } from 'react-router-dom';

import apiSale from '../../../../helpers/api/sale';
import { SaleQuery } from '../../../../types/sale/saleList';
import { SALE_ADD } from '../../../../constants/path';

export default function useSaleList() {
  const [pageNumber, setPageNumber] = useState(0);
  const [search, setSearch] = useState('');

  const [customer, setCustomer] = useState<number>();
  const [referrer, setReferrer] = useState<number>();

  const navigate = useNavigate();

  const fetchSales = () => {
    const params: SaleQuery = { page: pageNumber + 1 };
    if (search) {
      params.search = search;
    }

    if (customer) {
      params.customer_id = customer;
    }

    if (referrer) {
      params.referrer_id = referrer;
    }
    return apiSale.fetchSales(params);
  };

  const { data, isFetching, isError } = useQuery(
    ['sales', search, pageNumber, customer, referrer],
    fetchSales,
    { refetchOnWindowFocus: false }
  );

  const handlePageChange = (e: any): void => {
    setPageNumber(e.selected);
  };

  const handleSearchOnChange = debounce((e): void => {
    setSearch(e.target.value);
    setPageNumber(0);
  }, 300);

  const navigateToAddSale = () => {
    navigate(SALE_ADD);
  };

  return {
    data,
    isFetching,
    isError,
    pageNumber,
    search,
    handlePageChange,
    handleSearchOnChange,
    customer,
    setCustomer,
    referrer,
    setReferrer,
    navigateToAddSale,
    setSearch,
  };
}
