import { useQuery } from '@tanstack/react-query';
import supplements from '../../../helpers/api/supplements';

export default function useReadSupplement(id: number) {
  const fetchSupplement = () => {
    return supplements.getSupplementById(id);
  };

  const { data, isFetching, isError } = useQuery({
    queryFn: fetchSupplement,
    queryKey: ['read-supplement', id],
    enabled: !!id,
    refetchOnWindowFocus: false,
  });

  return {
    data,
    isFetching,
    isError,
  };
}
