import { useState } from 'react';
import { debounce } from 'lodash';
import { useQuery } from '@tanstack/react-query';
import apiCustomerProperty from '../../../helpers/api/customerProperty';

type PropertyQuery = {
  page: number;
  search?: string;
  sort?: string;
  direction?: string;
  is_active?: number;
};

export default function usePropertyList() {
  const [showModal, setShowModal] = useState(false);
  // Pagination variable
  const [pageNumber, setPageNumber] = useState(0);

  // Search Variable
  const [search, setSearch] = useState('');

  // sorting variables
  const [sort, setSort] = useState('');
  const [direction, setDirection] = useState('');

  // Filter variables
  const [status, setStatus] = useState<number>();

  const fetchCustomerProperties = async () => {
    const params: PropertyQuery = { page: pageNumber + 1 };
    if (search) {
      params.search = search;
    }
    if (sort) {
      params.sort = sort;
    }
    if (direction) {
      params.direction = direction;
    }

    if (status !== undefined && status !== null) {
      params.is_active = status;
    }

    return apiCustomerProperty.getCustomerProperties(params);
  };

  const { data, isFetching, isError, refetch } = useQuery({
    refetchOnWindowFocus: false,
    queryFn: fetchCustomerProperties,
    queryKey: [
      'customer-properties',
      search,
      pageNumber,
      sort,
      direction,
      status,
    ],
  });

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

  const toggleModal = (): void => {
    setShowModal(!showModal);
  };

  return {
    showModal,
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
    toggleModal,
    refetch,
    status,
    setStatus,
    setSearch,
  };
}
