import { useQuery } from '@tanstack/react-query';
import fertilizer from '../../../../helpers/api/horticulture/fertilizer';

export default function useReadFertilizer(id: number) {
  const getFertilizerById = () => {
    return fertilizer.getFertilizerById(id);
  };

  const { data, isFetching, isFetched, isError } = useQuery({
    queryKey: ['read-fertilizer', id],
    queryFn: getFertilizerById,
    refetchOnWindowFocus: false,
    enabled: !!id,
  });

  return {
    data,
    isFetching,
    isFetched,
    isError,
  };
}
