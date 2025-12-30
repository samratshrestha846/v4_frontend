import { useQuery } from '@tanstack/react-query';
import subBlock from '../../../../../../helpers/api/horticulture/subBlock';

export default function useListSubBlockPlantationHistory(subBlockId?: number) {
  const listPlantationHistoryBySubBlock = () => {
    return subBlock.listPlantationHistoryBySubBlock(Number(subBlockId));
  };

  const { data, isFetching, isError, refetch } = useQuery(
    ['list-plantation-history-by-sub-block', subBlockId],
    listPlantationHistoryBySubBlock,
    { refetchOnWindowFocus: false, enabled: !!subBlockId }
  );

  return {
    data,
    isFetching,
    isError,
    refetch,
  };
}
