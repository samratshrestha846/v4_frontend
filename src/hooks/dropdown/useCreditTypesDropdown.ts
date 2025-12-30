import { useQuery } from '@tanstack/react-query';
import apiDropdown from '../../helpers/api/dropdown';

export default function useCreditTypesDropdown() {
  const fetchCreditTypesDropdown = async () => {
    const { body } = await apiDropdown.fetchCreditTypes();
    return body;
  };

  const { data, isFetching, isFetched, isError, isSuccess } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ['credit-types-dropdown'],
    queryFn: fetchCreditTypesDropdown,
  });

  return {
    data,
    isFetching,
    isFetched,
    isError,
    isSuccess,
  };
}
