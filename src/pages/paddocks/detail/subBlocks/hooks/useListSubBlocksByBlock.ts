import { useQuery } from '@tanstack/react-query';
import subBlock from '../../../../../helpers/api/horticulture/subBlock';

export default function useListSubBlocksByBlock(blockId?: number) {
  const listSubBlocksByBlock = () => {
    return subBlock.listSubBlocksByBlock(Number(blockId));
  };

  const { data, isFetching, isError, refetch } = useQuery(
    ['list-sub-blocks-by-block', blockId],
    listSubBlocksByBlock,
    { refetchOnWindowFocus: false, enabled: !!blockId }
  );

  return {
    data,
    isFetching,
    isError,
    refetch,
  };
}
