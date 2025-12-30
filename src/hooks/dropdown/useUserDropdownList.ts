import { useQuery } from '@tanstack/react-query';
import apiDropdown from '../../helpers/api/dropdown';

export default function useUsersDropdownList() {
  const getUsersByRole = async () => {
    const { body } = await apiDropdown.fetchUsers({ type: 'dropdown' });
    return body?.map((item: any) => ({
      value: item?.id,
      label: `${item?.first_name} ${item?.last_name}`,
    }));
  };

  const { data, isFetching, isFetched, isError } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ['users-dropdown-by-role'],
    queryFn: getUsersByRole,
  });

  return {
    data,
    isFetching,
    isFetched,
    isError,
  };
}
