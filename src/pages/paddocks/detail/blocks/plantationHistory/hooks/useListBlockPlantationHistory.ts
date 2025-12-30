import { useQuery } from '@tanstack/react-query';
import block from '../../../../../../helpers/api/horticulture/block';

export default function useListBlockPlantationHistory(blockId?: number) {
  const listPlantationHistoryByBlock = () => {
    return block.listPlantationHistoryByBlock(Number(blockId));
  };

  const { data, isFetching, isError, refetch } = useQuery(
    ['list-plantation-history-by-block', blockId],
    listPlantationHistoryByBlock,
    { refetchOnWindowFocus: false, enabled: !!blockId }
  );

  return {
    data,
    isFetching,
    isError,
    refetch,
  };
}
