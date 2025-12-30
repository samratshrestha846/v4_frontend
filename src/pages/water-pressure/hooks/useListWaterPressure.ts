import { useQuery } from '@tanstack/react-query';
import waterPressure from '../../../helpers/api/waterPressure';
import { WaterPressureQueryParams } from '../../../types/waterPressure';

export default function useListWaterPressure(id?: number) {
  const fetchWaterPressure = () => {
    const params: WaterPressureQueryParams = { site_id: id };
    return waterPressure.fetchWaterPressure(params);
  };

  const { data, isFetching, isError, refetch } = useQuery({
    refetchOnWindowFocus: false,
    queryFn: fetchWaterPressure,
    queryKey: ['water-pressure'],
  });

  return { data, isFetching, isError, refetch };
}
