import { useQuery } from '@tanstack/react-query';
import apiDropdown from '../../helpers/api/dropdown';

export default function useRegionsDropdown() {
  const fetchRegionsDropdown = async () => {
    const { data } = await apiDropdown.fetchRegions();
    return data?.map((item: any) => ({
      value: item?.id,
      label: item?.name,
    }));
  };

  const {
    data: regionsDropdown,
    isFetching: isFetchingRegionsDropdown,
    isFetched: isFetchedRegionsDropdown,
    isError: isErrorRegionsDropdown,
  } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ['regions-dropdown'],
    queryFn: fetchRegionsDropdown,
  });

  return {
    regionsDropdown,
    isFetchingRegionsDropdown,
    isFetchedRegionsDropdown,
    isErrorRegionsDropdown,
  };
}
