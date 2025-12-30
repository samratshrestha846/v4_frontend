import { useQuery } from '@tanstack/react-query';
import block from '../../../../../helpers/api/horticulture/block';

export default function useListBlocksByPaddock(paddockId?: number) {
  const listBlocksByPaddock = () => {
    return block.listBlocksByPaddock(Number(paddockId));
  };

  const { data, isFetching, isError, refetch } = useQuery(
    ['list-blocks-by-paddock', paddockId],
    listBlocksByPaddock,
    { refetchOnWindowFocus: false, enabled: !!paddockId }
  );

  return {
    data,
    isFetching,
    isError,
    refetch,
  };
}
