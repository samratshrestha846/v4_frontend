import { useQuery } from '@tanstack/react-query';
import subBlock from '../../../../../helpers/api/horticulture/subBlock';

export default function useReadSubBlock(id?: number) {
  const readSubBlockById = () => {
    return subBlock.readSubBlockById(id);
  };

  const { data, isFetching, isError } = useQuery(
    ['read-sub-block-by-id', id],
    readSubBlockById,
    { refetchOnWindowFocus: false, enabled: !!id }
  );

  return {
    data,
    isFetching,
    isError,
  };
}
