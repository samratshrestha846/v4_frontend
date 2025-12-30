import { useQuery } from '@tanstack/react-query';
import { RND_ACTIVITY } from '../constants/constant';
import HttpApi from '../../Http/http';
import { RndActivityResponse } from '../types/RndActivity';

export default function useReadRndActivity(id?: string) {
  const apiCore = new HttpApi();
  const readRndActivity = async (): Promise<RndActivityResponse> => {
    const response = await apiCore.get(`${RND_ACTIVITY}/${id}`);
    return response.data.data;
  };
  const { data, isFetching, isFetched, isError } =
    useQuery<RndActivityResponse>({
      queryKey: ['RndActivity', id],
      queryFn: readRndActivity,
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
