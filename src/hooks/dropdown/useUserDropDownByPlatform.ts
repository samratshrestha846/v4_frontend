import { useQuery } from '@tanstack/react-query';
import apiDropdown from '@uhub/helpers/api/dropdown';

type Props = {
  platform: string;
};

export default function useUserDropDownByPlatform(params: Props) {
  const getUsersByPlatform = async () => {
    const { body } = await apiDropdown.getUsersByPlatform(params);

    return (
      body?.map((item: any) => ({
        value: item?.id,
        label: item?.name,
      })) ?? []
    );
  };

  const { data, isFetching, isFetched, isError } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ['users-dropdown-by-platform'],
    queryFn: getUsersByPlatform,
  });

  return {
    data,
    isFetching,
    isFetched,
    isError,
  };
}
