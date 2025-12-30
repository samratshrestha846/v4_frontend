import { useQuery } from '@tanstack/react-query';
import apiDropdown from '../../helpers/api/dropdown';

export default function useTagsDropdown() {
  const fetchTagsDropdown = async () => {
    const { data } = await apiDropdown.fetchTags();
    return data.map((item: any) => ({
      value: item.id,
      label: item.name,
    }));
  };

  const { data, isFetching, isFetched, isError } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ['tags-dropdown'],
    queryFn: fetchTagsDropdown,
  });

  return {
    data,
    isFetching,
    isFetched,
    isError,
  };
}
