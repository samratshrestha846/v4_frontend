import { useQuery } from '@tanstack/react-query';
import { PRODUCTION } from '../constants/constant';
import HttpApi from '../../Http/http';
import { ProductionResponse } from '../types/Production';

export default function useReadProduction(id?: string) {
  const apiCore = new HttpApi();
  const readProduction = async (): Promise<ProductionResponse> => {
    const response = await apiCore.get(`${PRODUCTION}/${id}`);
    return response.data.data;
  };
  const { data, isFetching, isFetched, isError } = useQuery<ProductionResponse>(
    {
      queryKey: ['Production', id],
      queryFn: readProduction,
      refetchOnWindowFocus: false,
      enabled: !!id,
    }
  );

  return {
    data,
    isFetching,
    isFetched,
    isError,
  };
}
