import { useQuery } from '@tanstack/react-query';
import block from '../../../../../helpers/api/horticulture/block';

export default function useReadBlock(id?: number) {
  const readBlockById = () => {
    return block.readBlockById(id);
  };

  const { data, isFetching, isError, refetch } = useQuery(
    ['read-block-by-id', id],
    readBlockById,
    { refetchOnWindowFocus: false, enabled: !!id }
  );

  return {
    data,
    isFetching,
    isError,
    refetch,
  };
}
