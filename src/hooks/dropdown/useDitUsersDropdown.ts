import { useQuery } from '@tanstack/react-query';
import apiDropdown from '../../helpers/api/dropdown';

export default function useDitUsersDropdown() {
  const getDitUsers = async () => {
    const body = await apiDropdown.fetchDitUsers();
    return body?.map((item: any) => ({
      value: item?.id,
      label: item?.name,
    }));
  };

  const { data, isFetching, isFetched, isError } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ['dit-users-dropdown'],
    queryFn: getDitUsers,
  });

  return {
    data,
    isFetching,
    isFetched,
    isError,
  };
}
