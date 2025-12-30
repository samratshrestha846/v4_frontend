import { useQuery } from '@tanstack/react-query';
import apiSupplementNutrients from '../../../helpers/api/supplementNutrients';

export default function useNonMethaneReducerNutrientList() {
  const fetchNonMethaneReducerNutrients = async () => {
    return apiSupplementNutrients.getNonMethaneReducerNutrients();
  };

  const { data, isFetching, isError, refetch } = useQuery({
    refetchOnWindowFocus: false,
    queryFn: fetchNonMethaneReducerNutrients,
    queryKey: ['non-methane-reducers'],
  });

  return {
    isFetching,
    isError,
    data,
    refetch,
  };
}
