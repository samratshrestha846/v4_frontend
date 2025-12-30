import { useQuery } from '@tanstack/react-query';
import { SUPPLIER } from '../constants/constant';
import HttpApi from '../../Http/http';

export default function useReadSupplier(id?: string) {
  const apiCore = new HttpApi();
  const readSupplier = async () => {
    const response = await apiCore.get(`${SUPPLIER}/${id}`);
    return response.data.data;
  };
  const { data, isFetching, isFetched, isError } = useQuery({
    queryKey: ['Supplier', id],
    queryFn: readSupplier,
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
