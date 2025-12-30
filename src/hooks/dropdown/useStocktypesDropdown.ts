import { useQuery } from '@tanstack/react-query';
import apiDropdown from '../../helpers/api/dropdown';

export default function useStockTypesDropdown() {
  const fetchStockTypesDropdown = async () => {
    const { body } = await apiDropdown.fetchStockTypes();
    return body?.map((item: any) => ({
      value: item?.id,
      label: item?.name,
    }));
  };

  const { data, isFetching, isFetched } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ['stock-types-dropdown '],
    queryFn: fetchStockTypesDropdown,
  });

  return {
    data,
    isFetching,
    isFetched,
  };
}
