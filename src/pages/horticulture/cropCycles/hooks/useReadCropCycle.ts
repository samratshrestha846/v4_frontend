import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import horticulture from '../../../../helpers/api/horticulture';

export default function useReadCropCycle() {
  const { id } = useParams();
  const getCropCycleById = () => {
    return horticulture.getCropCyclebyId(id);
  };

  const { data, isFetching, isFetched, isError } = useQuery({
    queryKey: ['read-crop-cycle-by-id', id],
    queryFn: getCropCycleById,
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
