import { useQuery } from '@tanstack/react-query';
import { STOCKTAKE } from '../constants/constant';
import HttpApi from '../../Http/http';
import { StocktakeResponse } from '../types/Stocktake';

export default function useReadStocktake(id?: string) {
  const apiCore = new HttpApi();
  const readStocktake = async (): Promise<StocktakeResponse> => {
    const response = await apiCore.get(`${STOCKTAKE}/${id}`);
    return response.data.data;
  };
  const { data, isFetching, isFetched, isError } = useQuery<StocktakeResponse>({
    queryKey: ['Stocktake', id],
    queryFn: readStocktake,
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
