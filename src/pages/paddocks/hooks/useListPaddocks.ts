import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { debounce } from 'lodash';
import { LabReportQueryParams } from '../../../types/lab/labReport';
import { PaddockQueryParams } from '../../../types/horticulture/paddock';
import paddock from '../../../helpers/api/horticulture/paddock';

export default function useListPaddocks() {
  const [pageNumber, setPageNumber] = useState(0);
  const [search, setSearch] = useState('');

  const [customer, setCustomer] = useState<number>();
  const [property, setProperty] = useState<number>();

  const prepareQueryParams = () => {
    const params: PaddockQueryParams = { page: pageNumber + 1 };
    if (search) {
      params.search = search;
    }

    if (customer) {
      params.customer_id = customer;
    }

    if (property) {
      params.customer_property_id = property;
    }

    return params;
  };

  const fetchPaddocks = () => {
    const params: LabReportQueryParams = prepareQueryParams();
    return paddock.fetchPaddocks(params);
  };

  const { data, isFetching, isError, refetch } = useQuery(
    ['list-paddocks', search, pageNumber, customer, property],
    fetchPaddocks,
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
    customer,
    setCustomer,
    property,
    setProperty,
    setSearch,
  };
}
