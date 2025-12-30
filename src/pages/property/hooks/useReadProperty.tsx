import { useQuery } from '@tanstack/react-query';
import apiCustomerProperty from '../../../helpers/api/customerProperty';

export default function useReadProperty(id: number) {
  const readProperty = () => {
    return apiCustomerProperty.readProperty(id);
  };

  const { data, isFetching, isFetched, isError, isSuccess, refetch } = useQuery(
    {
      refetchOnWindowFocus: false,
      queryKey: ['read-property', id],
      queryFn: readProperty,
      enabled: !!id,
    }
  );

  return {
    data,
    isFetching,
    isFetched,
    isError,
    isSuccess,
    refetch,
  };
}
