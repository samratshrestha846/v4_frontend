import { useQuery } from '@tanstack/react-query';
import user from '../../../helpers/api/user';

export default function useReadUser(id?: number) {
  const getUserById = () => {
    return user.getUserById(Number(id));
  };

  const { data, isFetching, isFetched, refetch, isError } = useQuery({
    queryKey: ['read-user', id],
    queryFn: getUserById,
    refetchOnWindowFocus: false,
    enabled: !!id,
  });

  return {
    data,
    isFetching,
    isFetched,
    refetch,
    isError,
  };
}
