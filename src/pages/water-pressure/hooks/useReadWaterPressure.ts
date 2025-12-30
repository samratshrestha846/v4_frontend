import { useQuery } from '@tanstack/react-query';
import waterPressure from '../../../helpers/api/waterPressure';

export default function useReadWaterPressure(id?: number) {
  const readWaterPressure = () => {
    return waterPressure.readWaterPressure(id);
  };

  const { data, isFetching, isError, refetch } = useQuery({
    refetchOnWindowFocus: false,
    queryFn: readWaterPressure,
    queryKey: ['read-water-pressure', id],
    enabled: !!id,
  });

  return { data, isFetching, isError, refetch };
}
