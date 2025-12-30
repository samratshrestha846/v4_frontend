import { useQuery } from '@tanstack/react-query';
import apiSupplementNutrinets from '../../../helpers/api/supplementNutrients';

export default function useListSupplementNutrient() {
  const getListSupplementNutrient = async () => {
    return apiSupplementNutrinets.getListSupplementNutrients();
  };

  const { data, isFetching } = useQuery({
    refetchOnWindowFocus: false,
    queryFn: getListSupplementNutrient,
    queryKey: ['list-supplement-nutrients'],
  });
  return {
    data,
    isFetching,
  };
}
