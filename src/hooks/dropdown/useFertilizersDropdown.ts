import { useQuery } from '@tanstack/react-query';
import apiDropdown from '../../helpers/api/dropdown';
import { LabelNumericValue } from '../../types/common';

export default function useFertilizersDropdown() {
  const fetchFertilizersDropdown = async () => {
    const data = await apiDropdown.fetchFertilizers();

    const dropdownData: LabelNumericValue[] = data?.map((item) => ({
      label: item.name,
      value: item.id,
    }));

    return dropdownData;
  };

  const { data, isFetching, isFetched, isError, isSuccess } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ['fertilizers-dropdown'],
    queryFn: fetchFertilizersDropdown,
  });

  return {
    data,
    isFetching,
    isFetched,
    isError,
    isSuccess,
  };
}
