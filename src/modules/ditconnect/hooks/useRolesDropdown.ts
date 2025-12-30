import { useQuery } from '@tanstack/react-query';
import { convertToSlug } from '@uhub/helpers';
import HttpApi from '../Http/http';
import { DROPDOWN_ROLES } from '../constants/apiUrls';

export default function useRolesDropdown() {
  const httpApi = new HttpApi();

  const fetchRolesDropdown = async () => {
    const data = await httpApi.get(DROPDOWN_ROLES);

    return data.data.data.map((item: any) => ({
      value: convertToSlug(item.name).replace(/-/g, '_'),
      label: item.name,
    }));
  };

  const { data, isFetching, isFetched, isError, isSuccess } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ['roles-dropdown'],
    queryFn: fetchRolesDropdown,
  });

  return {
    data,
    isFetching,
    isFetched,
    isError,
    isSuccess,
  };
}
