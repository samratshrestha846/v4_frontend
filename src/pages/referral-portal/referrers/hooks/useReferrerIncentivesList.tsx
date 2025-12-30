import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { debounce } from 'lodash';
import { useParams } from 'react-router-dom';
import apiSale from '../../../../helpers/api/sale';
import { SaleQuery } from '../../../../types/sale/saleList';

export default function useReferrerIncentivesList() {
  const [pageNumber, setPageNumber] = useState(0);
  const [search, setSearch] = useState('');

  const { id } = useParams();

  const getSalesByReferrerId = () => {
    const params: SaleQuery = { page: pageNumber + 1 };
    if (search) {
      params.search = search;
    }
    return apiSale.getSalesByReferrerId(params, Number(id));
  };

  const { data, isFetching, isError } = useQuery(
    ['get-sales-by-referrer-id', search, pageNumber],
    getSalesByReferrerId,
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
  };
}
