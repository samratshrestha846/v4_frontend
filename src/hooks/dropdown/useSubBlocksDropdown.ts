import { useQuery } from '@tanstack/react-query';
import apiDropdown from '../../helpers/api/dropdown';
import { LabelNumericValue } from '../../types/common';

export default function useSubBlocksDropdown(blockId?: number) {
  const fetchSubBlocksDropdown = async () => {
    const data = await apiDropdown.fetchSubBlocks(blockId);

    const dropdownData: LabelNumericValue[] = data?.map((item) => ({
      label: item.name,
      value: item.id,
    }));

    return dropdownData;
  };

  const { data, isFetching, isFetched, isError, isSuccess } = useQuery({
    queryKey: ['sub-blocks-dropdown', blockId],
    queryFn: fetchSubBlocksDropdown,
    refetchOnWindowFocus: false,
    enabled: !!blockId,
  });

  return {
    data,
    isFetching,
    isFetched,
    isError,
    isSuccess,
  };
}
