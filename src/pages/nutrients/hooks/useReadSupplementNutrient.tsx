import { useQuery } from '@tanstack/react-query';
import apiSupplementNutrinets from '../../../helpers/api/supplementNutrients';

export default function useReadSupplementNutrient(nutrientId: number) {
  const readSupplementNutrient = async (id: number) => {
    return apiSupplementNutrinets.readSupplementNutrient(id);
  };

  const { data, isFetching, isFetched, isError } = useQuery({
    refetchOnWindowFocus: false,
    queryFn: () => readSupplementNutrient(nutrientId),
    queryKey: ['read-supplement-nutrient', nutrientId],
  });

  return {
    data,
    isFetching,
    isFetched,
    isError,
  };
}
