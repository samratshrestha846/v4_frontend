import { useQuery } from '@tanstack/react-query';
import apiDropdown from '../../helpers/api/dropdown';
import { LabelNumericValue } from '../../types/common';
import { Crop } from '../../types/horticulture/horticulture';

export default function useCropsDropdown() {
  const fetchCropsDropdown = async () => {
    const params: any = { page_size: 1000 };

    const { body } = await apiDropdown.fetchCrops(params);

    const dropdownData: LabelNumericValue[] = await body?.map((item: Crop) => ({
      label: item.name,
      value: item.id,
    }));

    return dropdownData;
  };

  const { data, isFetching, isFetched, isError, isSuccess } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ['crops-dropdown'],
    queryFn: fetchCropsDropdown,
  });

  return {
    data,
    isFetching,
    isFetched,
    isError,
    isSuccess,
  };
}
