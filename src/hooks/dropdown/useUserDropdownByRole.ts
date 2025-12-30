import { useQuery } from '@tanstack/react-query';
import apiDropdown from '../../helpers/api/dropdown';

type Props = {
  type: string;
  roles: string[] | string;
};

export default function useUsersDropdownByRole(params: Props) {
  const getUsersByRole = async () => {
    const { body } = await apiDropdown.getUsersByRole(params);

    return (
      body?.map((item: any) => ({
        value: item?.id,
        label: `${item?.first_name} ${item?.last_name}`,
      })) ?? []
    );
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
