import { useQuery } from '@tanstack/react-query';
import role from '../../../helpers/api/role';

export default function useFetchPermissionsByRole(
  id: number,
  showModel?: boolean
) {
  const fetchPermissionsByRole = () => {
    return role.fetchPermissionsByRole(id);
  };

  const { data, isFetching, isError } = useQuery({
    refetchOnWindowFocus: false,
    queryFn: fetchPermissionsByRole,
    queryKey: ['permissions-by-role'],
    enabled: showModel,
  });

  return { data, isFetching, isError };
}
