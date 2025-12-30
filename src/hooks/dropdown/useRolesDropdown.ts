import { useQuery } from '@tanstack/react-query';
import apiDropdown from '../../helpers/api/dropdown';

export default function useRolesDropdown() {
  const fetchRolesDropdown = async () => {
    const { body } = await apiDropdown.fetchRoles();
    return body?.map((item) => ({
      value: item?.id,
      label: item.name,
    }));
  };

  const { data, isFetching, isFetched, isError } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ['roles-dropdown'],
    queryFn: fetchRolesDropdown,
  });

  return {
    data,
    isFetching,
    isFetched,
    isError,
  };
}
