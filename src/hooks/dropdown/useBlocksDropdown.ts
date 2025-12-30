import { useQuery } from '@tanstack/react-query';
import apiDropdown from '../../helpers/api/dropdown';
import { LabelNumericValue } from '../../types/common';

export default function useBlocksDropdown(paddockId?: number) {
  const fetchBlocksDropdown = async () => {
    const data = await apiDropdown.fetchBlocks(paddockId);

    const dropdownData: LabelNumericValue[] = data?.map((item) => ({
      label: item.name,
      value: item.id,
    }));

    return dropdownData;
  };

  const { data, isFetching, isFetched, isError, isSuccess } = useQuery({
    queryKey: ['blocks-dropdown', paddockId],
    queryFn: fetchBlocksDropdown,
    refetchOnWindowFocus: false,
    enabled: !!paddockId,
  });

  return {
    data,
    isFetching,
    isFetched,
    isError,
    isSuccess,
  };
}
