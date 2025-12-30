import { useQuery } from '@tanstack/react-query';
import { debounce } from 'lodash';
import { useState } from 'react';
import supplements from '../../../helpers/api/supplements';
import { SupplementQueryParams } from '../../../types/supplements/supplement';

export default function useListSupplements() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<number>();

  const [pageNumber, setPageNumber] = useState(0);
  const [perPage, setPerPage] = useState(8);

  const prepareQueryParams = () => {
    const params: SupplementQueryParams = {
      page: pageNumber + 1,
      per_page: perPage,
    };

    if (search) {
      params.search = search;
    }

    if (status !== undefined && status !== null) {
      params.is_active = status;
    }

    return params;
  };

  const fetchSupplements = () => {
    const params = prepareQueryParams();
    return supplements.getSupplements(params);
  };

  const { data, isFetching, isError, isSuccess } = useQuery({
    queryFn: fetchSupplements,
    queryKey: ['supplements', status, pageNumber, perPage, search],
    refetchOnWindowFocus: false,
  });

  const handlePageChange = (e: any): void => {
    setPageNumber(e.selected);
  };

  const handlePerPageChange = (selected: any): void => {
    setPerPage(selected.value);
  };

  const handleSearchOnChange = debounce((e): void => {
    setSearch(e.target.value);
  }, 300);

  return {
    data,
    isFetching,
    isError,
    isSuccess,
    status,
    setStatus,
    pageNumber,
    handlePageChange,
    perPage,
    handlePerPageChange,
    search,
    handleSearchOnChange,
    setSearch,
  };
}
