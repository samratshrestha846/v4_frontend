import { useQuery } from '@tanstack/react-query';
import cropable from '../../../../../helpers/api/horticulture/cropable';

export default function useReadCropable(id?: number) {
  const readCropableById = () => {
    return cropable.readCropableById(id);
  };

  const { data, isFetching, isError, refetch } = useQuery(
    ['read-cropable-by-id', id],
    readCropableById,
    { refetchOnWindowFocus: false, enabled: !!id }
  );

  return {
    data,
    isFetching,
    isError,
    refetch,
  };
}
