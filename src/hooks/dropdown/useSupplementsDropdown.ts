import { useQuery } from '@tanstack/react-query';
import apiDropdown from '../../helpers/api/dropdown';

export default function useSupplementsDropdown() {
  const fetchSupplementsDropdown = async () => {
    const list = await apiDropdown.fetchSupplementsDropdown();

    return list?.map((item) => ({
      value: item?.id,
      label: item?.name,
      nutrition: item.nutrition,
    }));
  };

  const { data, isFetching, isFetched, isError } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ['supplements-dropdown'],
    queryFn: fetchSupplementsDropdown,
  });

  return {
    data,
    isFetching,
    isFetched,
    isError,
  };
}
