import { useQuery } from '@tanstack/react-query';
import apiDropdown from '../../helpers/api/dropdown';
import { LabelValueDropdown } from '../../types/common';

export default function useTagTypesDropdown() {
  const fetchTagTypesDropdown = async () => {
    const data = await apiDropdown.fetchTagTypesDropdown();

    const dropdownData: LabelValueDropdown[] = data?.map((item) => ({
      label: item,
      value: item,
    }));

    return dropdownData;
  };

  const { data, isFetching, isFetched, isError, isSuccess } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ['tag-types-dropdown'],
    queryFn: fetchTagTypesDropdown,
  });

  return {
    data,
    isFetching,
    isFetched,
    isError,
    isSuccess,
  };
}
