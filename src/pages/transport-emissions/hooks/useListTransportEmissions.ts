import { useState } from 'react';
import { debounce } from 'lodash';
import { useQuery } from '@tanstack/react-query';
import {
  SORTING_ORDER_ASC,
  SORTING_ORDER_DESC,
} from '../../../constants/constants';
import transportEmission from '../../../helpers/api/transportEmission';
import { TransportEmissionQueryParams } from '../../../types/transportEmission';

export default function useListTransportEmissions() {
  // pagination variable
  const [pageNumber, setPageNumber] = useState(0);

  // search Variable
  const [search, setSearch] = useState('');

  // sorting variables
  const [sort, setSort] = useState('');
  const [direction, setDirection] = useState('');

  const fetchTransportEmissions = async () => {
    const params: TransportEmissionQueryParams = { page: pageNumber + 1 };
    if (search) {
      params.search = search;
    }
    if (sort) {
      params.sort = sort;
    }
    if (direction) {
      params.direction = direction;
    }

    return transportEmission.fetchTransportEmissions(params);
  };

  const { data, isFetching, isError, refetch } = useQuery({
    refetchOnWindowFocus: false,
    queryFn: fetchTransportEmissions,
    queryKey: ['transport-emissions', search, pageNumber, sort, direction],
  });

  const handlePageChange = (e: any): void => {
    setPageNumber(e.selected);
  };

  const handleSearchOnChange = debounce((e): void => {
    setSearch(e.target.value);
    setPageNumber(0);
  }, 300);

  const handleTabeDataSorting = (clickedColumn: string) => {
    setDirection(
      direction === SORTING_ORDER_ASC ? SORTING_ORDER_DESC : SORTING_ORDER_ASC
    );
    setSort(clickedColumn);
    setPageNumber(0);
  };

  return {
    pageNumber,
    search,
    sort,
    direction,
    data,
    isFetching,
    isError,
    handlePageChange,
    handleSearchOnChange,
    handleTabeDataSorting,
    refetch,
    setSearch,
  };
}
