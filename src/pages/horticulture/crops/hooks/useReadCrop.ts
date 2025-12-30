import { useQuery } from '@tanstack/react-query';
import horticulture from '../../../../helpers/api/horticulture';

export default function useReadCrop(id: any) {
  const getCropById = () => {
    return horticulture.getCropbyId(id);
  };

  const { data, isFetching, isFetched, isError } = useQuery({
    queryKey: ['read-crop', id],
    queryFn: getCropById,
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
