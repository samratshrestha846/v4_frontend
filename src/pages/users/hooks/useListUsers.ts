import { useState } from 'react';
import { debounce } from 'lodash';
import { useQuery } from '@tanstack/react-query';
import { UserQueryParams } from '../../../types/user/user';
import user from '../../../helpers/api/user';

export default function useListUsers() {
  // pagination variable
  const [pageNumber, setPageNumber] = useState(0);

  // search Variable
  const [search, setSearch] = useState('');

  // filter variables
  const [role, setRole] = useState<number>();
  const [status, setStatus] = useState('');

  const prepareQueryParams = () => {
    const params: UserQueryParams = { page: pageNumber + 1 };
    if (search) {
      params.search = search;
    }

    if (status !== '' && status !== undefined && status !== null) {
      params.status = status;
    }

    if (role) {
      params.role_id = role;
    }
    return params;
  };

  const fetchUsers = async () => {
    const params = prepareQueryParams();
    return user.fetchUsers(params);
  };

  const { data, isFetching, isError, refetch } = useQuery({
    refetchOnWindowFocus: false,
    queryFn: fetchUsers,
    queryKey: ['users', search, pageNumber, role, status],
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
    refetch,
    setSearch,
    role,
    setRole,
    status,
    setStatus,
  };
}
