import { useState } from 'react';
import { debounce } from 'lodash';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import apiCustomer from '../../../helpers/api/customer';
import { CUSTOMER_EDIT, CUSTOMER_ONBOARDING } from '../../../constants/path';
import { prepareDynamicUrl } from '../../../helpers';

type CustomerQuery = {
  page: number;
  search?: string;
  is_active?: any;
};

export default function useCustomerList() {
  const [pageNumber, setPageNumber] = useState(0);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');

  const navigate = useNavigate();

  const fetchCustomers = () => {
    const params: CustomerQuery = { page: pageNumber + 1 };
    if (search) {
      params.search = search;
    }

    if (status !== '' && status !== undefined && status !== null) {
      params.is_active = status;
    }

    return apiCustomer.getCustomers(params);
  };

  const { data, isFetching, isError, refetch } = useQuery({
    refetchOnWindowFocus: false,
    queryFn: fetchCustomers,
    queryKey: ['customers', search, pageNumber, status],
  });

  const handlePageChange = (e: any): void => {
    setPageNumber(e.selected);
  };

  const handleSearchOnChange = debounce((e): void => {
    setSearch(e.target.value);
    setPageNumber(0);
  }, 300);

  const navigateToAddCustomer = () => {
    navigate(CUSTOMER_ONBOARDING);
  };

  const navigateToEditCustomer = (id: number) => {
    navigate(prepareDynamicUrl(CUSTOMER_EDIT, id));
  };

  return {
    pageNumber,
    search,
    data,
    isFetching,
    isError,
    handlePageChange,
    handleSearchOnChange,
    navigateToAddCustomer,
    navigateToEditCustomer,
    status,
    setStatus,
    setSearch,
    refetch,
  };
}
