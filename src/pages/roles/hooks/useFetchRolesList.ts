import { useQuery } from '@tanstack/react-query';
import role from '../../../helpers/api/role';

export default function useFetchRolesList() {
  const fetchRoles = () => {
    return role.fetchRoles();
  };

  const { data, isFetching, isError, refetch } = useQuery({
    refetchOnWindowFocus: false,
    queryFn: fetchRoles,
    queryKey: ['roles'],
  });

  return { data, isFetching, isError, refetch };
}
